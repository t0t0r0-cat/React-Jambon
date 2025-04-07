import React from 'react';
import { useParams } from 'react-router-dom';

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const getArticleContent = () => {
    switch (id) {
      case '1':
        return {
          title: 'Article 1',
          content: 'Ceci est le contenu de l\'Article 1.',
          imageUrl: 'https://via.placeholder.com/600x300?text=Article+1+Image',
        };
      case '2':
        return {
          title: 'Article 2',
          content: 'Ceci est le contenu de l\'Article 2.',
          imageUrl: 'https://via.placeholder.com/600x300?text=Article+2+Image',
        };
      case '3':
        return {
          title: 'Article 3',
          content: 'Ceci est le contenu de l\'Article 3.',
          imageUrl: 'https://via.placeholder.com/600x300?text=Article+3+Image',
        };
      default:
        return {
          title: 'Article introuvable',
          content: 'L\'article que vous recherchez n\'existe pas.',
          imageUrl: 'https://via.placeholder.com/600x300?text=Not+Found',
        };
    }
  };

  const article = getArticleContent();

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>{article.title}</h1>
      <img src={article.imageUrl} alt={article.title} style={{ maxWidth: '100%', height: 'auto' }} />
      <p>{article.content}</p>
    </div>
  );
};

export default ArticlePage;