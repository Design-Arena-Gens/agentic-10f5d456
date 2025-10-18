"use client";

import React from 'react';
import { FiX } from 'react-icons/fi';
import { Item, useWatchlistStore, Category } from '@/store/watchlistStore';

interface EditPanelProps {
  item: Item;
  category: Category;
  onClose: () => void;
}

const EditPanel: React.FC<EditPanelProps> = ({ item, category, onClose }) => {
  const { updateItem, deleteItem } = useWatchlistStore();

  const handleScoreChange = (score: number) => {
    updateItem(category, item.id, { score });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateItem(category, item.id, { notes: e.target.value });
  };

  const handleDelete = () => {
    deleteItem(category, item.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="glass-morphism p-8 rounded-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
          <button onClick={onClose} className="text-white">
            <FiX size={24} />
          </button>
        </div>
        <div className="flex space-x-4">
          <img src={item.poster} alt={item.title} className="w-32 h-48 object-cover rounded-lg" />
          <div className="flex-1">
            <div>
              <h3 className="font-bold mb-2">Score</h3>
              <div className="flex space-x-1">
                {[...Array(10)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleScoreChange(i + 1)}
                    className={`w-8 h-8 rounded-full ${item.score === i + 1 ? 'bg-yellow-400 text-black' : 'bg-gray-700'}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="font-bold mb-2">Notes</h3>
              <textarea
                value={item.notes}
                onChange={handleNotesChange}
                className="w-full h-24 bg-gray-800 rounded-lg p-2"
              />
            </div>
          </div>
        </div>
        <button onClick={handleDelete} className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditPanel;
