"use client";

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ItemCard from './ItemCard';
import { Item } from '@/store/watchlistStore';

interface DraggableItemCardProps {
  item: Item;
  onEditItem: (item: Item) => void;
}

const DraggableItemCard: React.FC<DraggableItemCardProps> = ({ item, onEditItem }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ItemCard item={item} onClick={() => onEditItem(item)} />
    </div>
  );
};

export default DraggableItemCard;