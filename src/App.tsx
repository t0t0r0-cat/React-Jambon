import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PagesResources from './articles/PagesResources';
import AboutUs from './articles/AboutUs';
import ArticlePage from './articles/ArticlePage';
import ContactUs from './articles/ContactUs';
import EspaceJambon from './articles/EspaceJambon';
import GoogleSucks from './articles/GoogleSucks';
import ArticleCard from './components/ArticleCard';
import articlesData from './articles/articlesData';
import './App.css';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    setSearchQuery(query); // Update the search query state
  };

  const filteredArticles = articlesData.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="homepage">
              <h1>Eco de l'île</h1>
              <h2>La maison de jambon</h2>
              <p>
                L'Éco de l'Île est le journal étudiant de l'école secondaire de l'Île, créé par
                des élèves pour les élèves. Bonne lecture :)
              </p>
              <div className="article-grid">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    description={article.description}
                    imageUrl={article.imageUrl}
                    articleUrl={`/article/${article.id}`}
                  />
                ))}
              </div>
            </div>
          }
        />
        <Route path="/resources" element={<PagesResources />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/espace-jambon" element={<EspaceJambon />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/google-sucks/:id?" element={<GoogleSucks />} />
      </Routes>
    </>
  );
};

export default App;