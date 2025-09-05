// src/airtable.js
const Airtable = require('airtable');
require('dotenv').config();

// Configura a conexão com o Airtable usando a API Key e Base ID do arquivo .env
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

// Função para obter uma citação aleatória
async function getRandomQuote() {
    try {
        // Busca todos os registros da tabela 'MotivationalQuotes'
        const records = await base('MotivationalQuotes').select({
            view: 'Grid view' // Usa a visualização padrão
        }).all();

        // Seleciona um registro aleatoriamente
        const randomIndex = Math.floor(Math.random() * records.length);
        const record = records[randomIndex];

        // Retorna a citação e o autor
        return {
            quote: record.get('Quote'),
            author: record.get('Author') || 'Desconhecido'
        };
    } catch (error) {
        console.error('Erro ao buscar citação:', error);
        throw error;
    }
}

module.exports = { getRandomQuote };