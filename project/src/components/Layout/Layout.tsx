import React from 'react';
import { useMood } from '../../context/MoodContext';
import { getMoodData } from '../../utils/moodData';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentMood } = useMood();
  
  const getBackgroundStyle = () => {
    if (!currentMood) {
      return {
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%)'
      };
    }
    
    const { color, lightColor } = getMoodData(currentMood);
    
    return {
      background: `linear-gradient(135deg, ${lightColor} 0%, ${color} 100%)`
    };
  };
  
  return (
    <div 
      className="min-h-screen p-4 transition-all duration-700"
      style={getBackgroundStyle()}
    >
      <div className="max-w-md mx-auto">
        <header className="py-4 mb-6">
          <h1 className="text-2xl font-bold text-center">
            Mood Canvas 🎨
            <span className="text-sm font-normal block">Your Emotion Palette 🌈</span>
          </h1>
        </header>
        
        <main>
          {children}
        </main>
        
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 Mood Canvas - Crafted with 💖 by Naira Khosla</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;