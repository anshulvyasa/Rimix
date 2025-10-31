"use client"

import React, { useState, useEffect } from 'react';
import { 
  Clock, Plus, Search, Edit3, Trash2, Bell, BellOff, 
  Upload, Mic, FileText, Play, Pause, Square, 
  ChevronLeft, ChevronRight, Calendar, CheckSquare, 
  Timer, Watch, FolderOpen, Music, Volume2, Sun,
  Moon, Cloud, CloudRain, CloudSnow, CloudDrizzle
} from 'lucide-react';

// Sample dummy data
const initialReminders = [
  { id: 1, title: 'Team Meeting', description: 'Weekly sync with design team', date: '2023-09-15', time: '10:30', completed: false, priority: 'high', category: 'Work' },
  { id: 2, title: 'Gym Session', description: 'Leg day workout', date: '2023-09-14', time: '18:00', completed: false, priority: 'medium', category: 'Health' },
  { id: 3, title: 'Mom\'s Birthday', description: 'Call mom for her birthday', date: '2023-09-20', time: '09:00', completed: false, priority: 'high', category: 'Personal' },
  { id: 4, title: 'Project Deadline', description: 'Submit final project documentation', date: '2023-09-18', time: '16:00', completed: false, priority: 'high', category: 'Work' },
  { id: 5, title: 'Dentist Appointment', description: 'Regular checkup at Dr. Smith', date: '2023-09-16', time: '14:30', completed: false, priority: 'medium', category: 'Health' },
  { id: 6, title: 'Book Club', description: 'Discuss "The Midnight Library"', date: '2023-09-22', time: '19:00', completed: false, priority: 'low', category: 'Personal' },
  { id: 7, title: 'Car Service', description: 'Take car for oil change', date: '2023-09-17', time: '11:00', completed: false, priority: 'medium', category: 'Other' },
  { id: 8, title: 'Pay Rent', description: 'Transfer rent to landlord', date: '2023-09-25', time: '12:00', completed: false, priority: 'high', category: 'Finance' },
  { id: 9, title: 'Conference Call', description: 'With international clients', date: '2023-09-19', time: '13:00', completed: false, priority: 'high', category: 'Work' },
  { id: 10, title: 'Grocery Shopping', description: 'Buy ingredients for dinner party', date: '2023-09-21', time: '17:30', completed: false, priority: 'medium', category: 'Personal' },
  { id: 11, title: 'Yoga Class', description: 'Evening yoga session', date: '2023-09-23', time: '18:30', completed: false, priority: 'medium', category: 'Health' },
  { id: 12, title: 'Movie Night', description: 'Watch new sci-fi movie', date: '2023-09-24', time: '20:00', completed: false, priority: 'low', category: 'Personal' },
];

