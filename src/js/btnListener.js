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

// Função para criar e exibir um modal dinamicamente na tela
function mostrarModalMensagem(titulo, mensagem, urlDestino, isErro = false) {
    // Cria o fundo do modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex'; // Exibe o modal

    // Cria o container interno do modal
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // Cria o ícone (✓ para sucesso, ✕ para erro)
    const icon = document.createElement('div');
    icon.innerHTML = isErro ? '✕' : '✓';
    icon.style.fontSize = '3rem';
    icon.style.color = isErro ? 'var(--vermelho-danger)' : 'var(--verde-tag)';
    icon.style.marginBottom = '10px';

    // Cria o título
    const title = document.createElement('h2');
    title.innerText = titulo;

    // Cria o texto de descrição
    const text = document.createElement('p');
    text.innerText = mensagem;

    // Cria o botão de ação
    const btn = document.createElement('button');
    btn.className = 'btn-fechar';
    btn.innerText = isErro ? 'Tentar novamente' : 'Entendido';
    
    // Define a ação do botão
    btn.onclick = function() {
        if (urlDestino) {
            window.location.href = urlDestino; // Redireciona
        } else {
            document.body.removeChild(modal); // Apenas fecha o modal de erro
        }
    };

    // Adiciona todos os elementos ao modal e o modal ao body da página
    modalContent.appendChild(icon);
    modalContent.appendChild(title);
    modalContent.appendChild(text);
    modalContent.appendChild(btn);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
}

const botaoLogin = document.getElementById('btn-login');
if (botaoLogin) {
    botaoLogin.addEventListener('click', function() {
        // Busca os valores baseados nos IDs dos campos de input, e não pelo conteúdo da string
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Compara com os dados fictícios
        if (email === 'joaosilva@email.com' && password === 'joaosilva123') {
            // Exibe modal de sucesso e redireciona
            mostrarModalMensagem('Login Aprovado!', 'Você será redirecionado para o Dashboard.', './index.html');
        } else {
            // Exibe modal de erro (sem passar url, apenas fecha o modal)
            mostrarModalMensagem('Erro no Login', 'E-mail ou senha incorretos.', null, true);
        }
    });
}

const botaoSair = document.getElementById('btn-sair');
if (botaoSair) {
    botaoSair.addEventListener('click', function() {
        // Exibe modal informando logout e redireciona para o login
        mostrarModalMensagem('Até logo!', 'Você saiu da sua conta com segurança.', './login.html');
    });
}