import { Item } from '@/store/watchlistStore';

interface ITunesResult {
  trackId: number;
  trackName: string;
  artworkUrl100: string;
}

interface TVMazeResult {
  show: {
    id: number;
    name: string;
    image?: {
      medium: string;
    };
  };
}

export const searchMovies = async (term: string): Promise<Item[]> => {
  try {
    const response = await fetch(`https://itunes.apple.com/search?term=${term}&entity=movie&limit=5`);
    const data = await response.json();
    return data.results.map((result: ITunesResult) => ({
      id: result.trackId.toString(),
      title: result.trackName,
      poster: result.artworkUrl100.replace('100x100', '500x500'),
      score: null,
      notes: '',
      type: 'movie',
    }));
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const searchTvShows = async (term: string): Promise<Item[]> => {
  try {
    const response = await fetch(`https://api.tvmaze.com/search/shows?q=${term}`);
    const data = await response.json();
    return data.slice(0, 5).map((result: TVMazeResult) => ({
      id: result.show.id.toString(),
      title: result.show.name,
      poster: result.show.image?.medium || '',
      score: null,
      notes: '',
      type: 'tv',
    }));
  } catch (error) {
    console.error('Error searching TV shows:', error);
    return [];
  }
};