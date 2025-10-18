"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import MainContent from '@/components/MainContent/MainContent';
import { Item, Category } from '@/store/watchlistStore';
import EditPanel from '@/components/EditPanel/EditPanel';

export default function Home() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [editingItem, setEditingItem] = useState<{ item: Item; category: Category } | null>(null);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleEditItem = (item: Item, category: Category) => {
    setEditingItem({ item, category });
  };

  const handleCloseEditPanel = () => {
    setEditingItem(null);
  };

  return (
    <main className="flex h-screen bg-black text-white overflow-hidden">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-all duration-300 overflow-y-auto ${isSidebarCollapsed ? 'ml-16' : 'ml-80'}`}>
        <MainContent onEditItem={handleEditItem} />
      </div>
      {editingItem && (
        <EditPanel
          item={editingItem.item}
          category={editingItem.category}
          onClose={handleCloseEditPanel}
        />
      )}
    </main>
  );
}
