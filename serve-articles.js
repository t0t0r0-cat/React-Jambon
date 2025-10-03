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

// Log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  
  // Capture the original res.json
  const originalJson = res.json;
  res.json = function(body) {
    console.log('Response body:', body);
    return originalJson.call(this, body);
  };
  
  next();
});

// Enable CORS for all routes and serve static files
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Serve static files directly from the ArticleData directory
app.use('/files', express.static(path.join(__dirname, 'ArticleData')));

// Test endpoint
app.get('/test', (req, res) => {
  console.log('Test request received');
  res.json({ message: 'Hello World' });
});

// Determine if we're in production mode
const isProduction = process.env.NODE_ENV === 'production';

// In production, look for articles in the dist directory

// Create and serve manifest.json
const generateManifest = () => {
  console.log('Generating manifest...');
  console.log('ARTICLES_PATH:', ARTICLES_PATH);
  
  if (!fs.existsSync(ARTICLES_PATH)) {
    console.error('Articles directory does not exist:', ARTICLES_PATH);
    throw new Error('Articles directory not found');
  }

  const files = fs.readdirSync(ARTICLES_PATH);
  console.log('All files in directory:', files);
  
  const jsonFiles = files.filter(file => file.endsWith('.json') && file !== 'manifest.json');
  console.log('JSON files found:', jsonFiles);
  
  const manifest = {};
  for (const file of jsonFiles) {
    try {
      const id = file.replace('.json', '');
      const filePath = path.join(ARTICLES_PATH, file);
      console.log('Reading file:', filePath);
      
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const content = JSON.parse(fileContent);
      
      if (content && content.Content && content.Content.title) {
        manifest[id] = {
          title: content.Content.title,
          description: content.Content.description || '',
          imageUrl: content.Metadata?.imageUrl || ''
        };
        console.log('Successfully processed article:', id);
      } else {
        console.log('Article missing required fields:', id);
      }
    } catch (error) {
      console.error(`Error processing file ${file}:`, error);
    }
  }
  
  console.log('Final manifest:', manifest);
  return manifest;
};
const defaultArticlesPath = isProduction 
  ? path.join(__dirname, 'dist', 'ArticleData')
  : path.join(__dirname, 'ArticleData');

// Get the articles path from environment variable, normalizing the path for the current platform
const ARTICLES_PATH = path.join(__dirname, 'ArticleData');

// Ensure the articles directory exists
if (!fs.existsSync(ARTICLES_PATH)) {
  console.error(`Articles directory not found at: ${ARTICLES_PATH}`);
  console.error(`Looked in: ${ARTICLES_PATH}`);
  console.error('Please check your ARTICLES_PATH environment variable or create the directory');
  process.exit(1);
}

// CORS is already enabled at the top of the file

// Serve static files from the dist directory in production
if (isProduction) {
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
}

// Serve the manifest file
app.get('/articles', (req, res) => {
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
// Serve manifest.json
app.get('/articles/manifest', (req, res) => {
  console.log('Manifest request received');
  try {
    console.log('Reading manifest file...');
    const manifestPath = path.join(ARTICLES_PATH, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

    console.log('Sending manifest:', manifest);
    res.json(manifest);
  } catch (error) {
    console.error('Error generating manifest:', error);
    res.status(500).json({ error: 'Failed to generate manifest', details: error.message });
  }
});

app.get('/articles/:articleId', (req, res) => {
  try {
    // Sanitize the filename to prevent directory traversal
    const filename = path.basename(req.params.articleId) + '.json';
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

const server = app.listen(PORT, () => {
  console.log(`Article server is running on port ${PORT}`);
  console.log(`Serving articles from: ${ARTICLES_PATH}`);
}).on('error', (err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
