const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

app.get('^/$|/index(.html)?', (req, res) => {
  // res.sendFile('./view/index.html', { root: __dirname });
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.get('/newPage(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'newPage.html'));
});

app.get('/oldPage(.html)?', (req, res) => {
  res.redirect(301, '/newPage.html');
});

app.get('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'view', '404.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
