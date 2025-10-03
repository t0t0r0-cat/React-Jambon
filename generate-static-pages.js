const fs = require('fs');
const path = require('path');

// Function to generate static navbar HTML
function generateNavbar() {
    return `
    <nav class="navbar">
        <a href="/" class="brand">Éco de l'île</a>
        <div class="navbar-search-bar-container">
            <div class="search-bar">
                <input type="text" placeholder="Rechercher..." />
                <button>🔍</button>
            </div>
        </div>
        <div class="mobile-menu">
            <button class="mobile-menu-toggle">☰</button>
        </div>
        <label class="switch">
            <input type="checkbox" id="darkModeToggle">
            <span class="slider"></span>
        </label>
        <div class="nav-links">
            <a href="/">Accueil</a>
            <a href="/espace-jambon">Espace Jambon</a>
            <a href="/contact">Contact</a>
            <a href="/about">À propos</a>
        </div>
    </nav>`;
}

// Function to generate static bottom bar HTML
function generateBottomBar() {
    const year = new Date().getFullYear();
    return `
    <footer class="bottom-bar">
        <nav>
            <ul>
                <li>Code sous licence <a href='https://www.gnu.org/licenses/gpl-3.0.en.html'>GNU GPL v3.</a> Illustrations et images © ${year} Tous droits réservés au proprietaires.</li>
                <li>Code disponible sur <a href='https://github.com/t0t0r0-cat/React-Jambon'>github.</a></li>
            </ul>
        </nav>
    </footer>`;
}

// Function to generate HTML content from JSON data
function generateHtml(articleData) {
    const { Content, Metadata } = articleData;
    
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
    ${generateNavbar()}
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
    ${generateBottomBar()}
    <script>
        // Dark mode toggle functionality
        document.getElementById('darkModeToggle').addEventListener('change', function() {
            document.body.classList.toggle('dark-mode');
            document.body.classList.toggle('light-mode');
        });

        // Mobile menu toggle functionality
        document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });
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