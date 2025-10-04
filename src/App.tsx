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
import BottomBar from './components/BottomBar';
import './styles/App.css';
import './styles/SortDropdown.css';
import SearchBar from './components/SearchBar';

const App: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');
  const [searchQuery, setSearchQuery] = useState('');

useEffect(() => {
  fetch('http://localhost:8000/get_json_data.php') // Replace with your PHP endpoint
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const articles = data.map((item: any) => ({
        id: item.id, // Use the article's ID from the PHP response
        title: item.title,
        description: item.description,
        content: item.content,
        imageUrl: item.imageUrl,
        imageAlt: item.imageAlt,
        date: item.date,
        author: item.author,
        articleUrl: item.articleUrl,
      }));

      setArticles(articles);
      setFilteredArticles(articles); // Update filtered articles too
    })
    .catch((error) => {
      console.error('Error fetching articles:', error);
      setFilteredArticles([]); // Fallback to an empty array on error
    });
}, []);


  // Handle the search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Perform filtering and sorting based on search query and sort option
  useEffect(() => {
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArticles(sortArticles(filtered, sortBy));
  }, [searchQuery, articles, sortBy]);

  // Sort articles based on the selected sort option
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

  // Handle sorting selection
  const handleSort = (newSortBy: 'newest' | 'oldest' | 'alphabetical') => {
    setSortBy(newSortBy);
    setFilteredArticles(sortArticles(filteredArticles, newSortBy));
  };

  // HomePage component rendering the articles
  const HomePage: React.FC = () => (
    <div>
      <br />
      <br />
      <img src="images/Jambon/jambonmainpagelogo.png" alt="Logo" className="logo" width="25%" style={{ display: 'block', margin: '0 auto' }}/>
      <h1>Eco de l'île</h1>
      <h2>La maison de jambon</h2>
      <p>
        L'Éco de l'Île est le journal étudiant de l'école secondaire de l'Île, créé par
        des élèves pour les élèves. Bonne lecture :)
      </p>
      <h2>Articles</h2>
      <div id="controls">
        <div className="search-sort-container">
          <SearchBar onSearch={handleSearch} />
          <SortDropdown onSortChange={handleSort} />
        </div>
      </div>
      <div className="article-list">
  {filteredArticles.length > 0 ? (
    filteredArticles.map((article) => (
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
    ))
  ) : (
    <p>No articles found or error fetching articles.</p>
  )}
</div>
      <BottomBar />
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
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/espace-jambon" element={<EspaceJambon />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
