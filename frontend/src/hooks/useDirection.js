import { useContext } from 'react';
import { DirectionContext } from '../contexts/DirectionContext';


export const useDirection = () => {
    const context = useContext(DirectionContext);
  
    if (!context) {
      throw new Error('useDirection must be used within a DirectionProvider');
    }
  
    return context;
};