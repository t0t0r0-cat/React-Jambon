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
    <div className="article-page">
      <div
        className="article-banner"
        style={{
          backgroundImage: `url(${article.imageUrl})`,
        }}
      >
        <div className="banner-overlay">

          <h1 className="banner-title">{article.title}</h1>
        </div>
        <br></br><br></br><br></br>
      </div>
      <div className="article-content">
        <p><strong>Author:</strong> {article.author}</p>
        <p><strong>Date:</strong> {article.date}</p>
        <p>{article.description}</p>
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </div>
  );
};

export default ArticlePage;