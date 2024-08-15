"use client";

import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { languageOptions } from './utils/constants';

const Page = () => {
  const [sourceLanguage, setSourceLanguage] = useState('en-IN');
  const [targetLanguage, setTargetLanguage] = useState('hi-IN');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

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

  const handleTranslate = async () => {
    if (!sourceLanguage || !targetLanguage) {
      console.log('Please select both source and target languages');
      return;
    }

    try {
      const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'api-subscription-key': '33e7397e-17e5-4ac3-b4dd-bed6fa6a90d1'},
        body: JSON.stringify({
          inputs: [inputText],
          source_language_code: sourceLanguage,
          target_language_code: targetLanguage,
          mode: "formal",
          model: "mayura:v1",
          enable_preprocessing: true
        })
      };

      const response = await fetch('https://api.sarvam.ai/translate', options);

      if (!response.ok) {
        throw new Error('Translation request failed');
      }

      const data = await response.json();
      console.log('Translation result:', data);
      if (data.translations && data.translations.length > 0) {
        setTranslatedText(data.translations[0]);
      }
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('An error occurred during translation.');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <main className="flex-grow container mx-auto p-4 flex flex-col">
        <div className="flex flex-col sm:flex-row gap-4 flex-grow">
          <div className="w-full sm:w-1/2 flex flex-col gap-2">
            <select 
              className="w-full p-2 border border-gray-300 rounded"
              value={sourceLanguage}
              onChange={(e) => handleSourceLanguageChange(e.target.value)}
            >
              <option value="">Select language</option>
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value} disabled={option.value === targetLanguage}>
                  {option.label}
                </option>
              ))}
            </select>
            <textarea 
              className="w-full p-2 border border-gray-300 rounded flex-grow"
              placeholder="Enter text here"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>
          </div>
          <div className="w-full sm:w-1/2 flex flex-col gap-2">
            <select 
              className="w-full p-2 border border-gray-300 rounded"
              value={targetLanguage}
              onChange={(e) => handleTargetLanguageChange(e.target.value)}
            >
              <option value="">Select language</option>
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value} disabled={option.value === sourceLanguage}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="w-full p-2 border border-gray-300 rounded flex-grow bg-white">
              <p className="text-gray-700">
                {translatedText}
              </p>
            </div>
          </div>
        </div>
        <button 
          className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded transition-colors ${
            sourceLanguage && targetLanguage ? 'hover:bg-blue-600' : 'opacity-50 cursor-not-allowed'
          }`}
          onClick={handleTranslate}
          disabled={!sourceLanguage || !targetLanguage}
        >
          Translate
        </button>
      </main>
      
      <Footer />
    </div>
  );
};

export default Page;