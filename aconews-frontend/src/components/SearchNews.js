

import React, { useState } from 'react';

const SearchNews = () => {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://aco-news-black.vercel.app/api/search?q=${query}`);
      const data = await response.json();
      setArticles(data.articles);
    } catch (err) {
      setError('Failed to search news');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl mb-4">Search News</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search news..."
        className="border p-2 rounded-md"
      />
      <button onClick={searchNews} className="bg-blue-500 text-white p-2 ml-2">Search</button>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {articles.map((article, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <h3 className="text-xl font-bold">{article.title}</h3>
              {article.image && <img src={article.image} alt={article.title} className="mt-2"/>}
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">Read more</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchNews;
