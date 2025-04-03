// src/App.tsx
import React, { useState } from 'react';
import ArticleCard from './components/ArticleCard';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewPage from './articles/GoogleSucks';

const App: React.FC = () => {
  const [articles] = useState([
    {
      title: 'Article 1',
      description: 'Description of article 1',
      imageUrl: 'https://via.placeholder.com/400x200?text=Article+1',
    },
    {
      title: 'Article 2',
      description: 'Description of article 2',
      imageUrl: 'https://via.placeholder.com/400x200?text=Article+2',
    },
    {
      title: 'Article 3',
      description: 'Description of article 3',
      imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.pmvwb_-_CO2vH-pU7ZMHkQHaEo&pid=Api',
      articleUrl: 'https://www.google.com',
    },
    {
      title: 'Test 99',
      description: 'testing 12 12',
      imageUrl: 'google.com',
    },
  ]);

  const [filteredArticles, setFilteredArticles] = useState(articles);

  // Search handler to filter articles based on query
  const handleSearch = (query: string) => {
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  return (
    <Router>
      <div className="app">
        <h1>Journal Etudiant</h1>
        <h2>La maison de jambon</h2>


        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />
        
        {/* Article List */}
        <div className="article-list">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                description={article.description}
                imageUrl={article.imageUrl}
                articleUrl={article.articleUrl || ''}
              />
            ))
          ) : (
            <p>No articles found</p>
          )}
        </div>

        {/* Routing */}
        <Routes>
          <Route path="/newpage/:id" element={<NewPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
