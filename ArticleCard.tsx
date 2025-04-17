// src/components/ArticleCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl: string;
  articleUrl: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, imageUrl, articleUrl, AltImage }) => (
  <Link to={articleUrl}>
    <div className="article-card">
      <img src={imageUrl} alt={AltImage} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </Link>
);

export default ArticleCard;
