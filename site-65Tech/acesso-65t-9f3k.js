const apiBaseInput = document.getElementById("apiBase");
const saveApiBaseButton = document.getElementById("saveApiBase");
const refreshContactsButton = document.getElementById("refreshContacts");
const adminPasswordInput = document.getElementById("adminPassword");
const saveAdminPasswordButton = document.getElementById("saveAdminPassword");
const clearAdminPasswordButton = document.getElementById("clearAdminPassword");
const statusMessage = document.getElementById("statusMessage");
const contactsTableBody = document.getElementById("contactsTableBody");
const deletedContactsTableBody = document.getElementById("deletedContactsTableBody");
const viewToggle = document.getElementById("viewToggle");
const activeContactsSection = document.getElementById("activeContactsSection");
const deletedContactsSection = document.getElementById("deletedContactsSection");

const savedApiBase = localStorage.getItem("contactsApiBase") || "http://localhost:3000";
const savedAdminPassword = sessionStorage.getItem("adminPanelPassword") || "";
apiBaseInput.value = savedApiBase;
adminPasswordInput.value = savedAdminPassword;

function setStatus(text, type) {
    statusMessage.textContent = text;
    statusMessage.className = "status";

    if (type) {
        statusMessage.classList.add(type);
    }
}

function formatDate(dateString) {
    if (!dateString) {
        return "-";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "-";
    }

    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short"
    }).format(date);
}

function clearTable() {
    contactsTableBody.innerHTML = "";
}

function createCell(text, className) {
    const td = document.createElement("td");
    td.textContent = text || "-";

    if (className) {
        td.classList.add(className);
    }

    return td;
}

function renderEmptyState(message) {
    clearTable();

    const row = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 8;
    td.className = "empty-row";
    td.textContent = message;
    row.appendChild(td);
    contactsTableBody.appendChild(row);
}

function clearDeletedTable() {
    deletedContactsTableBody.innerHTML = "";
}

function renderDeletedEmptyState(message) {
    clearDeletedTable();

    const row = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 8;
    td.className = "empty-row";
    td.textContent = message;
    row.appendChild(td);
    deletedContactsTableBody.appendChild(row);
}

function getAdminPassword() {
    const password = adminPasswordInput.value.trim();

    if (!password) {
        throw new Error("Informe a senha do painel.");
    }

    return password;
}

async function fetchContacts() {
    const base = apiBaseInput.value.trim();

    if (!base) {
        setStatus("Defina a URL da API.", "error");
        return;
    }

    setStatus("Carregando contatos...");

    try {
        const response = await fetch(`${base}/contatos`, {
            headers: {
                "x-admin-password": getAdminPassword()
            }
        });
        const body = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(body.erro || "Nao foi possivel carregar os contatos.");
        }

        if (!Array.isArray(body) || body.length === 0) {
            renderEmptyState("Nenhum contato encontrado.");
            setStatus("Lista carregada.", "success");
            return;
        }

        clearTable();

        body.forEach((contact) => {
            const row = document.createElement("tr");
            row.appendChild(createCell(contact.nome));
            row.appendChild(createCell(contact.empresa));
            row.appendChild(createCell(contact.whatsapp));
            row.appendChild(createCell(contact.email));
            row.appendChild(createCell(contact.tipoProjeto));
            row.appendChild(createCell(contact.mensagem, "message"));
            row.appendChild(createCell(formatDate(contact.criado_em)));

            const actionCell = document.createElement("td");
            const removeButton = document.createElement("button");
            removeButton.type = "button";
            removeButton.className = "action-btn";
            removeButton.textContent = "Excluir";
            removeButton.addEventListener("click", () => deleteContact(contact._id));
            actionCell.appendChild(removeButton);
            row.appendChild(actionCell);

            contactsTableBody.appendChild(row);
        });

        setStatus("Lista carregada.", "success");
    } catch (error) {
        renderEmptyState("Falha ao carregar contatos.");
        setStatus(error.message || "Erro ao carregar contatos.", "error");
    }
}

