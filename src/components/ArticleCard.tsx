// src/components/ArticleCard.tsx
import React from 'react';

interface ArticleProps {
  title: string;
  description: string;
  imageUrl: string;
  articleUrl: string;
}

const ArticleCard: React.FC<ArticleProps> = ({ title, description, imageUrl }) => {
  return (
    <a href="{articleUrl}" >
    <div className="article-card"> 
      <img src={imageUrl} alt={title} className="article-image" />
      <h3>{title}</h3>
      <p>{description}</p>
      </div></a>
  );
};

export default ArticleCard;
