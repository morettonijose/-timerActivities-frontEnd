const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8100; // Porta que o servidor irá escutar

// Middleware para servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint de exemplo
app.get('/api/test', (req, res) => {
    res.json({ message: 'Servidor Node.js está funcionando!' });
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor Node.js iniciado na porta ${PORT}`);
});