import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArticleCard from './components/ArticleCard';
import SearchBar from './components/SearchBar';
import GoogleSucks from './articles/GoogleSucks';
import PagesResources from './articles/PagesResources';
import AboutUs from './articles/AboutUs'; // Import the About Us page
import './App.css';

const App: React.FC = () => {
  const [articles] = useState([
    {
      title: 'Google Sucks',
      description: 'Don’t click here, it’s going to steal your data',
      imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.pmvwb_-_CO2vH-pU7ZMHkQHaEo&pid=Api',
      articleUrl: '/google-sucks',
    },
    {
      title: 'Resources',
      description: 'Find helpful resources and organizations here.',
      imageUrl: 'https://via.placeholder.com/400x200?text=Resources',
      articleUrl: '/resources',
    },
  ]);

  const [filteredArticles, setFilteredArticles] = useState(articles);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const HomePage: React.FC = () => {
    const query = useQuery().get('search');

    useEffect(() => {
      if (query) {
        handleSearch(query);
      }
    }, [query]);

    const handleSearch = (query: string) => {
      const filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredArticles(filtered);
    };

    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>Eco de l'île</h1>
        <h2>La maison de jambon</h2>
        <p>
          L'Éco de l'Île est le journal étudiant de l'école secondaire de l'Île, créé par
          des élèves pour les élèves. Bonne lecture :)
        </p>
        <SearchBar onSearch={handleSearch} />
        <div className="article-list">
          {filteredArticles.map((article, index) => (
            <ArticleCard
              key={index}
              title={article.title}
              description={article.description}
              imageUrl={article.imageUrl}
              articleUrl={article.articleUrl}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Navbar />
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/google-sucks" element={<GoogleSucks />} />
          <Route path="/resources" element={<PagesResources />} />
          <Route path="/about-us" element={<AboutUs />} /> {/* Add About Us route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
