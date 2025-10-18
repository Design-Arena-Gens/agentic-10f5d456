"use client";

import React, { useState } from 'react';
import { FiMenu, FiX, FiUpload, FiDownload } from 'react-icons/fi';
import { searchMovies, searchTvShows } from '@/lib/api';
import { Item, useWatchlistStore } from '@/store/watchlistStore';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  const { addItem, importData, items } = useWatchlistStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [manualTitle, setManualTitle] = useState('');
  const [manualPoster, setManualPoster] = useState('');

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 2) {
      const movies = await searchMovies(term);
      const tvShows = await searchTvShows(term);
      setSearchResults([...movies, ...tvShows]);
    } else {
      setSearchResults([]);
    }
  };

  const handleAddItem = (item: Item) => {
    addItem('planningToWatch', item);
    setSearchTerm('');
    setSearchResults([]);
  };

  const handleManualAdd = () => {
    if (manualTitle) {
      const newItem: Item = {
        id: Date.now().toString(),
        title: manualTitle,
        poster: manualPoster,
        score: null,
        notes: '',
        type: 'movie', // Default to movie
      };
      addItem('planningToWatch', newItem);
      setManualTitle('');
      setManualPoster('');
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(items, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'watchlist.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          importData(data);
        } catch (error) {
          console.error('Error importing data:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-80'} h-screen p-4 glass-morphism flex flex-col fixed`}>
      <div className="flex justify-end">
        <button onClick={toggleSidebar} className="text-white mb-4">
          {isCollapsed ? <FiMenu size={24} /> : <FiX size={24} />}
        </button>
      </div>
      <div className={isCollapsed ? 'hidden' : 'block'}>
        <h1 className="text-2xl font-bold mb-6">Watchlist</h1>
        
        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-gray-800 rounded-lg p-2"
          />
          {searchResults.length > 0 && (
            <div className="mt-2 bg-gray-800 rounded-lg">
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleAddItem(item)}
                  className="p-2 flex items-center cursor-pointer hover:bg-gray-700"
                >
                  <img src={item.poster} alt={item.title} className="w-10 h-14 object-cover rounded-md mr-2" />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Manual Add */}
        <div className="mb-4">
          <h2 className="font-bold mb-2">Add Manually</h2>
          <input
            type="text"
            placeholder="Title"
            value={manualTitle}
            onChange={(e) => setManualTitle(e.target.value)}
            className="w-full bg-gray-800 rounded-lg p-2 mb-2"
          />
          <input
            type="text"
            placeholder="Poster URL"
            value={manualPoster}
            onChange={(e) => setManualPoster(e.target.value)}
            className="w-full bg-gray-800 rounded-lg p-2 mb-2"
          />
          <button onClick={handleManualAdd} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            Add
          </button>
        </div>

        {/* Import/Export */}
        <div className="flex space-x-2">
          <label htmlFor="import-file" className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg cursor-pointer text-center">
            <FiUpload className="inline-block mr-2" /> Import
          </label>
          <input id="import-file" type="file" accept=".json" className="hidden" onChange={handleImport} />
          <button onClick={handleExport} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg">
            <FiDownload className="inline-block mr-2" /> Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;