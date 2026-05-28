import { useState, createContext } from 'react';
import arab from '../assets/languages/arab.json';
import english from '../assets/languages/english.json';


export const DirectionContext = createContext();

export const DirectionProvider = ({ children }) => {
  const [direction, setDirection] = useState('ltr');
  const [language, setLanguage] = useState('english');

  // Function to toggle between 'ltr' and 'rtl' and update the language accordingly
  const toggleDirection = () => {
    setDirection((prev) => {
      const newDirection = prev === 'ltr' ? 'rtl' : 'ltr';
      setLanguage(newDirection === 'ltr' ? 'english' : 'arab');
      return newDirection;
    });
  };

  // Select active language data based on the current state
  const languageData = language === 'english' ? english : arab;

  return (
    <DirectionContext.Provider
      value={{
        direction,
        toggleDirection,
        language,
        languageData,
      }}
    >
      {children}
    </DirectionContext.Provider>
  );
};
