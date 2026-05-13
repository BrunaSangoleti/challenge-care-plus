const monthDisplay = document.getElementById('monthDisplay');
const calendarDays = document.getElementById('calendarDays');
const prevBtn = document.getElementById('prevMonth');
const nextBtn = document.getElementById('nextMonth');

// Declaramos apenas UMA vez. O sistema inicia na data atual.
let currentDate = new Date(); 

const condicoesClima = {
    chuva: {
        icone: "🌧️",
        mensagem: "<strong>Alerta de Chuva:</strong> Recomendamos consulta Online.",
        cor: "#e74c3c",
        imagem: "./src/img/chuvoso.png"
    },
    sol: {
        icone: "☀️",
        mensagem: "<strong>Céu Limpo:</strong> Perfeito para consulta Presencial.",
        cor: "#27ae60",
        imagem: "./src/img/ensolarado.png"
    },
    nublado: {
        icone: "☁️",
        mensagem: "<strong>Tempo Nublado:</strong> Condições estáveis para deslocamento.",
        cor: "#7f8c8d",
        imagem: "./src/img/nublado.jpg"
    }
};

function renderCalendar() {
    calendarDays.innerHTML = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Data de hoje para comparação (zerando horas)
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    monthDisplay.innerText = `${monthNames[month]} ${year}`;

    // Preenchimento de dias vazios
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyDiv = document.createElement('div');
        emptyDiv.classList.add('calendar-day', 'empty');
        calendarDays.appendChild(emptyDiv);
    }

    // Geração dos dias
    for (let day = 1; day <= lastDayOfMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.innerText = day;

        // Data para verificação de bloqueio
        const dataVerificacao = new Date(year, month, day);

        if (dataVerificacao < hoje) {
            // Se for antes de hoje, bloqueia
            dayElement.classList.add('past-day');
        } else {
            // Se for hoje ou futuro, permite o clique
            dayElement.addEventListener('click', () => {
                document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                dayElement.classList.add('selected');

                let climaSelecionado;
                if (day % 3 === 0) climaSelecionado = condicoesClima.nublado;
                else if (day % 2 === 0) climaSelecionado = condicoesClima.sol;
                else climaSelecionado = condicoesClima.chuva;

                const displayData = document.getElementById('weather-date');
                const displayTexto = document.getElementById('weather-text');
                const displayImagem = document.getElementById('weather-img'); 

                const diaFormatado = String(day).padStart(2, '0');
                const mesFormatado = String(month + 1).padStart(2, '0');

                if (displayData) displayData.innerText = `${diaFormatado}/${mesFormatado}/${year}`;
                if (displayImagem) displayImagem.src = climaSelecionado.imagem;
                if (displayTexto) {
                    displayTexto.innerHTML = climaSelecionado.mensagem;
                    displayTexto.style.color = climaSelecionado.cor;
                }
            });
        }
        calendarDays.appendChild(dayElement);
    }
}

// Botões de navegação
prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Chamada inicial
renderCalendar();