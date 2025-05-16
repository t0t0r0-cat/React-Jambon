const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, '../public/ArticleData');

function cleanArticleContent(content) {
    // Remove h1 tags and their content
    content = content.replace(/<h1[^>]*>.*?<\/h1>/g, '');
    
    // Remove unnecessary bold tags
    content = content.replace(/<b>(.*?)<\/b>/g, '$1');
    
    // Remove extra spaces and line breaks
    content = content.replace(/\s+/g, ' ');
    
    // Clean up any double spaces
    content = content.replace(/\s{2,}/g, ' ');
    
    return content.trim();
}

function processArticleFiles() {
    const files = fs.readdirSync(articlesDir);
    
    files.forEach(file => {
        if (file.endsWith('.json')) {
            const filePath = path.join(articlesDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            const article = JSON.parse(content);
            
            if (article.Content && article.Content.content) {
                article.Content.content = cleanArticleContent(article.Content.content);
                
                // Write back the cleaned content
                fs.writeFileSync(filePath, JSON.stringify(article, null, 2));
                console.log(`Cleaned ${file}`);
            }
        }
    });
}

processArticleFiles();