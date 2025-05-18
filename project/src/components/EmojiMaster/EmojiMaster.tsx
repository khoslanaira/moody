import React, { useState, useEffect } from 'react';
import { Smile } from 'lucide-react';
import { useMood } from '../../context/MoodContext';
import { getMoodData, getRandomJoke, getRandomAdvice } from '../../utils/moodData';
import EmojiResponse from './EmojiResponse';

const EmojiMaster: React.FC = () => {
  const { currentMood, isDetecting } = useMood();
  const [showResponse, setShowResponse] = useState(false);
  const [extraContent, setExtraContent] = useState<string>('');

  useEffect(() => {
    if (currentMood) {
      setShowResponse(true);
      
      // Generate additional content based on mood
      if (currentMood === 'sad') {
        setExtraContent(getRandomJoke());
      } else if (currentMood === 'angry') {
        setExtraContent(getRandomAdvice());
      } else {
        setExtraContent('');
      }
    } else {
      setShowResponse(false);
      setExtraContent('');
    }
  }, [currentMood]);

  return (
    <div className="emoji-master flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-6">
        <div 
          className={`emoji-face w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-all duration-500 floating-emoji ${
            currentMood 
              ? `bg-${getMoodData(currentMood).lightColor} mood-${currentMood}` 
              : 'bg-yellow-100'
          }`}
        >
          {currentMood ? (
            <span className={`text-4xl sm:text-5xl wave-animation`}>
              {getMoodData(currentMood).emoji}
            </span>
          ) : (
            <Smile 
              size={64} 
              className={`text-yellow-500 ${isDetecting ? 'mood-button-pulse' : ''}`} 
            />
          )}
          
          {isDetecting && (
            <div className="absolute inset-0 rounded-full border-4 border-transparent animate-[spin_1.5s_linear_infinite] before:content-[''] before:absolute before:w-16 before:h-16 before:rounded-full before:border-t-4 before:border-blue-500 mood-sparkle"></div>
          )}
        </div>
      </div>
      
      <h2 className={`text-2xl font-bold mb-2 slide-in ${currentMood ? `mood-${currentMood}` : ''}`}>
        {isDetecting ? (
          'Scanning your mood...'
        ) : showResponse ? (
          `${getMoodData(currentMood!).response.title}`
        ) : (
          'Hey human! What\'s your mood today?'
        )}
      </h2>
      
      {showResponse && <EmojiResponse mood={currentMood!} extraContent={extraContent} />}
    </div>
  );
};

export default EmojiMaster;