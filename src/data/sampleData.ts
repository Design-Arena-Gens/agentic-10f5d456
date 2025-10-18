import { Item } from '@/store/watchlistStore';

export const sampleData: Record<string, Item[]> = {
  currentlyWatching: [
    {
      id: '1',
      title: 'Blade Runner 2049',
      poster: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
      score: 9,
      notes: 'Visually stunning!',
      type: 'movie',
    },
    {
      id: '2',
      title: 'The Boys',
      poster: 'https://image.tmdb.org/t/p/w500/stTEycfG9928HYGEISBFaG1NGj3.jpg',
      score: 8,
      notes: 'Crazy show.',
      type: 'tv',
    },
  ],
  planningToWatch: [
    {
      id: '3',
      title: 'Dune: Part Two',
      poster: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg',
      score: null,
      notes: '',
      type: 'movie',
    },
    {
      id: '4',
      title: 'Severance',
      poster: 'https://image.tmdb.org/t/p/w500/lFf6LLr96dHcIb6xx2KzL4Qfkd.jpg',
      score: null,
      notes: '',
      type: 'tv',
    },
  ],
  watched: [
    {
      id: '5',
      title: 'Interstellar',
      poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      score: 10,
      notes: 'Mind-bending.',
      type: 'movie',
    },
  ],
  dropped: [
    {
      id: '6',
      title: 'The Witcher',
      poster: 'https://image.tmdb.org/t/p/w500/7vjaCdMw15FEbXy62B36V5w0Tz.jpg',
      score: 6,
      notes: 'Lost interest after season 1.',
      type: 'tv',
    },
  ],
};
