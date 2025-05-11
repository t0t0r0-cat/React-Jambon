import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArticleCard from './components/ArticleCard';
import PagesResources from './articles/PagesResources';
import AboutUs from './articles/AboutUs';
import ArticlePage from './articles/ArticlePage';
import ContactUs from './articles/ContactUs';
import EspaceJambon from './articles/EspaceJambon';
import BottomBar from './components/bottomBar.tsx';
import './styles/App.css';
import SearchBar from './components/SearchBar';
import { loadAllArticles } from './articles/loadArticles.ts';

const App: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);

  useEffect(() => {
    loadAllArticles().then((loaded) => {
      setArticles(loaded);
      setFilteredArticles(loaded);
    });
  }, []);

  const handleSearch = (query: string) => {
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  const HomePage: React.FC = () => (
    <div>
      <br /><br />
      <img src="public/Jambon/JambonLogo.png" alt="Logo" className="logo" width="25%" style={{ display: 'block', margin: '0 auto' }} />
      <h1>Eco de l'île</h1>
      <h2>La maison de jambon</h2>
      <p>
        L'Éco de l'Île est le journal étudiant de l'école secondaire de l'Île, créé par
        des élèves pour les élèves. Bonne lecture :)
      </p>
      
      <SearchBar onSearch={handleSearch} />
      <div className="article-list">
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            description={article.description}
            imageUrl={article.imageUrl}
            articleUrl={article.articleUrl}
            imageAlt={article.imageAlt}
          />
        ))}
      </div>
      <nav>
        <BottomBar />
      </nav>
    </div>
  );

  return (
    <Router>
      <Navbar onSearch={handleSearch} />
      <div style={{ paddingTop: '70px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resources" element={<PagesResources />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/article/:id" element={<ArticlePage articles={articles} />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/espace-jambon" element={<EspaceJambon />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
