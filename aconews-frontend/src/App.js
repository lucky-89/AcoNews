import React from 'react';
import TopHeadlines from './components/TopHeadlines';
import SearchNews from './components/SearchNews';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto p-5">
        <h1 className="text-center text-4xl mb-6">ACONEWS: Stay Informed!</h1>
   
        <SearchNews />
        <TopHeadlines />
      </main>
      <Footer />

     
    </div>
  );
};

export default App;
