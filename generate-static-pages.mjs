import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to generate HTML content from JSON data
function generateHtml(articleData) {
    const { Content, Metadata } = articleData;
    
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${Content.title}</title>
    <base href="http://localhost:3000/">
    <link rel="stylesheet" href="/styles/ArticlePage.css">
    <link rel="stylesheet" href="/styles/App.css">
    <link rel="stylesheet" href="/styles/Navbar.css">
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/react-router-dom@6/umd/react-router-dom.production.min.js"></script>
</head>
<body class="dark-mode">
    <div id="navbar-root"></div>
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
    <div id="bottom-bar-root"></div>
    <script type="module">
        import { Navbar, BottomBar } from '/dist/components.es.js';
        
        // Mount navbar
        const navbarRoot = ReactDOM.createRoot(document.getElementById('navbar-root'));
        navbarRoot.render(
            React.createElement(ReactRouterDOM.BrowserRouter, null,
                React.createElement(Navbar, { onSearch: () => {} })
            )
        );

        // Mount bottom bar
        const bottomBarRoot = ReactDOM.createRoot(document.getElementById('bottom-bar-root'));
        bottomBarRoot.render(React.createElement(BottomBar));
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