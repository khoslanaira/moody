import React from 'react';
import { Smile, Frown, Angry, Bed, Heart, HelpCircle, Fingerprint } from 'lucide-react';
import { useMood } from '../../context/MoodContext';
import { Mood } from '../../types';
import { getMoodData } from '../../utils/moodData';

const MoodSelector: React.FC = () => {
  const { setCurrentMood, startDetecting, isDetecting } = useMood();
  
  const handleMoodSelect = (mood: Mood) => {
    setCurrentMood(mood);
  };
  
  const moodOptions: { mood: Mood; icon: React.ReactNode }[] = [
    { mood: 'happy', icon: <Smile className="w-6 h-6" /> },
    { mood: 'sad', icon: <Frown className="w-6 h-6" /> },
    { mood: 'angry', icon: <Angry className="w-6 h-6" /> },
    { mood: 'tired', icon: <Bed className="w-6 h-6" /> },
    { mood: 'love', icon: <Heart className="w-6 h-6" /> },
    { mood: 'confused', icon: <HelpCircle className="w-6 h-6" /> },
  ];
  
  return (
    <div className="mood-selector animate-fadeIn">
      <div className="grid grid-cols-3 gap-3 mb-6">
        {moodOptions.map(({ mood, icon }) => (
          <button
            key={mood}
            className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 flex flex-col items-center mood-transition ${
              isDetecting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            style={{ 
              backgroundColor: getMoodData(mood).lightColor,
              color: getMoodData(mood).darkColor
            }}
            onClick={() => handleMoodSelect(mood)}
            disabled={isDetecting}
          >
            <div className={`mb-2 wave-animation`}>{icon}</div>
            <span className="text-sm capitalize">{mood}</span>
          </button>
        ))}
      </div>
      
      <div className="or-divider flex items-center justify-center mb-6">
        <div className="h-px bg-gray-300 flex-1"></div>
        <span className="px-4 text-gray-500 text-sm">OR</span>
        <div className="h-px bg-gray-300 flex-1"></div>
      </div>
      
      <button
        className={`w-full py-6 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center transition-all duration-300 mood-transition ${
          isDetecting ? 'bg-blue-50 mood-button-pulse' : 'hover:bg-gray-50'
        }`}
        onClick={startDetecting}
        disabled={isDetecting}
      >
        <Fingerprint className={`w-10 h-10 mb-2 ${isDetecting ? 'text-blue-500 mood-sparkle' : 'text-gray-500'}`} />
        <span className="text-sm font-medium">
          {isDetecting ? 'Detecting your mood...' : 'Press & hold to detect mood'}
        </span>
      </button>
    </div>
  );
};

export default MoodSelector;