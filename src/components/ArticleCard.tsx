import React from 'react';

interface ArticleCardProps {
  title: string;
  description: string;
  imageUrl: string;
  articleUrl: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, imageUrl, articleUrl }) => {
  return (
    <div className="article-card">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      {articleUrl && (
        <a href={articleUrl} target="_blank" rel="noopener noreferrer">
          Read more
        </a>
      )}
    </div>
  );
};

export default ArticleCard;
