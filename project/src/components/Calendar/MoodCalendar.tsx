import React, { useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMood } from '../../context/MoodContext';
import { getMoodData } from '../../utils/moodData';

const MoodCalendar: React.FC = () => {
  const { moodEntries } = useMood();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  
  const getMoodForDate = (dateStr: string) => {
    const entry = moodEntries.find(e => e.date === dateStr);
    return entry ? entry.mood : null;
  };
  
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Add weekday headers
    days.push(
      <div key="weekdays" className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map(day => (
          <div key={day} className="text-center text-xs text-gray-500 font-medium py-1">
            {day}
          </div>
        ))}
      </div>
    );
    
    // Add empty cells for days before the first day of the month
    const blankCells = [];
    for (let i = 0; i < firstDay; i++) {
      blankCells.push(
        <div key={`blank-${i}`} className="h-10 rounded-md"></div>
      );
    }
    
    // Add days of the month
    const dayCells = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const mood = getMoodForDate(dateStr);
      
      dayCells.push(
        <div 
          key={day} 
          className={`relative h-10 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors ${
            new Date().toISOString().split('T')[0] === dateStr ? 'border border-blue-400' : ''
          }`}
          title={mood ? `Mood: ${mood}` : 'No mood recorded'}
        >
          {mood && (
            <div 
              className="absolute inset-0 rounded-md opacity-40" 
              style={{ backgroundColor: getMoodData(mood).color }}
            ></div>
          )}
          <span className="z-10 text-sm">{day}</span>
          {mood && (
            <span className="absolute bottom-1 text-xs">{getMoodData(mood).emoji}</span>
          )}
        </div>
      );
    }
    
    // Combine all cells
    const allCells = [...blankCells, ...dayCells];
    
    // Split into weeks
    const rows = [];
    let cells: JSX.Element[] = [];
    
    allCells.forEach((cell, i) => {
      if (i % 7 === 0 && cells.length > 0) {
        rows.push(
          <div key={`week-${i / 7}`} className="grid grid-cols-7 gap-1 mb-1">
            {cells}
          </div>
        );
        cells = [];
      }
      cells.push(cell);
    });
    
    // Add the last row
    if (cells.length > 0) {
      rows.push(
        <div key={`week-last`} className="grid grid-cols-7 gap-1 mb-1">
          {cells}
        </div>
      );
    }
    
    return rows;
  };
  
  return (
    <div className="mood-calendar p-4 bg-white rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <CalendarDays className="w-5 h-5 mr-2 text-blue-500" />
          <h3 className="text-lg font-semibold">Mood Calendar</h3>
        </div>
        
        <div className="flex items-center">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="mx-2 text-sm font-medium">{formatMonth(currentMonth)}</span>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {renderCalendar()}
    </div>
  );
};

export default MoodCalendar;