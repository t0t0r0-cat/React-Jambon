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
    <div className="article-card">
      <Link to={articleUrl}>
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      </Link>
    </div>
  );
};

export default ArticleCard;
