// 1. Seleciona TODOS os botões que têm essa classe
const botoes = document.querySelectorAll('.btn-participar');

botoes.forEach(botao => {
    botao.addEventListener('click', function() {
        // 1. Ações no botão (o que já tínhamos)
        this.classList.add('participando');
        this.innerText = '✓ Participando';
        this.disabled = true;

        // 2. Ação para mostrar a mensagem:
        // Procuramos a mensagem que é "irmã" deste botão específico
        const card = this.closest('.card-activity'); // Encontra o card pai
        const mensagem = card.querySelector('.mensagem-sucesso');
        
        if (mensagem) {
            mensagem.classList.remove('hidden'); // Remove o 'display: none'
        }
    });
});

//botões para confirmar consultas agendadas
// Selecionamos todos os botões de confirmação
const botoesConfirmar = document.querySelectorAll('.btn-confirm');

botoesConfirmar.forEach(botao => {
    botao.addEventListener('click', function() {
        // 1. Adiciona a classe de estado
        this.classList.add('confirmado');
        
        // 2. Muda o texto do botão que foi clicado
        this.innerText = '✓ Confirmado';
        
        // 3. Desabilita o botão para não confirmar novamente
        this.disabled = true;

        // O onclick="mostrarConfirmacao()" continuará funcionando 
        // normalmente e abrirá seu modal em paralelo.
    });
});