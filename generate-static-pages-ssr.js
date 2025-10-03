const React = require('react');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const path = require('path');
const { createRoot } = require('react-dom/client');
const { BrowserRouter } = require('react-router-dom');
const Navbar = require('./src/components/Navbar').default;
const BottomBar = require('./src/components/bottomBar').default;

// Function to generate HTML content from JSON data
function generateHtml(articleData) {
    const { Content, Metadata } = articleData;

    // Render Navbar and BottomBar components to string
    const navbar = ReactDOMServer.renderToString(
        React.createElement(BrowserRouter, null,
            React.createElement(Navbar, { onSearch: () => {} })
        )
    );

    const bottomBar = ReactDOMServer.renderToString(
        React.createElement(BottomBar)
    );
    
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${Content.title}</title>
    <link rel="stylesheet" href="../../styles/ArticlePage.css">
    <link rel="stylesheet" href="../../styles/App.css">
    <link rel="stylesheet" href="../../styles/Navbar.css">
</head>
<body class="dark-mode">
    <div id="navbar-root">${navbar}</div>
    <main>
        <div class="padding image-title-container">
            <img src="${Content.imageUrl || Metadata.imageUrl}" alt="${Content.imageAlt || Metadata.imageAlt || ''}" class="article-image-centered">
        </div>
        <div class="article-content">
            <h1>${Content.title}</h1>
            <div class="metadata">
                <strong>Author:</strong> ${Metadata.author}<br>
                <strong>Date:</strong> ${Metadata.date}<br>
                ${Content.description}
            </div>
            ${Content.content}
        </div>
    </main>
    <div id="bottom-bar-root">${bottomBar}</div>
    <script type="module">
        import { createRoot } from 'react-dom/client';
        import { BrowserRouter } from 'react-router-dom';
        import Navbar from '../../components/Navbar';
        import BottomBar from '../../components/bottomBar';

        // Hydrate the navbar
        const navbarRoot = createRoot(document.getElementById('navbar-root'));
        navbarRoot.render(
            <BrowserRouter>
                <Navbar onSearch={() => {}} />
            </BrowserRouter>
        );

        // Hydrate the bottom bar
        const bottomBarRoot = createRoot(document.getElementById('bottom-bar-root'));
        bottomBarRoot.render(<BottomBar />);
    </script>
</body>
</html>`;
}

// Create output directory
const staticDir = path.join(__dirname, 'src', 'articles', 'static');
if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir, { recursive: true });
}

// Process JSON files
const articlesDir = path.join(__dirname, 'ArticleData');
const files = fs.readdirSync(articlesDir);

files.forEach(file => {
    if (file.endsWith('.json')) {
        try {
            // Read and parse JSON file
            const jsonPath = path.join(articlesDir, file);
            const jsonContent = fs.readFileSync(jsonPath, 'utf8');
            const articleData = JSON.parse(jsonContent);

            if (!articleData.Content || !articleData.Metadata) {
                console.error(`Skipping ${file}: Invalid format`);
                return;
            }

            // Generate HTML
            const html = generateHtml(articleData);

            // Write HTML file
            const outputFileName = file.replace('.json', '.html');
            const outputPath = path.join(staticDir, outputFileName);
            fs.writeFileSync(outputPath, html);
            
            console.log(`Generated: ${outputFileName}`);
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
        }
    }
});

console.log('Static site generation complete!');