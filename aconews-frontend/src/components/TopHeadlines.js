

import React, { useState, useEffect } from 'react';

const TopHeadlines = () => {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('general');
  const [lang, setLang] = useState('en');
  const [country, setCountry] = useState('in'); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  
  const countries = [
    { name: 'Australia', code: 'au' },
    { name: 'Brazil', code: 'br' },
    { name: 'Canada', code: 'ca' },
    { name: 'China', code: 'cn' },
    { name: 'Egypt', code: 'eg' },
    { name: 'France', code: 'fr' },
    { name: 'Germany', code: 'de' },
    { name: 'Greece', code: 'gr' },
    { name: 'Hong Kong', code: 'hk' },
    { name: 'India', code: 'in' },
    { name: 'Ireland', code: 'ie' },
    { name: 'Israel', code: 'il' },
    { name: 'Italy', code: 'it' },
    { name: 'Japan', code: 'jp' },
    { name: 'Netherlands', code: 'nl' },
    { name: 'Norway', code: 'no' },
    { name: 'Pakistan', code: 'pk' },
    { name: 'Peru', code: 'pe' },
    { name: 'Philippines', code: 'ph' },
    { name: 'Portugal', code: 'pt' },
    { name: 'Romania', code: 'ro' },
    { name: 'Russian Federation', code: 'ru' },
    { name: 'Singapore', code: 'sg' },
    { name: 'Spain', code: 'es' },
    { name: 'Sweden', code: 'se' },
    { name: 'Switzerland', code: 'ch' },
    { name: 'Taiwan', code: 'tw' },
    { name: 'Ukraine', code: 'ua' },
    { name: 'United Kingdom', code: 'gb' },
    { name: 'United States', code: 'us' },
  ];

  
  const fetchTopHeadlines = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`aco-news-black.vercel.app/top-headlines?category=${category}&lang=${lang}&country=${country}`);
      const data = await response.json();
      console.log('API Response:', data); 
  
      if (data.articles) {
        setArticles(data.articles);
      } else {
        throw new Error('No articles found');
      }
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      console.error('Error fetching top headlines:', err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchTopHeadlines();
  }, [category, lang, country]);

  return (
    <div className="p-5">
      
      <label>Category: </label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="general">General</option>
        <option value="world">World</option>
        <option value="nation">Nation</option>
        <option value="business">Business</option>
        <option value="technology">Technology</option>
        <option value="entertainment">Entertainment</option>
        <option value="sports">Sports</option>
        <option value="science">Science</option>
        <option value="health">Health</option>
      </select>

      
      <label>Language: </label>
<select value={lang} onChange={(e) => setLang(e.target.value)}>
  <option value="ar">Arabic</option>
  <option value="zh">Chinese</option>
  <option value="nl">Dutch</option>
  <option value="en">English</option>
  <option value="fr">French</option>
  <option value="de">German</option>
  <option value="el">Greek</option>
  <option value="he">Hebrew</option>
  <option value="hi">Hindi</option>
  <option value="it">Italian</option>
  <option value="ja">Japanese</option>
  <option value="ml">Malayalam</option>
  <option value="mr">Marathi</option>
  <option value="no">Norwegian</option>
  <option value="pt">Portuguese</option>
  <option value="ro">Romanian</option>
  <option value="ru">Russian</option>
  <option value="es">Spanish</option>
  <option value="sv">Swedish</option>
  <option value="ta">Tamil</option>
  <option value="te">Telugu</option>
  <option value="uk">Ukrainian</option>
</select>

      
      <label>Country: </label>
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        {countries.map((countryOption) => (
          <option key={countryOption.code} value={countryOption.code}>
            {countryOption.name}
          </option>
        ))}
      </select>

     
      <button onClick={fetchTopHeadlines} className="bg-blue-500 text-white p-2 mt-2">
        Fetch Headlines
      </button>

     
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <h2 className="text-xl font-bold">{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                Read more
              </a>
              {article.image && <img src={article.image} alt={article.title} className="mt-2"/>}
              <p className="text-sm text-gray-600">Published At: {new Date(article.publishedAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <div>No headlines found</div>
        )}
      </div>
    </div>
  );
};

export default TopHeadlines;
