import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ArticlePage.css';
import '../styles/App.css';

interface ArticlePageProps {
  articles: any[];
}

const ArticlePage: React.FC<ArticlePageProps> = ({ articles }) => {
  const { id } = useParams<{ id: string }>();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return <div>Article introuvable</div>;
  }

  return (
    <>
      <div className="padding image-title-container">
        <img
          src={article.imageUrl}
          alt={article.imageAlt}
          className="article-image-centered"
        />

      </div>
      <div className="article-content">
        <h1>{article.title}</h1>
        <div className='metadata'>
        <strong>Author:</strong> {article.author}<br />
        <strong>Date:</strong> {article.date}<br />
        {article.description}
        </div>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </>  
  );
};

export default ArticlePage;