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

[budgetButton, budgetButtonMobile, buttonMensage, heroHighlightsCta].forEach((button) => {
	if (button) {
		button.addEventListener("click", openBudgetWhatsapp);
	}
});
