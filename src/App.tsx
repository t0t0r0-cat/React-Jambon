import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar component (ensure it accepts props or is static)
import ArticleCard from './components/ArticleCard'; // Import ArticleCard component
import SearchBar from './components/SearchBar'; // Import SearchBar component
import GoogleSucks from './articles/GoogleSucks'; // Import GoogleSucks article
import PagesResources from './articles/PagesResources'; // Import PagesResources article
import './App.css'; // Import global styles

const App: React.FC = () => {
  const [articles] = useState([
    {
      title: 'Google Sucks',
      description: 'Don’t click here, it’s going to steal your data',
      imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.pmvwb_-_CO2vH-pU7ZMHkQHaEo&pid=Api',
      articleUrl: './src/articles/google-sucks', // Matches the route for GoogleSucks
    },
    {
      title: 'Resources',
      description: 'Find helpful resources and organizations here.',
      imageUrl: 'https://via.placeholder.com/400x200?text=Resources',
      articleUrl: '/resources', // Matches the route for PagesResources
    },
  ]);

  const [filteredArticles, setFilteredArticles] = useState(articles);

  const handleSearch = (query: string) => {
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  return (
    <Router>
      <Navbar onSearch={handleSearch} />
      <div className="app">
        <Routes>
          {/* Home route */}
          <Route
            path="/"
            element={
              <div>
                <br></br>
                <br></br>
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
            }
          />

          {/* Route for GoogleSucks article */}
          <Route path="/google-sucks" element={<GoogleSucks />} />

          {/* Route for PagesResources article */}
          <Route path="/resources" element={<PagesResources />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
