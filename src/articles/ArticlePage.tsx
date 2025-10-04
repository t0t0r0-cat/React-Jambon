import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ArticlePage.css';
import '../styles/App.css';

interface Article {
  id: string | number;
  title: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  imageAlt?: string;
  date?: string;
  author?: string;
}

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID d\'article manquant');
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch('http://localhost:8000/get_json_data.php')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        return response.json();
      })
      .then((data: any[]) => {
          // Find by multiple fallbacks to handle how IDs are stored by PHP:
          // - some articles have 'id' set to the full path '/articles/slug'
          // - some have numeric/string ids
          // - 'articleUrl' may contain the path
          const param = id || '';
          const found = data.find((a) => {
            const aId = a.id != null ? String(a.id) : '';
            const aArticleUrl = a.articleUrl != null ? String(a.articleUrl) : '';

            // direct equality (covers numeric ids stored as strings)
            if (aId === param) return true;

            // if aId is a path like '/articles/slug', compare its last segment
            const aIdLast = aId.split('/').filter(Boolean).pop() || '';
            if (aIdLast === param) return true;

            // also check the articleUrl field's last segment
            const urlLast = aArticleUrl.split('/').filter(Boolean).pop() || '';
            if (urlLast === param) return true;

            return false;
          });
        if (!found) {
          setError('Article introuvable');
          setArticle(null);
        } else {
          setArticle(found as Article);
          setError(null);
        }
      })
      .catch((err) => {
        console.error('Error fetching article:', err);
        setError('Erreur lors du chargement de l\'article');
        setArticle(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Chargement de l'article...</div>;
  if (error) return <div>{error}</div>;
  if (!article) return <div>Article introuvable</div>;

  return (
    <>
      <div className="padding image-title-container">
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.imageAlt || ''}
            className="article-image-centered"
          />
        )}
      </div>
      <div className="article-content">
        <h1>{article.title}</h1>
        <div className="metadata">
          <strong>Author:</strong> {article.author}
          <br />
          <strong>Date:</strong> {article.date}
          <br />
          {article.description}
        </div>
        <div dangerouslySetInnerHTML={{ __html: article.content || '' }} />
      </div>
    </>
  );
};

export default ArticlePage;