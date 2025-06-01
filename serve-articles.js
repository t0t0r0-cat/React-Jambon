import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.ARTICLES_PORT || 3001;

// Determine if we're in production mode
const isProduction = process.env.NODE_ENV === 'production';

// In production, look for articles in the dist directory
const defaultArticlesPath = isProduction 
  ? path.join(__dirname, 'dist', 'ArticleData')
  : path.join(__dirname, 'ArticleData');

// Get the articles path from environment variable, normalizing the path for the current platform
const rawPath = process.env.ARTICLES_PATH || defaultArticlesPath;
const ARTICLES_PATH = path.resolve(
  rawPath
    .replace('file://', '')
    // Replace both forward and back slashes with the platform-specific separator
    .split(/[\\/]/).join(path.sep)
);

// Ensure the articles directory exists
if (!fs.existsSync(ARTICLES_PATH)) {
  console.error(`Articles directory not found at: ${ARTICLES_PATH}`);
  console.error(`Looked in: ${ARTICLES_PATH}`);
  console.error('Please check your ARTICLES_PATH environment variable or create the directory');
  process.exit(1);
}

// Enable CORS for all environments
app.use(cors());

// Serve static files from the dist directory in production
if (isProduction) {
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
}

// Serve the manifest file
app.get('/ArticleData', (req, res) => {
  try {
    const manifestPath = path.join(ARTICLES_PATH, 'manifest.json');
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      res.json(manifest);
    } else {
      // If no manifest exists, list all JSON files
      const articles = fs.readdirSync(ARTICLES_PATH)
        .filter(file => file.toLowerCase().endsWith('.json'));
      res.json(articles);
    }
  } catch (error) {
    console.error('Error reading articles:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Serve individual article files
app.get('/ArticleData/:filename', (req, res) => {
  try {
    // Sanitize the filename to prevent directory traversal
    const filename = path.basename(req.params.filename);
    const articlePath = path.join(ARTICLES_PATH, filename);

    // Verify the resolved path is still within ARTICLES_PATH
    if (!articlePath.startsWith(ARTICLES_PATH)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (fs.existsSync(articlePath)) {
      const article = JSON.parse(fs.readFileSync(articlePath, 'utf-8'));
      res.json(article);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    console.error('Error reading article:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.listen(PORT, () => {
  console.log(`Article server is running on port ${PORT}`);
  console.log(`Serving articles from: ${ARTICLES_PATH}`);
});
