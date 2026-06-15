const projects = [
	{
		title: "Injet Nobre",
		category: "Site institucional para clinica especializada",
		description: "Apresentacao digital voltada para clinicas e consultorios, com foco em autoridade medica, clareza de servicos e contato rapido para novos pacientes.",
		image: "./assets/Mockups Injet Nobre.png",
		imageAlt: "Preview do projeto Injet Nobre",
		link: "https://gabriel100-pro.github.io/Site-oficial-InjetNobre/"
	},
	{
		title: "Controle de Estoque",
		category: "Sistema interno para clinicas e farmacias",
		description: "Fluxo de gestao de insumos medicos e medicamentos com visao clara de entradas, saidas e itens criticos para apoiar operacao segura no dia a dia.",
		image: "./assets/Mockup Controle de Estoque.png",
		imageAlt: "Preview do projeto Controle de Estoque",
		link: "https://gabriel100-pro.github.io/Controle-de-estoque/"
	},
	{
		title: "Agendamento",
		category: "Agenda online para profissionais de saude",
		description: "Experiencia de marcacao de consultas com foco em praticidade para pacientes e melhor organizacao de horarios para equipes de atendimento.",
		image: "./assets/Mosckup Agendamento.png",
		imageAlt: "Preview do projeto Agendamento",
		link: "https://gabriel100-pro.github.io/Projeto-de-Agendamento/"
	}
];

let currentProject = 0;

const titleEl = document.getElementById("projectTitle");
const categoryEl = document.getElementById("projectCategory");
const descriptionEl = document.getElementById("projectDescription");
const previewEl = document.getElementById("projectPreview");
const linkEl = document.getElementById("projectLink");
const nextButton = document.getElementById("projectNext");
const dotsContainer = document.getElementById("projectDots");

function renderProject(index) {
	const project = projects[index];

	titleEl.textContent = project.title;
	categoryEl.textContent = project.category;
	descriptionEl.textContent = project.description;
	previewEl.innerHTML = `<img src="${project.image}" alt="${project.imageAlt}">`;
	linkEl.setAttribute("href", project.link);
	linkEl.setAttribute("target", "_blank");
	linkEl.setAttribute("rel", "noopener noreferrer");

	const dots = dotsContainer.querySelectorAll("span");
	dots.forEach((dot, dotIndex) => {
		dot.classList.toggle("active", dotIndex === index);
	});
}

if (nextButton) {
	nextButton.addEventListener("click", () => {
		currentProject = (currentProject + 1) % projects.length;
		renderProject(currentProject);
	});

	renderProject(currentProject);
}

const header = document.querySelector("header");
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");

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

const testimonials = [
	{
		name: "Dra. Mariana Silva",
		specialty: "Dermatologista",
		quote: "O sistema da 65Tech triplicou nossos agendamentos online e deixou o atendimento muito mais fluido.",
		image: "./assets/Dra Adriana Guedes.jpg",
		imageAlt: "Dra. Mariana Silva, dermatologista"
	},
	{
		name: "Dr. Renato Alves",
		specialty: "Cardiologista",
		quote: "Conseguimos organizar consultas e retornos com mais rapidez e reduzir as faltas em agenda.",
		image: "./assets/Dra Adriano Moraes.jpg",
		imageAlt: "Dr. Renato Alves, cardiologista"
	},
	{
		name: "Dra. Fernanda Costa",
		specialty: "Pediatra",
		quote: "A experiência digital ficou mais profissional e nossos pacientes passaram a confiar mais no processo de agendamento.",
		image: "./assets/Dra Fernanda Lopes.jpg",
		imageAlt: "Dra. Fernanda Costa, pediatra"
	}
];

let currentTestimonial = 0;

const testimonialImageEl = document.getElementById("testimonialImage");
const testimonialNameEl = document.getElementById("testimonialName");
const testimonialSpecialtyEl = document.getElementById("testimonialSpecialty");
const testimonialQuoteEl = document.getElementById("testimonialQuote");
const testimonialPrevButton = document.getElementById("testimonialPrev");
const testimonialNextButton = document.getElementById("testimonialNext");
const testimonialDotsContainer = document.getElementById("testimonialDots");

function renderTestimonial(index) {
	const testimonial = testimonials[index];

	testimonialImageEl.setAttribute("src", testimonial.image);
	testimonialImageEl.setAttribute("alt", testimonial.imageAlt);
	testimonialNameEl.textContent = testimonial.name;
	testimonialSpecialtyEl.textContent = testimonial.specialty;
	testimonialQuoteEl.textContent = testimonial.quote;

	const dots = testimonialDotsContainer.querySelectorAll("span");
	dots.forEach((dot, dotIndex) => {
		dot.classList.toggle("active", dotIndex === index);
	});
}

