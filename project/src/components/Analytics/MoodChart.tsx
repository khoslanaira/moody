import React, { useMemo } from 'react';
import { BarChart, Activity } from 'lucide-react';
import { useMood } from '../../context/MoodContext';
import { getMoodData } from '../../utils/moodData';
import { Mood } from '../../types';

const MoodChart: React.FC = () => {
  const { moodEntries } = useMood();
  
  const moodStats = useMemo(() => {
    if (!moodEntries.length) return null;
    
    // Get entries from the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);
    
    const recentEntries = moodEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate >= thirtyDaysAgo;
    });
    
    // Count occurrences of each mood
    const counts: Record<Mood, number> = {
      happy: 0,
      sad: 0,
      angry: 0,
      tired: 0,
      love: 0,
      confused: 0
    };
    
    recentEntries.forEach(entry => {
      counts[entry.mood]++;
    });
    
    // Convert to array of objects for easier rendering
    const moodCounts = Object.entries(counts).map(([mood, count]) => ({
      mood: mood as Mood,
      count,
      percentage: recentEntries.length ? Math.round((count / recentEntries.length) * 100) : 0
    }));
    
    // Sort by count, descending
    moodCounts.sort((a, b) => b.count - a.count);
    
    return {
      moodCounts,
      total: recentEntries.length,
      topMood: moodCounts[0]?.mood || null
    };
  }, [moodEntries]);
  
  if (!moodStats || moodStats.total === 0) {
    return (
      <div className="mood-chart p-4 bg-white rounded-xl shadow-sm">
        <div className="flex items-center mb-4">
          <Activity className="w-5 h-5 mr-2 text-purple-500" />
          <h3 className="text-lg font-semibold">Mood Analytics</h3>
        </div>
        <p className="text-center text-gray-500 py-8">No mood data available yet.</p>
      </div>
    );
  }
  
  return (
    <div className="mood-chart p-4 bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <BarChart className="w-5 h-5 mr-2 text-purple-500" />
          <h3 className="text-lg font-semibold">Mood Analytics</h3>
        </div>
        <span className="text-xs text-gray-500">Last 30 days</span>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Your dominant mood</h4>
        {moodStats.topMood && (
          <div className="flex items-center">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: getMoodData(moodStats.topMood).lightColor }}
            >
              <span className="text-lg">{getMoodData(moodStats.topMood).emoji}</span>
            </div>
            <div>
              <p className="font-medium capitalize">{moodStats.topMood}</p>
              <p className="text-xs text-gray-500">
                {moodStats.moodCounts[0].percentage}% of the time
              </p>
            </div>
          </div>
        )}
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-600 mb-2">Mood distribution</h4>
        <div className="space-y-2">
          {moodStats.moodCounts.map(({ mood, count, percentage }) => (
            <div key={mood} className="relative">
              <div className="flex justify-between text-xs mb-1">
                <span className="capitalize">{mood}</span>
                <span>{percentage}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: getMoodData(mood).color
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoodChart;