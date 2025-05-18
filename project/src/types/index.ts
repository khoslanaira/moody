export type Mood = 'happy' | 'sad' | 'angry' | 'tired' | 'love' | 'confused';

export interface MoodEntry {
  id: string;
  mood: Mood;
  date: string;
  note?: string;
}

export interface MoodResponse {
  title: string;
  message: string;
  action?: string;
}

export interface MoodData {
  color: string;
  lightColor: string;
  darkColor: string;
  icon: string;
  emoji: string;
  response: MoodResponse;
}

export interface MoodContextType {
  currentMood: Mood | null;
  moodEntries: MoodEntry[];
  isDetecting: boolean;
  setCurrentMood: (mood: Mood | null) => void;
  addMoodEntry: (mood: Mood, note?: string) => void;
  startDetecting: () => void;
  stopDetecting: () => void;
}