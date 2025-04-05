import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar component
import ArticleCard from './components/ArticleCard'; // Import ArticleCard component
import SearchBar from './components/SearchBar'; // Import SearchBar component
import HomePage from './HomePage'; // Import HomePage component
import NewPage from './articles/GoogleSucks'; // Import NewPage component
import './App.css'; // Import global styles

const App: React.FC = () => {
  const [articles] = useState([
    {
      title: 'Article 1',
      description: 'Description of article 1',
      imageUrl: 'https://via.placeholder.com/400x200?text=Article+1',
      articleUrl: './src/articles/Googlesucks.tsx'
    },
    {
      title: 'Article 2',
      description: 'Description of article 2',
      imageUrl: 'https://via.placeholder.com/400x200?text=Article+2',
    },
    {
      title: 'Google sucks',
      description: 'Dont click here its going to steal your data',
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

  const handleSearch = (query: string) => {
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  return (
    <Router>
      {/* Navbar will be rendered on all pages */}
      <Navbar />

      {/* Content for each page */}
      <div className="app">
        <Routes>
          {/* Home route */}
          <Route path="/" element={
            <div>
              <br></br>
              <br></br>
              <br></br>
              <h1>Journal Etudiant</h1>
              <h2>La maison de jambon</h2>
              <br></br>
              <p>L'Éco de l'Île est le journal étudiant de l'école secondaire de l'Île, créé par des élèves pour les élèves. Bonne lecture :)</p>
              <br></br>
              <br></br>
              <br></br>

              {/* Search bar component */}
              <SearchBar onSearch={handleSearch} />

              {/* Article list */}
              <div className="article-list">
                {filteredArticles.map((article, index) => (
                  <><ArticleCard
                    key={index}
                    title={article.title}
                    description={article.description}
                    imageUrl={article.imageUrl}
                    articleUrl={article.articleUrl || ''} /></>
                ))}
              </div>
              <br></br>
            </div>
            
          } />

          {/* Route for NewPage */}
          <Route path="/newpage/:id" element={<NewPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
