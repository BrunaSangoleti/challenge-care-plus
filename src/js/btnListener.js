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

const botaoLogin = document.getElementById('btn-login');
if (botaoLogin) {
    botaoLogin.addEventListener('click', function() {
        // Busca os valores baseados nos IDs dos campos de input, e não pelo conteúdo da string
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Compara com os dados fictícios
        if (email === 'joaosilva@email.com' && password === 'joaosilva123') {
            
            // Simula um login bem-sucedido
            alert('Login bem-sucedido!');
            // Redireciona para a página principal ou dashboard
            window.location.href = './index.html'; // Substitua pelo caminho correto
        } else {
            alert('E-mail ou senha incorretos.');
        }
    });
}

const botaoSair = document.getElementById('btn-sair');
if (botaoSair) {
    botaoSair.addEventListener('click', function() {
        // Simula o processo de logout
        alert('Você saiu da conta.');
        // Redireciona para a página de login
        window.location.href = './login.html'; // Substitua pelo caminho correto
    });
}