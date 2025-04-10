import React from 'react';
import { useParams } from 'react-router-dom';
import articles from './articlesData';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Find the article by ID
  const article = articles?.find((article) => article.id === id);

  // If the article is not found, display a fallback message
  if (!article) {
    return (
      <div>
        <h1>Article introuvable</h1>
        <p>L'article que vous recherchez n'existe pas ou a été supprimé.</p>
        <img
          src="https://via.placeholder.com/600x300?text=Not+Found"
          alt="Not Found"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
    );
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p><strong>Author:</strong> {article.author}</p>
      <p><strong>Date:</strong> {article.date}</p>
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      )}
      <p>{article.description}</p>
    </div>
  );
};

export default ArticlePage;