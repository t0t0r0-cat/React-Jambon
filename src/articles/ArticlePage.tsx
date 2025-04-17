import React from 'react';
import { useParams } from 'react-router-dom';
import articlesData from './articlesData';
import Article from '../components/Article';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the article ID from the URL
  const article = articlesData.find((article) => article.id === id); // Find the article by ID

  if (!article) {
    return <p>Article not found.</p>; // Handle case where article is not found
  }

  return (
    <Article
      title={article.title}
      content={article.content}
      imageUrl={article.imageUrl}
      imageAlt={article.imageAlt}
      author={article.author}
      date={article.date}
    />
  );
};

export default ArticlePage;