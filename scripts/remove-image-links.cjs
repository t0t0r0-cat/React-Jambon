const fs = require('fs');
const path = require('path');

function removeImageLinks(content) {
    // Replace linked images with just the img tag
    return content.replace(
        /<a href="[^"]*" imageanchor="[^"]*">\s*(<img[^>]*>)\s*<\/a>/g, 
        '$1'
    );
}

const articlesDir = path.join(__dirname, '..', 'src', 'articles', 'ArticleData');
const files = fs.readdirSync(articlesDir);

files.forEach(file => {
    if (file.endsWith('.json')) {
        const filePath = path.join(articlesDir, file);
        const article = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        // Remove image links in content
        article.Content.content = removeImageLinks(article.Content.content);
        
        // Write back the updated JSON
        fs.writeFileSync(filePath, JSON.stringify(article, null, 4));
        console.log(`Removed image links in ${file}`);
    }
});
