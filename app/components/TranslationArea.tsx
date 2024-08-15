import LanguageSelector from './LanguageSelector';

const TranslationArea = ({ language, onLanguageChange, otherLanguage, isSource }) => (
  <div className="w-full sm:w-1/2 flex flex-col gap-2">
    <LanguageSelector 
      value={language}
      onChange={onLanguageChange}
      disabledValue={otherLanguage}
    />
    {isSource ? (
      <textarea 
        className="w-full p-2 border border-gray-300 rounded flex-grow"
        placeholder="Enter text here"
      ></textarea>
    ) : (
      <div className="w-full p-2 border border-gray-300 rounded flex-grow bg-white">
        <p className="text-gray-700">
          
        </p>
      </div>
    )}
  </div>
);

export default TranslationArea;
