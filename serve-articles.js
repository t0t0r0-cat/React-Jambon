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

// Get the articles path from environment variable, removing any file:// prefix
const rawPath = process.env.ARTICLES_PATH || path.join(__dirname, 'public', 'ArticleData');
const ARTICLES_PATH = path.resolve(rawPath.replace('file://', ''));

// Enable CORS for development
app.use(cors());

// Serve the manifest file
app.get('/ArticleData', (req, res) => {
  try {
    const manifestPath = path.join(ARTICLES_PATH, 'manifest.json');
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      res.json(manifest);
    } else {
      const articles = fs.readdirSync(ARTICLES_PATH)
        .filter(file => file.endsWith('.json'));
      res.json(articles);
    }
  } catch (error) {
    console.error('Error reading articles:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve individual article files
app.get('/ArticleData/:filename', (req, res) => {
  try {
    const articlePath = path.join(ARTICLES_PATH, req.params.filename);
    if (fs.existsSync(articlePath)) {
      const article = JSON.parse(fs.readFileSync(articlePath, 'utf-8'));
      res.json(article);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    console.error('Error reading article:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Article server is running on port ${PORT}`);
  console.log(`Serving articles from: ${ARTICLES_PATH}`);
});
