const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const articlesDir = path.join(__dirname, '..', 'src', 'articles', 'ArticleData');
const imagesDir = path.join(__dirname, '..', 'public', 'images');
const downloadedUrls = new Map();

function generateImageName(url) {
    // Generate a hash of the URL to create a unique filename
    const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 8);
    const ext = path.extname(url.split('?')[0]) || '.jpg'; // Get extension or default to .jpg
    return `${hash}${ext}`;
}

function downloadImage(url) {
    return new Promise((resolve, reject) => {
        // Check if we've already downloaded this URL
        if (downloadedUrls.has(url)) {
            resolve(downloadedUrls.get(url));
            return;
        }

        const filename = generateImageName(url);
        const filepath = path.join(imagesDir, filename);

        // If file already exists, return its path
        if (fs.existsSync(filepath)) {
            const relativePath = `/images/${filename}`;
            downloadedUrls.set(url, relativePath);
            resolve(relativePath);
            return;
        }

        console.log(`Downloading: ${url}`);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }

            const file = fs.createWriteStream(filepath);
            response.pipe(file);

            file.on('finish', () => {
                file.close();
                const relativePath = `/images/${filename}`;
                downloadedUrls.set(url, relativePath);
                resolve(relativePath);
            });

            file.on('error', (err) => {
                fs.unlink(filepath, () => {}); // Delete the file if there was an error
                reject(err);
            });
        }).on('error', reject);
    });
}

async function processArticle(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const article = JSON.parse(content);
    let modified = false;

    // Process main image URL in metadata
    if (article.Metadata.imageUrl && article.Metadata.imageUrl.startsWith('http')) {
        try {
            const newPath = await downloadImage(article.Metadata.imageUrl);
            article.Metadata.imageUrl = newPath;
            modified = true;
        } catch (err) {
            console.error(`Error downloading metadata image for ${filePath}:`, err);
        }
    }

    // Extract all image URLs from content
    const imgRegex = /<img[^>]+src="([^"]+)"/g;
    let newContent = article.Content.content;
    const matches = [...article.Content.content.matchAll(imgRegex)];

    for (const match of matches) {
        const url = match[1];
        if (url.startsWith('http')) {
            try {
                const newPath = await downloadImage(url);
                newContent = newContent.replace(url, newPath);
                modified = true;
            } catch (err) {
                console.error(`Error downloading content image for ${filePath}:`, err);
            }
        }
    }

    if (modified) {
        article.Content.content = newContent;
        fs.writeFileSync(filePath, JSON.stringify(article, null, 4));
        console.log(`Updated ${filePath}`);
    }
}

async function main() {
    const files = fs.readdirSync(articlesDir);
    
    for (const file of files) {
        if (file.endsWith('.json')) {
            const filePath = path.join(articlesDir, file);
            try {
                await processArticle(filePath);
            } catch (err) {
                console.error(`Error processing ${file}:`, err);
            }
        }
    }
}

main().catch(console.error);
