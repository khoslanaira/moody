import React, { useState } from 'react';
import { MoodProvider } from './context/MoodContext';
import Layout from './components/Layout/Layout';
import EmojiMaster from './components/EmojiMaster/EmojiMaster';
import MoodSelector from './components/MoodSelector/MoodSelector';
import MoodCalendar from './components/Calendar/MoodCalendar';
import MoodChart from './components/Analytics/MoodChart';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<'track' | 'calendar' | 'stats'>('track');
  
  return (
    <MoodProvider>
      <Layout>
        <div className="tabs flex justify-between mb-6 bg-white/30 backdrop-blur-sm rounded-lg p-1">
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'track' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('track')}
          >
            Track Mood
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'calendar' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('calendar')}
          >
            Calendar
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              activeTab === 'stats' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
            }`}
            onClick={() => setActiveTab('stats')}
          >
            Stats
          </button>
        </div>
        
        {activeTab === 'track' && (
          <div className="content-container bg-white/80 backdrop-blur-md rounded-xl p-6 shadow-sm">
            <EmojiMaster />
            <div className="mt-8">
              <MoodSelector />
            </div>
          </div>
        )}
        
        {activeTab === 'calendar' && (
          <MoodCalendar />
        )}
        
        {activeTab === 'stats' && (
          <MoodChart />
        )}
      </Layout>
    </MoodProvider>
  );
}

export default App;