const monthDisplay = document.getElementById('monthDisplay');
const calendarDays = document.getElementById('calendarDays');
const prevBtn = document.getElementById('prevMonth');
const nextBtn = document.getElementById('nextMonth');

// Inicia em Março de 2026 conforme o layout do projeto
let currentDate = new Date(2026, 2, 1);

// Simulação de estados climáticos para UX Dinâmico
const condicoesClima = {
    chuva: {
        icone: "🌧️",
        mensagem: "<strong>Alerta de Chuva:</strong> Recomendamos consulta Online.",
        cor: "#e74c3c",
        imagem: "../img/chuvoso.png"
    },
    sol: {
        icone: "☀️",
        mensagem: "<strong>Céu Limpo:</strong> Perfeito para consulta Presencial.",
        cor: "#27ae60",
        imagem: "../img/ensolarado.png"
    },
    nublado: {
        icone: "☁️",
        mensagem: "<strong>Tempo Nublado:</strong> Condições estáveis para deslocamento.",
        cor: "#7f8c8d",
        imagem: "../img/nublado.png"
    }
};

function renderCalendar() {
    calendarDays.innerHTML = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    monthDisplay.innerText = `${monthNames[month]} ${year}`;

    // Preenchimento de espaços vazios (dias da semana anterior)
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('calendar-day', 'empty');
        calendarDays.appendChild(emptyDiv);
    }

    // Criação dos dias do mês
    for (let day = 1; day <= lastDayOfMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.innerText = day;

        // Único evento de clique para gerenciar Seleção + Clima
        dayElement.addEventListener('click', () => {
            // 1. Gerenciar destaque visual
            document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
            dayElement.classList.add('selected');

            // 2. Lógica de decisão do Clima (Simulação)
            let climaSelecionado;
            if (day % 3 === 0) {
                climaSelecionado = condicoesClima.nublado;
            } else if (day % 2 === 0) {
                climaSelecionado = condicoesClima.sol;
            } else {
                climaSelecionado = condicoesClima.chuva;
            }

            // 3. Atualização dos elementos de Previsão no HTML
            const displayData = document.getElementById('weather-date');
            const displayIcone = document.getElementById('weather-icon');
            const displayTexto = document.getElementById('weather-text');
            const diaFormatado = String(day).padStart(2, '0');
            const mesFormatado = String(month + 1).padStart(2, '0');

            if (displayData) {
                displayData.innerText = `${diaFormatado}/${mesFormatado}/${year}`;
            }

            
            if (displayIcone) displayIcone.innerText = climaSelecionado.icone;
            if (displayTexto) {
                displayTexto.innerHTML = climaSelecionado.mensagem;
                displayTexto.style.color = climaSelecionado.cor;
            }

            console.log(`Data: ${day}/${month + 1}/${year} - Clima:`, climaSelecionado.icone);
        });

        calendarDays.appendChild(dayElement);
    }
}

// Listeners dos botões de navegação
prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Execução inicial
renderCalendar();