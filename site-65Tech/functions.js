const header = document.querySelector("header");
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const contactForm = document.getElementById("contactForm");
const contactFeedback = document.getElementById("contactFeedback");
const sendMessageButton = document.getElementById("sendMessageButton");
const budgetButton = document.getElementById("budgetButton");
const budgetButtonMobile = document.getElementById("budgetButtonMobile");
const buttonMensage = document.getElementById("ButonMensage");
const heroHighlightsCta = document.getElementById("heroHighlightsCta");
const heroInjetCta = document.getElementById("heroInjetCta");
const langToggle = document.getElementById("langToggle");
const langMenu = document.getElementById("langMenu");
const langSwitcher = langToggle ? langToggle.closest(".lang-switcher") : null;
const langOptions = document.querySelectorAll(".lang-option");

const translations = {
	pt: {
		langLabel: "PT",
		nav: {
			home: "Inicio",
			about: "Quem somos",
			solutions: "Soluções",
			cases: "Cases",
			testimonials: "Depoimentos",
			contact: "Contato"
		},
		hero: {
			title: "Criamos <span>sites impactantes</span> com experiência visual que aumenta conversões.",
			subtitle: "Unimos design, estratégia e tecnologia para negócios que querem transmitir autoridade e fechar mais clientes no digital.",
			ctaPrimary: "Iniciar Meu Projeto",
			ctaSecondary: "Ver Projetos",
			point1: "Design autoral",
			point2: "Alta performance",
			point3: "Foco em resultado",
			highlight1: "Elevamos a experiência do usuário em outro nível",
			highlight2: "Entregamos layouts elegantes e envolventes",
			highlight3: "Com telas personalizadas para cada objetivo",
			highlightCta: "Descubra como criar sites mais atrativos"
		},
		exp: {
			title: "CRIAMOS <span>EXPERIÊNCIAS DIGITAIS</span>",
			p1: "Projetando interfaces interativas através de conteúdos atrativos que alavancam sua captação de leads e conversões.",
			p2: "Nossos sites são pensados em cada detalhe para proporcionar uma experiência única, inserindo cada foto, botão e ícone no local exato onde irão converter.",
			p3: "Tudo isso sem deixar de lado o rankeamento nas plataformas de pesquisa e oferecendo uma navegação rápida, intuitiva, focada na experiência do usuário."
		},
		injet: {
			topCta: "Construa seu site agora",
			caption: "RECEBA MAIS CONTATOS ATRAVÉS DE UM <span>SITE PLANEJADO PARA GERAR CONVERSÕES</span>"
		},
		cards: {
			ux: {
				title: "UX DESIGN",
				p1: "Desenvolvemos interfaces incríveis pensando em cada detalhe para proporcionar a sua marca uma plataforma moderna e eficiente, capaz de encantar e atrair mais resultados.",
				p2: "Para isso, disponibilizamos ferramentas completas com mapas de calor, filmagens de ações de clientes e métricas de acessos, regiões e perfil para orientar sua tomada de decisões.",
				cta: "SOLICITE SEU SITE INTELIGENTE"
			},
			layout: {
				title: "LAYOUT DO SITE",
				p1: "Oferecemos as principais tendências para que sua marca tenha um site que se destaque entre os concorrentes, com combinações de cores modernas que transmitam a sua essência.",
				p2: "Estaremos lado a lado para transformar seu briefing dos sonhos em um projeto real e acima da sua expectativa, independentemente da quantidade de edições que você precisar.",
				cta: "CONSTRUA SEU FUNIL COM UM ESPECIALISTA"
			},
			content: {
				title: "CONTEÚDO DO SITE",
				p1: "Vamos além do básico para criar e colocar, em cada tela, a descrição perfeita dos seus serviços, orientando o usuário com clareza para a decisão certa.",
				p2: "Todo texto é planejado para comunicar valor, gerar confiança e fortalecer o posicionamento da sua marca ao longo da jornada de compra.",
				cta: "TENHA CONTEÚDO QUE CONVERTE"
			},
			code: {
				title: "PROGRAMAÇÃO",
				p1: "Transformamos ideias em projetos reais, trabalhando em cada código para oferecer uma experiência atrativa em todas as plataformas.",
				p2: "Criamos uma estrutura rápida, segura e preparada para crescer, garantindo estabilidade e performance para o seu negócio.",
				cta: "QUERO UM SITE DE ALTA PERFORMANCE"
			}
		}
	},
	en: {
		langLabel: "EN",
		nav: {
			home: "Home",
			about: "About",
			solutions: "Solutions",
			cases: "Cases",
			testimonials: "Testimonials",
			contact: "Contact"
		},
		hero: {
			title: "We create <span>impactful websites</span> with visual experiences that increase conversions.",
			subtitle: "We combine design, strategy, and technology for brands that want to communicate authority and close more clients online.",
			ctaPrimary: "Start My Project",
			ctaSecondary: "See Projects",
			point1: "Signature design",
			point2: "High performance",
			point3: "Results-driven",
			highlight1: "We elevate user experience to another level",
			highlight2: "We deliver elegant and immersive layouts",
			highlight3: "With custom screens for each goal",
			highlightCta: "Learn how to create more attractive websites"
		},
		exp: {
			title: "WE CREATE <span>DIGITAL EXPERIENCES</span>",
			p1: "We design interactive interfaces with engaging content that boosts lead generation and conversions.",
			p2: "Every detail is crafted to deliver a unique experience, placing each photo, button, and icon exactly where users convert.",
			p3: "All of this while maintaining search ranking and offering fast, intuitive navigation focused on user experience."
		},
		injet: {
			topCta: "Build your website now",
			caption: "GET MORE LEADS THROUGH A <span>WEBSITE BUILT TO CONVERT</span>"
		},
		cards: {
			ux: {
				title: "UX DESIGN",
				p1: "We build outstanding interfaces with attention to detail, giving your brand a modern and efficient platform that attracts better results.",
				p2: "We provide complete tools like heatmaps, user session recordings, and traffic metrics to guide your decision-making.",
				cta: "REQUEST YOUR SMART WEBSITE"
			},
			layout: {
				title: "WEBSITE LAYOUT",
				p1: "We apply top trends so your brand stands out with modern color combinations that communicate your essence.",
				p2: "We work side by side to turn your dream briefing into a real project beyond expectations, regardless of edit rounds.",
				cta: "BUILD YOUR FUNNEL WITH A SPECIALIST"
			},
			content: {
				title: "WEBSITE CONTENT",
				p1: "We go beyond basics to craft each screen with the right service descriptions, guiding users clearly to the right decision.",
				p2: "Every line is planned to communicate value, build trust, and strengthen your brand throughout the customer journey.",
				cta: "GET CONTENT THAT CONVERTS"
			},
			code: {
				title: "DEVELOPMENT",
				p1: "We turn ideas into real projects, crafting each line of code to deliver a compelling experience on every platform.",
				p2: "We build a fast, secure, and scalable structure that ensures stability and performance for your business.",
				cta: "I WANT A HIGH-PERFORMANCE WEBSITE"
			}
		}
	},
	es: {
		langLabel: "ES",
		nav: {
			home: "Inicio",
			about: "Quiénes somos",
			solutions: "Soluciones",
			cases: "Casos",
			testimonials: "Testimonios",
			contact: "Contacto"
		},
		hero: {
			title: "Creamos <span>sitios impactantes</span> con experiencias visuales que aumentan conversiones.",
			subtitle: "Unimos diseño, estrategia y tecnología para marcas que desean transmitir autoridad y cerrar más clientes en digital.",
			ctaPrimary: "Iniciar mi proyecto",
			ctaSecondary: "Ver proyectos",
			point1: "Diseño de autor",
			point2: "Alto rendimiento",
			point3: "Enfoque en resultados",
			highlight1: "Llevamos la experiencia del usuario a otro nivel",
			highlight2: "Entregamos layouts elegantes y envolventes",
			highlight3: "Con pantallas personalizadas para cada objetivo",
			highlightCta: "Descubre cómo crear sitios más atractivos"
		},
		exp: {
			title: "CREAMOS <span>EXPERIENCIAS DIGITALES</span>",
			p1: "Diseñamos interfaces interactivas con contenidos atractivos que impulsan la captación de leads y conversiones.",
			p2: "Cada detalle está pensado para ofrecer una experiencia única, ubicando fotos, botones e íconos donde realmente convierten.",
			p3: "Todo esto sin dejar de lado el posicionamiento en buscadores y con navegación rápida e intuitiva centrada en el usuario."
		},
		injet: {
			topCta: "Construye tu sitio ahora",
			caption: "RECIBE MÁS CONTACTOS CON UN <span>SITIO PLANEADO PARA GENERAR CONVERSIONES</span>"
		},
		cards: {
			ux: {
				title: "UX DESIGN",
				p1: "Desarrollamos interfaces increíbles cuidando cada detalle para brindar una plataforma moderna y eficiente que atraiga más resultados.",
				p2: "Ofrecemos herramientas completas como mapas de calor, grabaciones de sesiones y métricas para guiar tus decisiones.",
				cta: "SOLICITA TU SITIO INTELIGENTE"
			},
			layout: {
				title: "LAYOUT DEL SITIO",
				p1: "Aplicamos tendencias para que tu marca destaque con combinaciones modernas que transmitan su esencia.",
				p2: "Trabajamos contigo para convertir tu briefing en un proyecto real y superior a tus expectativas.",
				cta: "CONSTRUYE TU EMBUDO CON UN ESPECIALISTA"
			},
			content: {
				title: "CONTENIDO DEL SITIO",
				p1: "Vamos más allá de lo básico para crear textos claros que ayuden al usuario a entender y decidir mejor.",
				p2: "Cada palabra comunica valor, genera confianza y fortalece el posicionamiento de tu marca.",
				cta: "TEN CONTENIDO QUE CONVIERTE"
			},
			code: {
				title: "PROGRAMACIÓN",
				p1: "Transformamos ideas en proyectos reales, trabajando cada línea de código para crear experiencias atractivas.",
				p2: "Desarrollamos una estructura rápida, segura y escalable para garantizar estabilidad y rendimiento.",
				cta: "QUIERO UN SITIO DE ALTO RENDIMIENTO"
			}
		}
	}
};

