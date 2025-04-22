// src/components/ArticleCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArticleCard.css';

interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl: string;
  articleUrl: string;
  imageAlt: string; // <-- Add this line
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, imageUrl, articleUrl, imageAlt }) => (
  <Link to={articleUrl}>
    <div className="article-card">
      <img src={imageUrl} alt={imageAlt} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </Link>
);

export default ArticleCard;
