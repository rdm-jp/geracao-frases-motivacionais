// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');
    const newQuoteButton = document.getElementById('new-quote');
    const copyQuoteButton = document.getElementById('copy-quote');

    // Função para buscar uma nova citação
    async function fetchQuote() {
        try {
            // Remove a classe 'show' para reiniciar a animação
            quoteElement.classList.remove('show');

            // Faz a requisição para o endpoint /api/quote
            const response = await fetch('/api/quote');
            const data = await response.json();

            // Verifica se houve erro na resposta
            if (data.error) {
                throw new Error(data.error);
            }

            // Atualiza o texto da citação e do autor
            quoteElement.textContent = data.quote;
            authorElement.textContent = `— ${data.author}`;

            // Adiciona a classe 'show' após um pequeno atraso para a animação
            setTimeout(() => {
                quoteElement.classList.add('show');
            }, 100);
        } catch (error) {
            quoteElement.textContent = 'Erro ao carregar citação. Tente novamente!';
            authorElement.textContent = '';
            console.error('Erro:', error);
        }
    }

    // Função para copiar a citação
    function copyQuote() {
        const textToCopy = `${quoteElement.textContent} ${authorElement.textContent}`;
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Feedback visual ao copiar
            copyQuoteButton.textContent = 'Copiado!';
            setTimeout(() => {
                copyQuoteButton.textContent = 'Copiar Citação';
            }, 2000);
        }).catch(err => {
            console.error('Erro ao copiar:', err);
        });
    }

    // Event listeners
    newQuoteButton.addEventListener('click', fetchQuote);
    copyQuoteButton.addEventListener('click', copyQuote);

    // Carrega uma citação ao iniciar a página
    fetchQuote();
});