function getTranslationByKey(obj, keyPath) {
	return keyPath.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), obj);
}

function applyLanguage(lang) {
	const locale = translations[lang] ? lang : "pt";
	const dict = translations[locale];
	document.documentElement.lang = locale;

	if (langToggle) {
		langToggle.innerHTML = `${dict.langLabel} <span aria-hidden="true">˅</span>`;
	}

	langOptions.forEach((option) => {
		option.classList.toggle("active", option.dataset.lang === locale);
	});

	document.querySelectorAll("[data-i18n]").forEach((element) => {
		const key = element.getAttribute("data-i18n");
		const translatedValue = getTranslationByKey(dict, key);

		if (!translatedValue) {
			return;
		}

		element.innerHTML = translatedValue;
	});

	localStorage.setItem("siteLanguage", locale);
}

if (langToggle && langMenu && langSwitcher) {
	langToggle.addEventListener("click", () => {
		const isOpen = langSwitcher.classList.toggle("open");
		langToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
	});

	langOptions.forEach((option) => {
		option.addEventListener("click", () => {
			applyLanguage(option.dataset.lang || "pt");
			langSwitcher.classList.remove("open");
			langToggle.setAttribute("aria-expanded", "false");
		});
	});

	document.addEventListener("click", (event) => {
		if (!langSwitcher.contains(event.target)) {
			langSwitcher.classList.remove("open");
			langToggle.setAttribute("aria-expanded", "false");
		}
	});
}

