// src/server.js
const express = require('express');
const path = require('path');
const { getRandomQuote } = require('./airtable');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Endpoint para obter uma citação aleatória
app.get('/api/quote', async (req, res) => {
    try {
        const quote = await getRandomQuote();
        res.json(quote);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar citação' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});