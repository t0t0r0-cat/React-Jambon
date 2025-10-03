const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from src directory
app.use(express.static(path.join(__dirname, 'src')));

// Serve files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the dist directory for the built components
app.use('/dist', express.static(path.join(__dirname, 'dist')));

// Serve article data
app.use('/ArticleData', express.static(path.join(__dirname, 'ArticleData')));

app.listen(port, () => {
    console.log(`Static server running at http://localhost:${port}`);
});