async function fetchDeletedContacts() {
    const base = apiBaseInput.value.trim();

    if (!base) {
        setStatus("Defina a URL da API.", "error");
        return;
    }

    try {
        const response = await fetch(`${base}/contatos-deletados`, {
            headers: {
                "x-admin-password": getAdminPassword()
            }
        });
        const body = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(body.erro || "Nao foi possivel carregar os contatos deletados.");
        }

        if (!Array.isArray(body) || body.length === 0) {
            renderDeletedEmptyState("Nenhum contato deletado.");
            setStatus("Nenhum contato deletado encontrado.", "success");
            return;
        }

        clearDeletedTable();

        body.forEach((contact) => {
            const row = document.createElement("tr");
            row.appendChild(createCell(contact.nome));
            row.appendChild(createCell(contact.empresa));
            row.appendChild(createCell(contact.whatsapp));
            row.appendChild(createCell(contact.email));
            row.appendChild(createCell(contact.tipoProjeto));
            row.appendChild(createCell(contact.mensagem, "message"));
            row.appendChild(createCell(formatDate(contact.deletado_em)));

            const actionCell = document.createElement("td");
            const restoreButton = document.createElement("button");
            restoreButton.type = "button";
            restoreButton.className = "action-btn restore";
            restoreButton.textContent = "Restaurar";
            restoreButton.addEventListener("click", () => restoreContact(contact._id));
            actionCell.appendChild(restoreButton);
            row.appendChild(actionCell);

            deletedContactsTableBody.appendChild(row);
        });

        setStatus("Contatos deletados carregados.", "success");
    } catch (error) {
        renderDeletedEmptyState("Falha ao carregar contatos deletados.");
        setStatus(error.message || "Erro ao carregar contatos deletados.", "error");
    }
}

async function deleteContact(contactId) {
    if (!contactId) {
        return;
    }

    const confirmed = window.confirm("Deseja realmente excluir este contato?");

    if (!confirmed) {
        return;
    }

    const base = apiBaseInput.value.trim();

    try {
        const response = await fetch(`${base}/contatos/${contactId}`, {
            method: "DELETE",
            headers: {
                "x-admin-password": getAdminPassword()
            }
        });
        const body = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(body.erro || "Nao foi possivel excluir o contato.");
        }

        setStatus("Contato removido com sucesso.", "success");
        fetchContacts();
    } catch (error) {
        setStatus(error.message || "Erro ao remover contato.", "error");
    }
}

async function restoreContact(contactId) {
    if (!contactId) {
        return;
    }

    const confirmed = window.confirm("Deseja restaurar este contato?");

    if (!confirmed) {
        return;
    }

    const base = apiBaseInput.value.trim();

    try {
        const response = await fetch(`${base}/contatos/${contactId}/restaurar`, {
            method: "PUT",
            headers: {
                "x-admin-password": getAdminPassword()
            }
        });
        const body = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(body.erro || "Nao foi possivel restaurar o contato.");
        }

        setStatus("Contato restaurado com sucesso.", "success");
        fetchDeletedContacts();
        fetchContacts();
    } catch (error) {
        setStatus(error.message || "Erro ao restaurar contato.", "error");
    }
}

saveApiBaseButton.addEventListener("click", () => {
    const base = apiBaseInput.value.trim();

    if (!base) {
        setStatus("Defina uma URL valida.", "error");
        return;
    }

    localStorage.setItem("contactsApiBase", base);
    setStatus("URL salva.", "success");
});

saveAdminPasswordButton.addEventListener("click", () => {
    const password = adminPasswordInput.value.trim();

    if (!password) {
        setStatus("Informe uma senha valida.", "error");
        return;
    }

    sessionStorage.setItem("adminPanelPassword", password);
    setStatus("Senha salva na sessao atual.", "success");
    fetchContacts();
});

clearAdminPasswordButton.addEventListener("click", () => {
    sessionStorage.removeItem("adminPanelPassword");
    adminPasswordInput.value = "";
    setStatus("Senha removida da sessao.", "success");
    renderEmptyState("Informe a senha e clique em Atualizar lista.");
});

adminPasswordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        saveAdminPasswordButton.click();
    }
});

viewToggle.addEventListener("change", (event) => {
    if (event.target.value === "active") {
        activeContactsSection.style.display = "block";
        deletedContactsSection.style.display = "none";
    } else {
        activeContactsSection.style.display = "none";
        deletedContactsSection.style.display = "block";
        fetchDeletedContacts();
    }
});

refreshContactsButton.addEventListener("click", fetchContacts);

fetchContacts();
