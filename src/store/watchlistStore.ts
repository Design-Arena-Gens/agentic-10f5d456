import {create} from 'zustand';
import { sampleData } from '@/data/sampleData';

export interface Item {
  id: string;
  title: string;
  poster: string;
  score: number | null;
  notes: string;
  type: 'movie' | 'tv';
}

export type Category = 'currentlyWatching' | 'planningToWatch' | 'watched' | 'dropped';

interface WatchlistState {
  items: Record<Category, Item[]>;
  addItem: (category: Category, item: Item) => void;
  moveItem: (from: Category, to: Category, itemId: string) => void;
  updateItem: (category: Category, itemId: string, updates: Partial<Item>) => void;
  deleteItem: (category: Category, itemId: string) => void;
  importData: (data: Record<string, Item[]>) => void;
}

export const useWatchlistStore = create<WatchlistState>((set) => ({
  items: sampleData as Record<Category, Item[]>,
  addItem: (category, item) =>
    set((state) => ({
      items: { ...state.items, [category]: [...state.items[category], item] },
    })),
  moveItem: (from, to, itemId) =>
    set((state) => {
      const itemToMove = state.items[from].find((item) => item.id === itemId);
      if (!itemToMove) return state;

      return {
        items: {
          ...state.items,
          [from]: state.items[from].filter((item) => item.id !== itemId),
          [to]: [...state.items[to], itemToMove],
        },
      };
    }),
  updateItem: (category, itemId, updates) =>
    set((state) => ({
      items: {
        ...state.items,
        [category]: state.items[category].map((item) =>
          item.id === itemId ? { ...item, ...updates } : item
        ),
      },
    })),
  deleteItem: (category, itemId) =>
    set((state) => ({
      items: {
        ...state.items,
        [category]: state.items[category].filter((item) => item.id !== itemId),
      },
    })),
  importData: (data) => set({ items: data as Record<Category, Item[]> }),
}));
