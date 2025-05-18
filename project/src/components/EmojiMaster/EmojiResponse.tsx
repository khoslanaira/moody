import React from 'react';
import { getMoodData } from '../../utils/moodData';
import { Mood } from '../../types';

interface EmojiResponseProps {
  mood: Mood;
  extraContent?: string;
}

const EmojiResponse: React.FC<EmojiResponseProps> = ({ mood, extraContent }) => {
  const moodData = getMoodData(mood);
  
  return (
    <div className="emoji-response max-w-md mx-auto animate-fadeIn">
      <p className="text-lg mb-4">{moodData.response.message}</p>
      
      {extraContent && (
        <div className="extra-content p-4 rounded-lg bg-white/80 mb-4 shadow-sm">
          <p className="italic">{extraContent}</p>
        </div>
      )}
      
      <p className="text-lg font-medium" style={{ color: moodData.darkColor }}>{moodData.response.action}</p>
      
      <div className="mt-6 flex justify-center">
        <button 
          className="px-6 py-2 rounded-full font-medium text-white transition-all duration-300 transform hover:scale-105"
          style={{ backgroundColor: moodData.color }}
        >
          Save This Mood
        </button>
      </div>
    </div>
  );
};

export default EmojiResponse;