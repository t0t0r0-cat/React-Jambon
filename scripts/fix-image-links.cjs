const fs = require('fs');
const path = require('path');

function fixImageLinks(content) {
    // Replace image links while preserving necessary attributes
    content = content.replace(
        /<a href="https:\/\/blogger\.googleusercontent\.com[^>]*>(\s*)<img[^>]*data-original-[^>]*src="([^"]*)"[^>]*>(\s*)<\/a>/g,
        (match, space1, src, space2) => {
            // Keep just the img with local src path
            return `${space1}<img src="${src}" />${space2}`;
        }
    );

    // Remove other Blogger/Google links that might be around images
    content = content.replace(
        /<a href="https:\/\/(www\.)?(blogger|google)\.com[^>]*>.*?<\/a>/g,
        ''
    );

    // Clean up any leftover empty paragraphs and spaces
    content = content.replace(/<p>\s*<\/p>/g, '');
    content = content.replace(/\s{2,}/g, ' ');

    return content;
}

const articlesDir = path.join(__dirname, '..', 'src', 'articles', 'ArticleData');
const files = fs.readdirSync(articlesDir);

let modifiedFiles = 0;
files.forEach(file => {
    if (file.endsWith('.json')) {
        const filePath = path.join(articlesDir, file);
        const article = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        const originalContent = article.Content.content;
        article.Content.content = fixImageLinks(article.Content.content);
        
        if (originalContent !== article.Content.content) {
            fs.writeFileSync(filePath, JSON.stringify(article, null, 4));
            console.log(`Fixed image links in ${file}`);
            modifiedFiles++;
        }
    }
});

console.log(`\nCompleted: Modified ${modifiedFiles} files`);
