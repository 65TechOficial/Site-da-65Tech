require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/65tech';
const MAIL_FROM = process.env.MAIL_FROM || process.env.EMAIL_USER;
const MAIL_TO = process.env.MAIL_TO || 'contato.65tech@gmail.com';
const ADMIN_PANEL_PASSWORD = process.env.ADMIN_PANEL_PASSWORD || '';
let isMongoConnected = false;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ─── Conexão MongoDB ──────────────────────────────────────────────────────────
mongoose
  .connect(MONGO_URI)
  .then(() => {
    isMongoConnected = true;
    console.log('MongoDB conectado com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao conectar no MongoDB:', err.message);
  });

// ─── Model ────────────────────────────────────────────────────────────────────
const contatoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    empresa: { type: String, trim: true, default: '' },
    email: { type: String, required: true, trim: true, lowercase: true },
    whatsapp: { type: String, required: true },
    tipoProjeto: { type: String, required: true, trim: true },
    mensagem: { type: String, required: true, trim: true }
  },
  { timestamps: { createdAt: 'criado_em', updatedAt: false } }
);

const Contato = mongoose.model('Contato', contatoSchema);

// ─── Middlewares ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

function requireAdminAccess(req, res, next) {
  if (!ADMIN_PANEL_PASSWORD) {
    return res.status(500).json({
      erro: 'Senha do painel admin nao configurada no servidor.'
    });
  }

  const providedPassword = req.header('x-admin-password');

  if (!providedPassword) {
    return res.status(401).json({ erro: 'Acesso negado ao painel.' });
  }

  if (providedPassword !== ADMIN_PANEL_PASSWORD) {
    return res.status(403).json({ erro: 'Senha do painel invalida.' });
  }

  return next();
}

// ─── Rotas ────────────────────────────────────────────────────────────────────

// POST /contatos  →  salva um novo contato
app.post('/contatos', async (req, res) => {
  const {
    nome,
    empresa = '',
    email,
    whatsapp,
    tipoProjeto,
    mensagem
  } = req.body;

  if (!nome || !email || !whatsapp || !tipoProjeto || !mensagem) {
    return res.status(400).json({
      erro: 'Nome, email, WhatsApp, tipo de projeto e mensagem são obrigatórios.'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ erro: 'E-mail inválido.' });
  }

  const whatsappLimpo = whatsapp.replace(/\D/g, '');
  if (whatsappLimpo.length < 10 || whatsappLimpo.length > 15) {
    return res.status(400).json({ erro: 'Número de WhatsApp inválido.' });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !MAIL_FROM) {
    return res.status(500).json({
      erro: 'Configuração de e-mail ausente no servidor.'
    });
  }

  try {
    let contatoId = null;

    if (isMongoConnected) {
      const contato = await Contato.create({
        nome,
        empresa,
        email,
        whatsapp: whatsappLimpo,
        tipoProjeto,
        mensagem
      });

      contatoId = contato._id;
    }

    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      subject: `Novo contato pelo site - ${nome}`,
      replyTo: email,
      text: [
        `Nome: ${nome}`,
        `Empresa: ${empresa || 'Nao informado'}`,
        `WhatsApp: ${whatsappLimpo}`,
        `E-mail: ${email}`,
        `Tipo de Projeto: ${tipoProjeto}`,
        '',
        'Mensagem:',
        mensagem
      ].join('\n'),
      html: `
        <h2>Novo contato recebido pelo site</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Empresa:</strong> ${empresa || 'Nao informado'}</p>
        <p><strong>WhatsApp:</strong> ${whatsappLimpo}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Tipo de Projeto:</strong> ${tipoProjeto}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem.replace(/\n/g, '<br>')}</p>
      `
    });

    return res.status(201).json({
      mensagem: isMongoConnected
        ? 'Contato salvo e enviado com sucesso!'
        : 'Contato enviado com sucesso! Banco indisponível no momento.',
      id: contatoId
    });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro interno ao processar contato.' });
  }
});

// GET /contatos  →  lista todos os contatos (uso interno / admin)
app.get('/contatos', async (_req, res) => {
  return requireAdminAccess(_req, res, async () => {
  if (!isMongoConnected) {
    return res.status(503).json({ erro: 'MongoDB indisponível no momento.' });
  }

  try {
    const contatos = await Contato.find().sort({ criado_em: -1 });
    return res.json(contatos);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao buscar contatos.' });
  }
  });
});

// DELETE /contatos/:id  →  remove um contato (uso interno / admin)
app.delete('/contatos/:id', async (req, res) => {
  return requireAdminAccess(req, res, async () => {
  if (!isMongoConnected) {
    return res.status(503).json({ erro: 'MongoDB indisponível no momento.' });
  }

  try {
    const result = await Contato.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ erro: 'Contato não encontrado.' });
    return res.json({ mensagem: 'Contato removido.' });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao remover contato.' });
  }
  });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor 65Tech rodando em http://localhost:${PORT}`);
});
