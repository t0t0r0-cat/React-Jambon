// src/components/ArticleCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl: string;
  articleUrl: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, imageUrl, articleUrl }) => {
  return (
    <Link to={articleUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ cursor: 'pointer', border: '1px solid #ddd', padding: '16px', borderRadius: '8px' }}>
        <img src={imageUrl} alt={title} style={{ width: '100%', borderRadius: '8px' }} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default ArticleCard;
