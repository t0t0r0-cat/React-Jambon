import { config } from '../config';

interface ArticleContent {
  title?: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
}

interface ArticleMetadata {
  imageUrl?: string;
  imageAlt?: string;
  date?: string;
  author?: string;
}

interface ArticleSystem {
  article?: string;
}

interface ArticleData {
  Content: ArticleContent;
  Metadata: ArticleMetadata;
  system: ArticleSystem;
}

interface Article {
  id: string;
  articleUrl: string;
  title: string | undefined;
  description: string | undefined;
  content: string | undefined;
  imageUrl: string | undefined;
  imageAlt: string | undefined;
  date: string | undefined;
  author: string | undefined;
}

type ArticleOrNull = Article | null;

function processArticleData(filename: string, data: ArticleData): Article {
  const content = data.Content || {};
  const metadata = data.Metadata || {};
  const system = data.system || {};
  
  // Get the ID from the article path and ensure it uses /articles/
  const rawId = system.article?.replace(/^\/(article|articles)\//, '') || '';
  const id = rawId || filename.replace('.json', '');
  const articleUrl = `http://localhost:3001/articles/static/${id}.html`;
  
  return {
    id,
    articleUrl,
    title: content.title,
    description: content.description,
    content: content.content,
    imageUrl: content.imageUrl || metadata.imageUrl,
    imageAlt: content.imageAlt || metadata.imageAlt,
    date: metadata.date,
    author: metadata.author
  };
}

export async function loadAllArticles(): Promise<Article[]> {
  try {
    const manifestUrl = `${config.articlesBasePath}/manifest.json`;
    console.log('Loading articles manifest from:', manifestUrl);
    
    const manifestResponse = await fetch(manifestUrl, {
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!manifestResponse.ok) {
      const errorText = await manifestResponse.text();
      console.error('Failed to load manifest:', {
        status: manifestResponse.status,
        statusText: manifestResponse.statusText,
        error: errorText
      });
      throw new Error('Failed to load articles manifest');
    }
    
    const files: string[] = await manifestResponse.json();
    console.log('Found articles:', files);
    
    const articlePromises = files.map(async (filename): Promise<ArticleOrNull> => {
      try {
        const fetchUrl = `${config.articlesBasePath}/${filename}`;
        console.log('Loading article:', fetchUrl);
        
        const response = await fetch(fetchUrl, {
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Failed to load article ${filename}:`, {
            status: response.status,
            statusText: response.statusText,
            error: errorText
          });
          return null;
        }
        
        const data: ArticleData = await response.json();
        return processArticleData(filename, data);
      } catch (error) {
        console.error(`Error loading article ${filename}:`, error);
        return null;
      }
    });

    const articles = (await Promise.all(articlePromises))
      .filter((article): article is Article => article !== null)
      .sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    
    console.log('Successfully loaded articles:', articles.length);
    return articles;
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}