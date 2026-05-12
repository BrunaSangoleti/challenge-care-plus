function mostrarConfirmacao() {
    // Busca o modal pelo ID
    const modal = document.getElementById("modalConfirmacao");

    // Faz o modal aparecer
    modal.style.display = "flex";
}

function fecharModal() {
    const modal = document.getElementById("modalConfirmacao");
    modal.style.display = "none";
}

// Opcional: Fecha o modal se o usuário clicar fora da caixa branca
window.onclick = function (event) {
    const modal = document.getElementById("modalConfirmacao");
    if (event.target == modal) {
        fecharModal();
    }
}

// Funções para abrir e fechar o modal de remarcar
// 1. Variável global para armazenar qual card está sendo editado
let elementoSendoEditado = null;

// 1. Função para abrir o modal
function abrirRemarcar(botaoClicado) {
    const linhaPai = botaoClicado.closest('.table-row');
    elementoSendoEditado = linhaPai.querySelector('.data-hora-card');

    const modal = document.getElementById("modalRemarcar");
    const inputData = document.getElementById("novaData");

    if (modal) {
        // Bloqueia visualmente datas passadas no calendário
        // Obtém a data de hoje no formato YYYY-MM-DD
        const hoje = new Date().toISOString().split('T')[0];
        inputData.setAttribute('min', hoje);

        modal.style.display = "flex"; // Abre com flex para centralizar
    } else {
        console.error("Erro: Modal com ID 'modalRemarcar' não encontrado.");
    }
}

// 2. Função para salvar as alterações
function salvarRemarcacao() {
    const dataInput = document.getElementById("novaData").value;
    const horario = document.getElementById("novoHorario").value;

    if (dataInput === "") {
        alert("Por favor, selecione uma nova data.");
        return;
    }

    // Validação de data atual/futura
    const dataEscolhida = new Date(dataInput + 'T00:00:00');
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Zera as horas para comparar apenas o dia

    if (dataEscolhida < hoje) {
        alert("A data escolhida não pode ser anterior à data atual.");
        return;
    }

    // Formata a data para o padrão Brasileiro (DD/MM/AAAA)
    const dataObjeto = new Date(dataInput.replace(/-/g, '\/'));
    const dataFormatada = dataObjeto.toLocaleDateString('pt-BR');

    // Se seu card usa o formato curto (ex: 25/10), você pode usar:
    // const dataFormatadaCurta = dataFormatada.substring(0, 5);

    if (elementoSendoEditado) {
        elementoSendoEditado.innerText = `${dataFormatada} - ${horario}`;
        
        // Opcional: Abrir o modal de confirmação de sucesso aqui
        fecharRemarcar();
        
        const modalSucesso = document.getElementById("modalConfirmacao");
        if(modalSucesso) modalSucesso.style.display = "flex";
    }
}

// 3. Função para fechar o modal
function fecharRemarcar() {
    const modal = document.getElementById("modalRemarcar");
    if (modal) {
        modal.style.display = "none";
    }
}

function abrirGoogleCalendar() {
    try {
        const titulo = document.getElementById('titulo').value || "Novo Evento";
        const dataInput = document.getElementById('dataHora').value;

        if (!dataInput) {
            alert("Por favor, selecione uma data e hora.");
            return;
        }

        // Limpeza da data: de "2026-05-11T14:30" para "20260511T143000"
        // O Google exige o formato YYYYMMDDTHHMMSS
        const dataFormatada = dataInput.replace(/[-:]/g, "") + "00";
        
        // Definindo o fim do evento para 1 hora depois (opcional)
        // Para simplificar, usaremos a mesma data (evento pontual)
        const datas = `${dataFormatada}/${dataFormatada}`;

        const baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";
        const urlFinal = `${baseUrl}&text=${encodeURIComponent(titulo)}&dates=${datas}&sf=true&output=xml`;

        // Log para depuração (aperte F12 no navegador para ver se a URL está correta)
        console.log("Abrindo URL:", urlFinal);

        // Abre em nova aba
        const novaAba = window.open(urlFinal, '_blank');
        
        if (!novaAba) {
            alert("O navegador bloqueou a abertura da aba. Por favor, permita pop-ups para este site.");
        }
    } catch (erro) {
        console.error("Erro ao tentar abrir o calendário:", erro);
    }
}