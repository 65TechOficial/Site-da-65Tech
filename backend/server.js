require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/65tech';

// ─── Conexão MongoDB ──────────────────────────────────────────────────────────
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB conectado com sucesso.'))
  .catch((err) => {
    console.error('Erro ao conectar no MongoDB:', err.message);
    process.exit(1);
  });

// ─── Model ────────────────────────────────────────────────────────────────────
const contatoSchema = new mongoose.Schema(
  {
    nome:    { type: String, required: true, trim: true },
    email:   { type: String, required: true, trim: true, lowercase: true },
    celular: { type: String, required: true },
  },
  { timestamps: { createdAt: 'criado_em', updatedAt: false } }
);

const Contato = mongoose.model('Contato', contatoSchema);

// ─── Middlewares ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Rotas ────────────────────────────────────────────────────────────────────

// POST /contatos  →  salva um novo contato
app.post('/contatos', async (req, res) => {
  const { nome, email, celular } = req.body;

  if (!nome || !email || !celular) {
    return res.status(400).json({ erro: 'Nome, email e celular são obrigatórios.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ erro: 'E-mail inválido.' });
  }

  const celularLimpo = celular.replace(/\D/g, '');
  if (celularLimpo.length < 10 || celularLimpo.length > 15) {
    return res.status(400).json({ erro: 'Número de celular inválido.' });
  }

  try {
    const contato = await Contato.create({ nome, email, celular: celularLimpo });
    return res.status(201).json({ mensagem: 'Contato salvo com sucesso!', id: contato._id });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro interno ao salvar contato.' });
  }
});

// GET /contatos  →  lista todos os contatos (uso interno / admin)
app.get('/contatos', async (_req, res) => {
  try {
    const contatos = await Contato.find().sort({ criado_em: -1 });
    return res.json(contatos);
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao buscar contatos.' });
  }
});

// DELETE /contatos/:id  →  remove um contato (uso interno / admin)
app.delete('/contatos/:id', async (req, res) => {
  try {
    const result = await Contato.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ erro: 'Contato não encontrado.' });
    return res.json({ mensagem: 'Contato removido.' });
  } catch (err) {
    return res.status(500).json({ erro: 'Erro ao remover contato.' });
  }
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor 65Tech rodando em http://localhost:${PORT}`);
});
