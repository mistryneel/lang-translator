"use client";

import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TranslationArea from './components/TranslationArea';

const Page = () => {
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');

  const handleSourceLanguageChange = (newValue: string) => {
    setSourceLanguage(newValue);
    if (newValue === targetLanguage) {
      setTargetLanguage('');
    }
  };

  const handleTargetLanguageChange = (newValue: string) => {
    setTargetLanguage(newValue);
    if (newValue === sourceLanguage) {
      setSourceLanguage('');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto p-4 flex flex-col">
        <div className="flex flex-col sm:flex-row gap-4 flex-grow">
          <TranslationArea 
            language={sourceLanguage}
            onLanguageChange={handleSourceLanguageChange}
            otherLanguage={targetLanguage}
            isSource={true}
          />
          <TranslationArea 
            language={targetLanguage}
            onLanguageChange={handleTargetLanguageChange}
            otherLanguage={sourceLanguage}
            isSource={false}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Page;