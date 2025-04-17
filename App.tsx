import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Correct import for Navbar
import ArticleCard from './components/ArticleCard'; // Correct import for ArticleCard
import PagesResources from './articles/PagesResources'; // Correct import for PagesResources
import AboutUs from './articles/AboutUs'; // Correct import for AboutUs
import ArticlePage from './articles/ArticlePage'; // Correct import for ArticlePage
import ContactUs from './articles/ContactUs'; // Import the Contact Us page
import EspaceJambon from './articles/EspaceJambon'; // Import the Espace Jambon page
import './App.css'; // Correct import for App.css
import SearchBar from './components/SearchBar'; // Correct import for SearchBar
import articlesData from './articles/articlesData'; // Import the external articles file

const App: React.FC = () => {
  const [filteredArticles, setFilteredArticles] = useState(articlesData);

  const handleSearch = (query: string) => {
    const filtered = articlesData.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  const HomePage: React.FC = () => {
    return (
      <div>
        <br></br>
        <br></br>
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
        <div className="article-grid">
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
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resources" element={<PagesResources />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} /> {/* Add Contact Us route */}
        <Route path="/espace-jambon" element={<EspaceJambon />} /> {/* Add Espace Jambon route */}
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
    </Router>
  );
};

export default App;
