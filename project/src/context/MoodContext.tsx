import React, { createContext, useState, useContext, useEffect } from 'react';
import { Mood, MoodEntry, MoodContextType } from '../types';
import { generateMockEntries } from '../utils/moodData';

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const useMood = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMood, setCurrentMood] = useState<Mood | null>(null);
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    // Load entries from localStorage or use mock data for demo
    const savedEntries = localStorage.getItem('moodEntries');
    if (savedEntries) {
      setMoodEntries(JSON.parse(savedEntries));
    } else {
      // Generate mock data for demonstration
      const mockEntries = generateMockEntries(30).map(entry => JSON.parse(entry));
      setMoodEntries(mockEntries);
      localStorage.setItem('moodEntries', JSON.stringify(mockEntries));
    }
  }, []);

  useEffect(() => {
    // Save entries to localStorage whenever they change
    if (moodEntries.length > 0) {
      localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
    }
  }, [moodEntries]);

  const addMoodEntry = (mood: Mood, note: string = '') => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      date: new Date().toISOString().split('T')[0],
      note
    };

    setMoodEntries(prev => {
      // Check if we already have an entry for today
      const todayEntry = prev.find(entry => entry.date === newEntry.date);
      
      if (todayEntry) {
        // Update today's entry
        return prev.map(entry => 
          entry.date === newEntry.date ? { ...entry, mood, note } : entry
        );
      } else {
        // Add new entry
        return [newEntry, ...prev];
      }
    });
  };

  const startDetecting = () => {
    setIsDetecting(true);
    
    // Simulate mood detection
    setTimeout(() => {
      const moods: Mood[] = ['happy', 'sad', 'angry', 'tired', 'love', 'confused'];
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      setCurrentMood(randomMood);
      setIsDetecting(false);
    }, 2000);
  };

  const stopDetecting = () => {
    setIsDetecting(false);
  };

  const value = {
    currentMood,
    moodEntries,
    isDetecting,
    setCurrentMood,
    addMoodEntry,
    startDetecting,
    stopDetecting
  };

  return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
};