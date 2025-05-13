import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Script starting...');

try {
    // Process articles
    const articlesDir = join(__dirname, '..', 'src', 'articles', 'ArticleData');
    console.log('Reading articles from:', articlesDir);
    
    const files = readdirSync(articlesDir);
    const articleFiles = files.filter(f => f.endsWith('.json'));
    console.log('Found', articleFiles.length, 'article files');

    let totalModifications = 0;

    articleFiles.forEach(file => {
        const filePath = join(articlesDir, file);
        console.log('\nProcessing:', file);
        
        const content = readFileSync(filePath, 'utf8');
        const article = JSON.parse(content);
        let modified = false;

        // Find first image in content
        if (article.Content?.content) {
            // Look for image pattern in content
            const imageMatch = article.Content.content.match(/\/images\/([a-zA-Z0-9]+\.(jpg|jpeg|png|gif|webp))/i);
            
            if (imageMatch) {
                const firstImage = imageMatch[0]; // Full path including /images/
                const filename = imageMatch[1];   // Just the filename
                
                // Update metadata image URL if it's different
                if (article.Metadata?.imageUrl !== firstImage) {
                    article.Metadata = article.Metadata || {};
                    article.Metadata.imageUrl = firstImage;
                    modified = true;
                    console.log(`- Updated thumbnail to ${filename}`);
                }
            } else {
                console.log('- No images found in content');
            }
        }

        // Save changes if needed
        if (modified) {
            writeFileSync(filePath, JSON.stringify(article, null, 2));
            totalModifications++;
            console.log('✓ Saved changes to', file);
        } else {
            console.log('- No changes needed in', file);
        }
    });

    console.log('\nUpdate complete!');
    console.log(`Modified ${totalModifications} articles`);
    console.log(`Found ${articleFiles.length} total articles`);

} catch (error) {
    console.error('\nError:', error.message);
    console.error('Stack trace:', error.stack);
}