const RimixApp = () => {
  const [reminders, setReminders] = useState(initialReminders);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    priority: 'medium',
    category: 'Personal'
  });
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [timerTime, setTimerTime] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);
  const [activeTab, setActiveTab] = useState('reminders');
  const [darkMode, setDarkMode] = useState(false);

  const itemsPerPage = 10;

  // Filter reminders based on search term
  const filteredReminders = reminders.filter(reminder =>
    reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reminder.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredReminders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReminders = filteredReminders.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle reminder creation
  const handleCreateReminder = () => {
    if (editingReminder) {
      // Update existing reminder
      setReminders(reminders.map(r => 
        r.id === editingReminder.id ? { ...editingReminder } : r
      ));
      setEditingReminder(null);
    } else {
      // Create new reminder
      const newId = Math.max(...reminders.map(r => r.id)) + 1;
      setReminders([...reminders, { ...newReminder, id: newId, completed: false }]);
    }
    setIsModalOpen(false);
    setNewReminder({
      title: '',
      description: '',
      date: '',
      time: '',
      priority: 'medium',
      category: 'Personal'
    });
  };

  // Handle reminder deletion
  const handleDeleteReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  // Handle reminder toggle (complete/incomplete)
  const handleToggleReminder = (id) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  // Handle edit reminder
  const handleEditReminder = (reminder) => {
    setEditingReminder(reminder);
    setNewReminder({
      title: reminder.title,
      description: reminder.description,
      date: reminder.date,
      time: reminder.time,
      priority: reminder.priority,
      category: reminder.category
    });
    setIsModalOpen(true);
  };

  // Stopwatch effects
  useEffect(() => {
    let interval = null;
    if (stopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [stopwatchRunning]);

  // Timer effects
  useEffect(() => {
    let interval = null;
    if (timerRunning && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (timerTime === 0) {
      setTimerRunning(false);
      // Alarm would go off here
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerTime]);

  // Format time functions
  const formatStopwatchTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const formatTimerTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Weather icons based on time of day
  const getWeatherIcon = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      return <Sun className="text-yellow-400" size={24} />;
    } else {
      return <Moon className="text-indigo-400" size={24} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-amber-50 to-orange-50 text-gray-800'}`}>
      {/* Header */}
      <header className={`p-6 transition-colors duration-300 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-amber-400 to-orange-500'} rounded-b-2xl shadow-lg`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-white bg-opacity-20'}`}>
              <Clock size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Rimix</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {getWeatherIcon()}
              <span className="text-white">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-amber-100 text-amber-700'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-orange-600 hover:bg-amber-50 font-semibold py-2 px-4 rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-md"
            >
              <Plus size={20} />
              <span>New Reminder</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Tabs */}
        <div className={`flex mb-8 rounded-xl overflow-hidden shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            className={`flex-1 py-4 font-medium flex items-center justify-center space-x-2 ${activeTab === 'reminders' ? (darkMode ? 'bg-amber-600' : 'bg-amber-500 text-white') : (darkMode ? 'bg-gray-700' : 'bg-amber-100 text-amber-700')}`}
            onClick={() => setActiveTab('reminders')}
          >
            <Clock size={20} />
            <span>Reminders</span>
          </button>
          <button
            className={`flex-1 py-4 font-medium flex items-center justify-center space-x-2 ${activeTab === 'stopwatch' ? (darkMode ? 'bg-amber-600' : 'bg-amber-500 text-white') : (darkMode ? 'bg-gray-700' : 'bg-amber-100 text-amber-700')}`}
            onClick={() => setActiveTab('stopwatch')}
          >
            <Watch size={20} />
            <span>Stopwatch</span>
          </button>
          <button
            className={`flex-1 py-4 font-medium flex items-center justify-center space-x-2 ${activeTab === 'timer' ? (darkMode ? 'bg-amber-600' : 'bg-amber-500 text-white') : (darkMode ? 'bg-gray-700' : 'bg-amber-100 text-amber-700')}`}
            onClick={() => setActiveTab('timer')}
          >
            <Timer size={20} />
            <span>Timer</span>
          </button>
        </div>

        {activeTab === 'reminders' && (
          <>
            {/* Search Bar */}
            <div className={`rounded-2xl shadow-md p-4 mb-8 flex items-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <Search className={`mr-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
              <input
                type="text"
                placeholder="Search reminders by task or description..."
                className={`w-full p-2 outline-none ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Reminders List */}
            <div className={`rounded-2xl shadow-md overflow-hidden mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              {currentReminders.length > 0 ? (
                currentReminders.map(reminder => (
                  <div key={reminder.id} className={`border-b ${darkMode ? 'border-gray-700' : 'border-amber-100'} p-5 ${reminder.completed ? (darkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-amber-50') : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button 
                          onClick={() => handleToggleReminder(reminder.id)}
                          className={`p-2 rounded-full ${reminder.completed ? (darkMode ? 'bg-green-700' : 'bg-green-100 text-green-600') : (darkMode ? 'bg-gray-700' : 'bg-amber-100 text-amber-600')}`}
                        >
                          {reminder.completed ? <CheckSquare size={20} /> : <Square size={20} />}
                        </button>
                        <div>
                          <h3 className={`font-semibold ${reminder.completed ? 'line-through text-gray-500' : ''}`}>
                            {reminder.title}
                          </h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{reminder.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className={`text-xs flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              <Calendar size={14} className="mr-1" />
                              {reminder.date}
                            </span>
                            <span className={`text-xs flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              <Clock size={14} className="mr-1" />
                              {reminder.time}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              reminder.priority === 'high' ? 'bg-red-100 text-red-800' :
                              reminder.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {reminder.priority}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-blue-800 text-blue-100' : 'bg-blue-100 text-blue-800'}`}>
                              {reminder.category}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditReminder(reminder)}
                          className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-blue-400' : 'hover:bg-blue-50 text-blue-500'}`}
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDeleteReminder(reminder.id)}
                          className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-red-50 text-red-500'}`}
                        >
                          <Trash2 size={18} />
                        </button>
                        <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-purple-400' : 'hover:bg-purple-50 text-purple-500'}`}>
                          <Bell size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <FolderOpen size={48} className="mx-auto mb-4 text-amber-400" />
                  <p>No reminders found. Create your first reminder!</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mb-8">
                <button 
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full shadow-md disabled:opacity-30 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                >
                  <ChevronLeft size={20} />
                </button>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Page {currentPage} of {totalPages}
                </span>
                <button 
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full shadow-md disabled:opacity-30 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}

        {activeTab === 'stopwatch' && (
          <div className={`rounded-2xl shadow-md p-8 text-center mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">
              <Watch className="mr-2 text-amber-500" size={28} />
              Stopwatch
            </h2>
            <div className={`text-6xl font-mono font-bold mb-8 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              {formatStopwatchTime(stopwatchTime)}
            </div>
            <div className="flex justify-center space-x-4">
              {!stopwatchRunning ? (
                <button 
                  onClick={() => setStopwatchRunning(true)}
                  className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg flex items-center space-x-2 shadow-md"
                >
                  <Play size={20} />
                  <span>Start</span>
                </button>
              ) : (
                <button 
                  onClick={() => setStopwatchRunning(false)}
                  className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg flex items-center space-x-2 shadow-md"
                >
                  <Pause size={20} />
                  <span>Pause</span>
                </button>
              )}
              <button 
                onClick={() => {
                  setStopwatchRunning(false);
                  setStopwatchTime(0);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg flex items-center space-x-2 shadow-md"
              >
                <Square size={20} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'timer' && (
          <div className={`rounded-2xl shadow-md p-8 text-center mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">
              <Timer className="mr-2 text-amber-500" size={28} />
              Timer
            </h2>
            <div className={`text-6xl font-mono font-bold mb-8 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
              {formatTimerTime(timerTime)}
            </div>
            <div className="mb-6">
              <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Set Timer (minutes)</label>
              <input
                type="number"
                min="1"
                value={Math.floor(timerTime / 60)}
                onChange={(e) => setTimerTime(parseInt(e.target.value) * 60)}
                className={`border rounded-lg p-2 text-center w-32 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-amber-200'}`}
                disabled={timerRunning}
              />
            </div>
            <div className="flex justify-center space-x-4">
              {!timerRunning ? (
                <button 
                  onClick={() => setTimerRunning(true)}
                  className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg flex items-center space-x-2 shadow-md"
                >
                  <Play size={20} />
                  <span>Start</span>
                </button>
              ) : (
                <button 
                  onClick={() => setTimerRunning(false)}
                  className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg flex items-center space-x-2 shadow-md"
                >
                  <Pause size={20} />
                  <span>Pause</span>
                </button>
              )}
              <button 
                onClick={() => {
                  setTimerRunning(false);
                  setTimerTime(300);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg flex items-center space-x-2 shadow-md"
              >
                <Square size={20} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        )}

        {/* File Upload Section */}
        <div className={`rounded-2xl shadow-md p-6 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Upload className="mr-2 text-amber-500" size={24} />
            Attach Files
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer hover:scale-105 ${darkMode ? 'border-amber-500 hover:bg-amber-900 hover:bg-opacity-20' : 'border-amber-400 hover:bg-amber-50'}`}>
              <Mic className="mx-auto text-amber-500 mb-2" size={32} />
              <p>Record Voice</p>
            </div>
            <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer hover:scale-105 ${darkMode ? 'border-amber-500 hover:bg-amber-900 hover:bg-opacity-20' : 'border-amber-400 hover:bg-amber-50'}`}>
              <FileText className="mx-auto text-amber-500 mb-2" size={32} />
              <p>Upload Document</p>
            </div>
            <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer hover:scale-105 ${darkMode ? 'border-amber-500 hover:bg-amber-900 hover:bg-opacity-20' : 'border-amber-400 hover:bg-amber-50'}`}>
              <Music className="mx-auto text-amber-500 mb-2" size={32} />
              <p>Add Alarm Sound</p>
            </div>
          </div>
        </div>
      </main>

      {/* Create/Edit Reminder Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className={`rounded-2xl shadow-2xl w-full max-w-md overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`p-4 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-r from-amber-400 to-orange-500'} text-white`}>
              <h2 className="text-xl font-semibold">
                {editingReminder ? 'Edit Reminder' : 'Create New Reminder'}
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Title</label>
                  <input
                    type="text"
                    className={`w-full p-3 rounded-xl ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-amber-50 border-amber-200'} border`}
                    value={newReminder.title}
                    onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                  <textarea
                    className={`w-full p-3 rounded-xl ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-amber-50 border-amber-200'} border`}
                    rows="3"
                    value={newReminder.description}
                    onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</label>
                    <input
                      type="date"
                      className={`w-full p-3 rounded-xl ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-amber-50 border-amber-200'} border`}
                      value={newReminder.date}
                      onChange={(e) => setNewReminder({...newReminder, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Time</label>
                    <input
                      type="time"
                      className={`w-full p-3 rounded-xl ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-amber-50 border-amber-200'} border`}
                      value={newReminder.time}
                      onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Priority</label>
                    <select
                      className={`w-full p-3 rounded-xl ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-amber-50 border-amber-200'} border`}
                      value={newReminder.priority}
                      onChange={(e) => setNewReminder({...newReminder, priority: e.target.value})}
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
                    <select
                      className={`w-full p-3 rounded-xl ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-amber-50 border-amber-200'} border`}
                      value={newReminder.category}
                      onChange={(e) => setNewReminder({...newReminder, category: e.target.value})}
                    >
                      <option value="Work">Work</option>
                      <option value="Personal">Personal</option>
                      <option value="Health">Health</option>
                      <option value="Finance">Finance</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingReminder(null);
                    setNewReminder({
                      title: '',
                      description: '',
                      date: '',
                      time: '',
                      priority: 'medium',
                      category: 'Personal'
                    });
                  }}
                  className={`px-4 py-2 rounded-xl ${darkMode ? 'bg-gray-700 text-white' : 'bg-amber-100 text-amber-700'}`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateReminder}
                  className="px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 shadow-md"
                >
                  {editingReminder ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <p>Made by Aashish</p>
        <a 
          href="https://www.linkedin.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-amber-500 hover:underline inline-flex items-center mt-2"
        >
          Connect on LinkedIn
        </a>
      </footer>
    </div>
  );
};

export default RimixApp;