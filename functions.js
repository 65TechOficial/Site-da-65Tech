const projects = [
	{
		title: "Projeto em destaque",
		category: "Site Institucional",
		description: "Campo pronto para receber a imagem e a descrição dos seus projetos quando você enviar.",
		preview: "Prévia do Projeto",
		link: "#"
	},
	{
		title: "Projeto 2",
		category: "Landing Page",
		description: "Estrutura preparada para mostrar resultados, objetivo do projeto e principais diferenciais.",
		preview: "Prévia do Projeto 2",
		link: "#"
	},
	{
		title: "Projeto 3",
		category: "Loja Virtual",
		description: "Espaço reservado para exibir sua próxima vitrine com foco em conversão e experiência.",
		preview: "Prévia do Projeto 3",
		link: "#"
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
	previewEl.textContent = project.preview;
	linkEl.setAttribute("href", project.link);

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

function handleHeaderScroll() {
	if (!header) {
		return;
	}

	header.classList.toggle("scrolled", window.scrollY > 18);
}

window.addEventListener("scroll", handleHeaderScroll, { passive: true });
handleHeaderScroll();
