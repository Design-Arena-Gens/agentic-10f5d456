"use client";

import React from 'react';
import Category from './Category';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useWatchlistStore, Category as CategoryType, Item } from '@/store/watchlistStore';

interface MainContentProps {
  onEditItem: (item: Item, category: CategoryType) => void;
}

const MainContent: React.FC<MainContentProps> = ({ onEditItem }) => {
  const { moveItem, items } = useWatchlistStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const activeContainer = active.data.current?.sortable.containerId as CategoryType;
      const overContainer = over.data.current?.sortable.containerId as CategoryType;
      const itemId = active.id as string;

      if (activeContainer && overContainer && activeContainer !== overContainer) {
        moveItem(activeContainer, overContainer, itemId);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(Object.keys(items) as CategoryType[]).map((category) => (
            <Category
              key={category}
              id={category}
              title={category.replace(/([A-Z])/g, ' $1')}
              items={items[category]}
              onEditItem={(item) => onEditItem(item, category)}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default MainContent;