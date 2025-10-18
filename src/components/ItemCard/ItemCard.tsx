import React from 'react';
import { Item } from '@/store/watchlistStore';

interface ItemCardProps {
  item: Item;
  onClick: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onClick }) => {
  return (
    <div
      className="relative rounded-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105"
      onClick={onClick}
    >
      <img src={item.poster} alt={item.title} className="w-full h-auto object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
        <h3 className="text-sm font-bold truncate">{item.title}</h3>
        {item.score && <p className="text-xs text-yellow-400">Score: {item.score}/10</p>}
      </div>
    </div>
  );
};

export default ItemCard;
