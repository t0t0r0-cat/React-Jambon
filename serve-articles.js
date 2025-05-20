import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

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

// Serve article data statically
app.use('/ArticleData', express.static(ARTICLES_PATH));

app.listen(PORT, () => {
  console.log(`Article server is running on port ${PORT}`);
  console.log(`Serving articles from: ${ARTICLES_PATH}`);
});
