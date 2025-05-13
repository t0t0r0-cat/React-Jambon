import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArticleCard.css';

interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl: string;
  articleUrl: string;
  imageAlt: string;
  date?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, imageUrl, articleUrl, imageAlt, date }) => (
  <Link to={articleUrl}>
    <div className="article-card">
      <img src={imageUrl} alt={imageAlt} />
      <h3>{title}</h3>
      {date && <p className="article-date">{new Date(date).toLocaleDateString()}</p>}
      <p>{description}</p>
    </div>
  </Link>
);

export default ArticleCard;