applyLanguage(localStorage.getItem("siteLanguage") || "pt");

function handleHeaderScroll() {
	if (!header) {
		return;
	}

	header.classList.toggle("scrolled", window.scrollY > 18);
}

window.addEventListener("scroll", handleHeaderScroll, { passive: true });
handleHeaderScroll();

function closeMobileMenu() {
	if (!header || !menuToggle) {
		return;
	}

	header.classList.remove("menu-open");
	menuToggle.setAttribute("aria-expanded", "false");
	menuToggle.setAttribute("aria-label", "Abrir menu");
}

if (menuToggle && header && siteNav) {
	menuToggle.addEventListener("click", () => {
		const isOpen = header.classList.toggle("menu-open");
		menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
		menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
	});

	siteNav.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", () => {
			if (window.innerWidth <= 768) {
				closeMobileMenu();
			}
		});
	});

	document.addEventListener("click", (event) => {
		if (window.innerWidth > 768) {
			return;
		}

		if (!header.contains(event.target)) {
			closeMobileMenu();
		}
	});

	window.addEventListener("resize", () => {
		if (window.innerWidth > 768) {
			closeMobileMenu();
		}
	});
}

function getContactsApiBase() {
	const savedApiBase = localStorage.getItem("contactsApiBase");
	const configuredApiBase = (window.CONTACTS_API_BASE || "").toString().trim();
	const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

	if (savedApiBase && savedApiBase.trim()) {
		return savedApiBase.trim().replace(/\/$/, "");
	}

	if (configuredApiBase) {
		return configuredApiBase.replace(/\/$/, "");
	}

	if (isLocalHost) {
		return "http://localhost:3000";
	}

	return "";
}

