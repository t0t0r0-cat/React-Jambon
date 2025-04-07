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
      <img src={imageUrl} alt={title} className="article-image" />
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={articleUrl} className="read-more">
        Read More
      </Link>
    </div>
  );
};

export default ArticleCard;
