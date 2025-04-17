import React from 'react';
import { useParams } from 'react-router-dom';

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
    <div>
      <br /><br /><br /><br /><br />
      <h1>{article.title}</h1>
      <p><strong>Author:</strong> {article.author}</p>
      <p><strong>Date:</strong> {article.date}</p>
      <img src={article.imageUrl} alt={article.title} style={{ maxWidth: '100%', height: 'auto' }} />
      <p>{article.description}</p>
      <div>{article.content}</div>
    </div>
  );
};

export default ArticlePage;