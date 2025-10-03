import '../styles/ArticlePage.css';
import '../styles/App.css';



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