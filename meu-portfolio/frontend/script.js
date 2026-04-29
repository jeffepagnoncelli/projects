const API_BASE = 'http://127.0.0.1:5000/api';

// --- LOGICA DE ABAS (TABS) ---
const navLinks = document.querySelectorAll('.nav-links li');
const tabContents = document.querySelectorAll('.tab-content');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Desativa todos
        navLinks.forEach(n => n.classList.remove('active'));
        tabContents.forEach(t => t.classList.remove('active'));

        // Ativa o clicado
        link.classList.add('active');
        const targetId = link.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// --- FUNÇÕES DE INTEGRAÇÃO COM BACKEND ---

/*async function loadSobre() {
    try {
        const res = await fetch(`${API_BASE}/sobre`);
        const data = await res.json();

        // Atualiza a interface
        document.querySelector('.profile-header h1').textContent = data.nome;
        document.getElementById('sobre-body').innerHTML = `
            <p style="font-size: 1.1rem; line-height: 1.8; color: var(--text-secondary);">
                ${data.resumo}
            </p>
        `;
    } catch (err) {
        console.error('Erro na API (Sobre):', err);
        document.getElementById('sobre-body').innerHTML = '<p>Erro ao conectar com a API. Verifique se o Flask (backend) está rodando!</p>';
    }
}*/

async function loadProjetos() {
    const grid = document.getElementById('projetos-grid');
    
    // Card fixo do VitaCare (Agendamento Médico)
    const agendamentoCard = `
        <div class="card" style="border: 1px solid rgba(122,158,135,0.4); background: rgba(122,158,135,0.05);">
            <h3 style="color: #7A9E87; font-family: 'Cormorant Garamond', serif; font-size: 1.6rem;">VitaCare</h3>
            <p>Sistema web de agendamento de consultas médicas com design inovador e elegante.</p>
            <a href="agendamento.html" target="_blank" style="display:inline-block; margin-top:0.5rem; color:#7A9E87; text-decoration:none; font-weight:bold;">Acessar Projeto &rarr;</a>
        </div>
    `;

    try {
        const res = await fetch(`${API_BASE}/projetos`);
        const projetos = await res.json();

        let htmlProjetos = agendamentoCard;

        if (projetos.length > 0) {
            htmlProjetos += projetos.map(p => `
                <div class="card">
                    <h3>${p.titulo}</h3>
                    <p>${p.descricao}</p>
                    ${p.link ? `<a href="${p.link}" target="_blank">Ver Projeto &rarr;</a>` : ''}
                </div>
            `).join('');
        }

        grid.innerHTML = htmlProjetos;
    } catch (err) {
        grid.innerHTML = agendamentoCard + '<p style="margin-top:1rem;">Erro ao carregar os demais projetos. O servidor Backend está rodando?</p>';
    }
}

async function loadCarreira() {
    const timeline = document.getElementById('carreira-timeline');
    try {
        const res = await fetch(`${API_BASE}/carreira`);
        const experiencias = await res.json();

        if (experiencias.length === 0) {
            timeline.innerHTML = '<p>Nenhuma experiência cadastrada no banco ainda.</p>';
            return;
        }

        timeline.innerHTML = experiencias.map(e => `
            <div class="timeline-item">
                <div class="period">${e.periodo || 'Período não informado'}</div>
                <h3>${e.cargo}</h3>
                <div class="empresa">${e.empresa}</div>
                <p>${e.descricao || ''}</p>
            </div>
        `).join('');
    } catch (err) {
        timeline.innerHTML = '<p>Erro ao carregar carreira via API.</p>';
    }
}

async function loadCertificados() {
    const grid = document.getElementById('certificados-grid');
    try {
        const res = await fetch(`${API_BASE}/certificados`);
        const certificados = await res.json();

        if (certificados.length === 0) {
            grid.innerHTML = '<p>Nenhum certificado cadastrado no banco ainda.</p>';
            return;
        }

        grid.innerHTML = certificados.map(c => `
            <div class="card">
                <h3>${c.nome}</h3>
                <p class="empresa" style="color: var(--text-secondary); margin-bottom: 0.5rem;">Instituição: <strong>${c.instituicao}</strong></p>
                ${c.data ? `<p style="font-size: 0.85rem; color: var(--accent-hover);">Data: ${c.data}</p>` : ''}
            </div>
        `).join('');
    } catch (err) {
        grid.innerHTML = '<p>Erro ao carregar certificados via API.</p>';
    }
}

// Quando a página HTML carregar totalmente, fazemos a primeira chamada nas funções de load
window.addEventListener('DOMContentLoaded', () => {
    // loadSobre(); // Comentado pois a função está inativa
    loadProjetos();
    // loadCarreira(); // Comentado para não sobrescrever HTML estático
    // loadCertificados(); // Comentado para não sobrescrever HTML estático
});

const avatar = document.querySelector('.avatar');
const modal = document.getElementById('modal');

avatar.addEventListener('click', () => {
    modal.classList.add('active');
});

modal.addEventListener('click', () => {
    modal.classList.remove('active');
});
