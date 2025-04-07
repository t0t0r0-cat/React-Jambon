import React from 'react';
import { useParams } from 'react-router-dom';
import articles from './articlesData'; // Import the external articles file

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const article = articles.find((article) => article.id === id) || {
    title: 'Article introuvable',
    description: 'L\'article que vous recherchez n\'existe pas.',
    imageUrl: 'https://via.placeholder.com/600x300?text=Not+Found',
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>{article.title}</h1>
      <img src={article.imageUrl} alt={article.title} style={{ maxWidth: '100%', height: 'auto' }} />
      <p>{article.description}</p>
    </div>
  );
};

export default ArticlePage;