function getContactApiBases() {
	const bases = [];
	const preferredBase = getContactsApiBase();
	const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);

	if (preferredBase) {
		bases.push(preferredBase);
	}

	if (isLocalHost) {
		bases.push("http://localhost:3000");
	}

	return [...new Set(bases)];
}

async function handleContactSubmit(event) {
	event.preventDefault();

	if (!contactForm || !contactFeedback || !sendMessageButton) {
		return;
	}

	const formData = new FormData(contactForm);
	const payload = {
		nome: (formData.get("nome") || "").toString().trim(),
		empresa: (formData.get("empresa") || "").toString().trim(),
		whatsapp: (formData.get("whatsapp") || "").toString().trim(),
		email: (formData.get("email") || "").toString().trim(),
		tipoProjeto: (formData.get("tipoProjeto") || "").toString().trim(),
		mensagem: (formData.get("mensagem") || "").toString().trim()
	};

	contactFeedback.textContent = "";
	contactFeedback.className = "contact-feedback";
	sendMessageButton.disabled = true;
	sendMessageButton.textContent = "Enviando...";

	try {
		let lastError = null;
		const apiBases = getContactApiBases();

		if (!apiBases.length) {
			throw new Error("API de contatos nao configurada para este dominio.");
		}

		for (const apiBase of apiBases) {
			try {
				const response = await fetch(`${apiBase}/contatos`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(payload)
				});

				if (!response.ok) {
					const errorBody = await response.json().catch(() => ({}));
					throw new Error(errorBody.erro || "Nao foi possivel enviar sua mensagem.");
				}

				lastError = null;
				break;
			} catch (requestError) {
				lastError = requestError;
			}
		}

		if (lastError) {
			throw lastError;
		}

		contactFeedback.textContent = "Mensagem recebida. Retornaremos em breve.";
		contactFeedback.classList.add("success");
		contactForm.reset();
	} catch (error) {
		contactFeedback.textContent = error.message || "Erro ao enviar mensagem.";
		contactFeedback.classList.add("error");
	} finally {
		sendMessageButton.disabled = false;
		sendMessageButton.textContent = "Enviar Mensagem";
	}
}

if (contactForm) {
	contactForm.addEventListener("submit", handleContactSubmit);
}

function openBudgetWhatsapp() {
	const phone = "5511976052590";
	const text = "Olá, vim pelo site, desejo solicitar um orçamento";
	const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

	if (window.innerWidth <= 768) {
		closeMobileMenu();
	}

	window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

[budgetButton, budgetButtonMobile, buttonMensage, heroHighlightsCta, heroInjetCta].forEach((button) => {
	if (button) {
		button.addEventListener("click", openBudgetWhatsapp);
	}
});
