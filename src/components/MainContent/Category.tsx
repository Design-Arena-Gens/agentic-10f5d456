"use client";

import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Item } from '@/store/watchlistStore';
import DraggableItemCard from '../ItemCard/DraggableItemCard';

type Filter = 'all' | 'movie' | 'tv';

interface CategoryProps {
  id: string;
  title: string;
  items: Item[];
  onEditItem: (item: Item) => void;
}

const Category: React.FC<CategoryProps> = ({ id, title, items, onEditItem }) => {
  const { setNodeRef } = useDroppable({ id });
  const [filter, setFilter] = useState<Filter>('all');

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div className="glass-morphism p-4 flex flex-col rounded-lg min-h-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold capitalize">{title}</h2>
        <div className="flex space-x-2">
          <button onClick={() => setFilter('all')} className={filter === 'all' ? 'font-bold' : ''}>All</button>
          <button onClick={() => setFilter('movie')} className={filter === 'movie' ? 'font-bold' : ''}>Movies</button>
          <button onClick={() => setFilter('tv')} className={filter === 'tv' ? 'font-bold' : ''}>TV</button>
        </div>
      </div>
      <SortableContext id={id} items={filteredItems} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <DraggableItemCard key={item.id} item={item} onEditItem={onEditItem} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Category;