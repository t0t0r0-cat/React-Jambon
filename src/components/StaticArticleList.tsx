import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import '../styles/ArticleList.css';

interface StaticArticle {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  date: string;
  staticUrl: string;
}

const StaticArticleList: React.FC = () => {
  const [articles, setArticles] = useState<StaticArticle[]>([]);

  useEffect(() => {
    // Function to load articles from the static directory
    const loadStaticArticles = async () => {
      try {
        const articlesDir = 'http://localhost:3001/files';
        // Fetch the list of articles from manifest.json
        const response = await fetch(`${articlesDir}/manifest.json`);
        if (!response.ok) throw new Error('Failed to fetch articles');
        const data = await response.json();

        // Load each article's data
        const articlePromises = Object.keys(data).map(async (id) => {
          const articleResponse = await fetch(`${articlesDir}/${id}.json`);
          if (!articleResponse.ok) throw new Error(`Failed to fetch article ${id}`);
          const articleData = await articleResponse.json();
          return {
            id,
            title: articleData.Content.title,
            description: articleData.Content.description,
            imageUrl: articleData.Content.imageUrl || articleData.Metadata.imageUrl,
            author: articleData.Metadata.author,
            date: articleData.Metadata.date,
            staticUrl: `http://localhost:3001/articles/static/${id}.html`
          };
        });

        const loadedArticles = await Promise.all(articlePromises);
        setArticles(loadedArticles);
      } catch (error) {
        console.error('Error loading static articles:', error);
      }
    };

    loadStaticArticles();
  }, []);

  return (
    <div className="article-list">
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          title={article.title}
          description={article.description}
          imageUrl={article.imageUrl}
          author={article.author}
          date={article.date}
          link={article.staticUrl}
        />
      ))}
    </div>
  );
};

export default StaticArticleList;