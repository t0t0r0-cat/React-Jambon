import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArticleCard.css';

interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  imageAlt?: string;
  date?: string;
  author?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, imageUrl, link, imageAlt = '', date, author }) => (
  <Link to={link} className="article-card-link">
    <div className="article-card">
      <img src={imageUrl} alt={imageAlt} />
      <h3>{title}</h3>
      {author && <p className="article-author">Par {author}</p>}
      {date && <p className="article-date">{new Date(date).toLocaleDateString()}</p>}
      <p>{description}</p>
    </div>
  </Link>
);

export default ArticleCard;