if (testimonialPrevButton && testimonialNextButton) {
	testimonialPrevButton.addEventListener("click", () => {
		currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
		renderTestimonial(currentTestimonial);
	});

	testimonialNextButton.addEventListener("click", () => {
		currentTestimonial = (currentTestimonial + 1) % testimonials.length;
		renderTestimonial(currentTestimonial);
	});

	renderTestimonial(currentTestimonial);
}

const workflowTrack = document.getElementById("workflowTrack");
const workflowSteps = document.querySelectorAll(".workflow-step");
const workflowSection = document.querySelector(".workflow-section");

function setWorkflowStep(activeIndex) {
	if (!workflowTrack || workflowSteps.length === 0) {
		return;
	}

	workflowSteps.forEach((step, index) => {
		step.classList.toggle("active", index <= activeIndex);
	});

	const maxIndex = workflowSteps.length - 1;
	const progressPercent = maxIndex > 0 ? (activeIndex / maxIndex) * 100 : 0;
	workflowTrack.style.setProperty("--workflow-progress", `${progressPercent}%`);
}

if (workflowSteps.length > 0) {
	workflowSteps.forEach((step, index) => {
		step.style.setProperty("--stagger", `${index}`);
	});

	workflowSteps.forEach((step, index) => {
		step.addEventListener("click", () => setWorkflowStep(index));
	});

	setWorkflowStep(0);
}

if (workflowSection) {
	const revealWorkflow = () => workflowSection.classList.add("is-visible");

	if ("IntersectionObserver" in window) {
		const workflowObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					revealWorkflow();
					observer.disconnect();
				}
			});
		}, { threshold: 0.28 });

		workflowObserver.observe(workflowSection);
	} else {
		revealWorkflow();
	}
}

const serviceIcons = {
	institucional: `
		<svg viewBox="0 0 24 24" role="img" aria-label="Sites Institucionais">
			<path d="M4 20h16" />
			<path d="M6 20V9l6-4 6 4v11" />
			<path d="M10 20v-5h4v5" />
			<path d="M9 11h.01" />
			<path d="M15 11h.01" />
		</svg>
	`,
	landing: `
		<svg viewBox="0 0 24 24" role="img" aria-label="Landing Pages">
			<path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
			<path d="M8 9h8" />
			<path d="M8 12h6" />
			<path d="M9 16h2" />
		</svg>
	`,
	loja: `
		<svg viewBox="0 0 24 24" role="img" aria-label="Lojas Virtuais">
			<path d="M7 7V6a5 5 0 0 1 10 0v1" />
			<path d="M6 8h12l1 12H5L6 8z" />
			<path d="M9 11h.01" />
			<path d="M15 11h.01" />
			<path d="M9 15h6" />
		</svg>
	`,
	mobile: `
		<svg viewBox="0 0 24 24" role="img" aria-label="Otimização Mobile">
			<path d="M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
			<path d="M9 6h6" />
			<path d="M10 18h4" />
			<path d="M10 14h4" />
		</svg>
	`,
	seo: `
		<svg viewBox="0 0 24 24" role="img" aria-label="SEO Básico">
			<path d="M4 19h16" />
			<path d="M7 15 11 11l3 3 4-5" />
			<path d="M17 8h2v2" />
			<path d="M6 14 7 15" />
		</svg>
	`,
	manutencao: `
		<svg viewBox="0 0 24 24" role="img" aria-label="Manutenção">
			<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-3 3-2-2 3-3z" />
			<path d="M15.2 10.8 13.5 9.1" />
		</svg>
	`
};

function applyServiceIcons() {
	const cards = document.querySelectorAll("[data-service-card]");

	cards.forEach((card) => {
		const serviceName = card.getAttribute("data-service-card");
		const iconWrapper = card.querySelector(".service-icon");
		const iconMarkup = serviceIcons[serviceName];

		if (!iconWrapper || !iconMarkup) {
			return;
		}

		iconWrapper.innerHTML = iconMarkup.trim();
	});
}

applyServiceIcons();

const contactForm = document.getElementById("contactForm");
const contactFeedback = document.getElementById("contactFeedback");
const sendMessageButton = document.getElementById("sendMessageButton");
const budgetButton = document.getElementById("budgetButton");

function getContactsApiBase() {
	const savedApiBase = localStorage.getItem("contactsApiBase");

	if (savedApiBase && savedApiBase.trim()) {
		return savedApiBase.trim().replace(/\/$/, "");
	}

	return "http://localhost:3000";
}

function getContactApiBases() {
	const bases = [];
	const savedApiBase = localStorage.getItem("contactsApiBase");

	if (savedApiBase && savedApiBase.trim()) {
		bases.push(savedApiBase.trim().replace(/\/$/, ""));
	}

	bases.push("http://localhost:3000");

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

		for (const apiBase of getContactApiBases()) {
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

if (budgetButton) {
	budgetButton.addEventListener("click", () => {
		const phone = "5511976052590";
		const text = "Olá, vim pelo site, desejo solicitar um orçamento";
		const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

		window.open(whatsappUrl, "_blank", "noopener,noreferrer");
	});
}