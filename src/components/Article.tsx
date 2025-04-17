import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import './../styles/ArticlePage.css';

interface ArticleProps {
  title: string;
  content: string;
  imageUrl: string;
  imageAlt: string;
  author: string;
  date: string;
}

const Article: React.FC<ArticleProps> = ({ title, content, imageUrl, imageAlt, author, date }) => {
  return (
    <div className="article">
      <h1>{title}</h1>
      <p><strong>By:</strong> {author}</p>
      <p><strong>Date:</strong> {date}</p>
      <img src={imageUrl} alt={imageAlt} />
      {/* Render the content using ReactMarkdown */}
      <ReactMarkdown rehypePlugins={[rehypeSanitize]}>{content}</ReactMarkdown>
    </div>
  );
};

export default Article;