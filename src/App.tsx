import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArticleCard from './components/ArticleCard';
import SortDropdown from './components/SortDropdown';
import PagesResources from './articles/PagesResources';
import AboutUs from './articles/AboutUs';
import ArticlePage from './articles/ArticlePage';
import ContactUs from './articles/ContactUs';
import EspaceJambon from './articles/EspaceJambon';
import BottomBar from './components/bottomBar.tsx';
import StaticArticleList from './components/StaticArticleList';
import './styles/App.css';
import './styles/SortDropdown.css';
import SearchBar from './components/SearchBar';
import { loadAllArticles } from './articles/loadArticles.ts';

const App: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');

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
    setFilteredArticles(sortArticles(filtered, sortBy));
  };

  const sortArticles = (articlesToSort: any[], sort: string) => {
    return [...articlesToSort].sort((a, b) => {
      switch (sort) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  };

  const handleSort = (newSortBy: 'newest' | 'oldest' | 'alphabetical') => {
    setSortBy(newSortBy);
    setFilteredArticles(sortArticles(filteredArticles, newSortBy));
  };

  const HomePage: React.FC = () => (
    <div>
      <br /><br />
      <img src="./public/Jambon/jambonmainpagelogo.png" alt="Logo" className="logo" width="25%" style={{ display: 'block', margin: '0 auto' }} />
      <StaticArticleList />
      <h1>Eco de l'île</h1>
      <h2>La maison de jambon</h2>
      <p>
        L'Éco de l'Île est le journal étudiant de l'école secondaire de l'Île, créé par
        des élèves pour les élèves. Bonne lecture :)
      </p>
      <h2>Articles</h2>
      <div id='controls'>
        <div className="search-sort-container">
        <SearchBar onSearch={handleSearch} />
        <SortDropdown onSortChange={handleSort} />
      </div>
      </div>
      <div className="article-list">
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            description={article.description}
            imageUrl={article.imageUrl}
            link={article.articleUrl}
            imageAlt={article.imageAlt}
            date={article.date}
            author={article.author}
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
          <Route path="/articles/:id" element={<ArticlePage articles={articles} />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/espace-jambon" element={<EspaceJambon />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
