import { Mood, MoodData } from '../types';

export const moodColors: Record<Mood, MoodData> = {
  happy: {
    color: '#FFDE03',
    lightColor: '#FFF5B8',
    darkColor: '#E0C000',
    icon: 'smile',
    emoji: '😊',
    response: {
      title: 'Awesome!',
      message: 'Your happiness is contagious! Keep that amazing energy going.',
      action: 'Want to see a fun dance GIF to match your mood?'
    }
  },
  sad: {
    color: '#0390FF',
    lightColor: '#C8E5FF',
    darkColor: '#0268B5',
    icon: 'frown',
    emoji: '😢',
    response: {
      title: 'Aww, sending hugs!',
      message: 'It\'s okay to feel down sometimes. Remember that all emotions are temporary.',
      action: 'Here\'s a virtual hug and a smile to brighten your day! 🤗'
    }
  },
  angry: {
    color: '#FF4242',
    lightColor: '#FFCECE',
    darkColor: '#C30000',
    icon: 'angry',
    emoji: '😡',
    response: {
      title: 'Let\'s cool down',
      message: 'Take a deep breath with me. Anger is just energy that needs direction.',
      action: 'Breathe in 😤... and out 🧘‍♀️... Feel a bit better?'
    }
  },
  tired: {
    color: '#9B7EDE',
    lightColor: '#E2D9FF',
    darkColor: '#6A4CB0',
    icon: 'bed',
    emoji: '😴',
    response: {
      title: 'Rest is important!',
      message: 'Your body and mind deserve some downtime. Be kind to yourself.',
      action: 'Nap time or meme time? You pick!'
    }
  },
  love: {
    color: '#FF67B3',
    lightColor: '#FFD9EC',
    darkColor: '#C83484',
    icon: 'heart',
    emoji: '😍',
    response: {
      title: 'Love is in the air!',
      message: 'What a wonderful feeling to experience. Treasure this moment!',
      action: 'Aww... tell me more about what\'s making you feel this way! 😚'
    }
  },
  confused: {
    color: '#00C9A7',
    lightColor: '#C6FFF5',
    darkColor: '#00856F',
    icon: 'help-circle',
    emoji: '🤔',
    response: {
      title: 'Hmm, let\'s figure this out',
      message: 'Confusion is the first step toward clarity. Your brain is working on solutions!',
      action: 'Would a decision wheel spinner help you right now?'
    }
  }
};

export const getMoodData = (mood: Mood): MoodData => {
  return moodColors[mood];
};

export const getRandomJoke = (): string => {
  const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
    "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
    "Why was the math book sad? It had too many problems.",
    "What do you call a parade of rabbits hopping backwards? A receding hare-line."
  ];
  
  return jokes[Math.floor(Math.random() * jokes.length)];
};

export const getRandomAdvice = (): string => {
  const advice = [
    "Try counting to 10 slowly before responding to something that makes you angry.",
    "Take a 5-minute walk outside to reset your mind.",
    "Write down three things you're grateful for right now.",
    "Close your eyes and focus only on your breathing for 30 seconds.",
    "Drink a glass of water. Sometimes dehydration affects your mood."
  ];
  
  return advice[Math.floor(Math.random() * advice.length)];
};

export const generateMockEntries = (count: number): string[] => {
  const moods: Mood[] = ['happy', 'sad', 'angry', 'tired', 'love', 'confused'];
  const today = new Date();
  const entries: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const mood = moods[Math.floor(Math.random() * moods.length)];
    entries.push(JSON.stringify({
      id: `mock-${i}`,
      mood,
      date: date.toISOString().split('T')[0],
      note: ''
    }));
  }
  
  return entries;
};