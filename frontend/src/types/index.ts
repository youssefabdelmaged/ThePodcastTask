// Core podcast types
export interface Podcast {
  id: string | number;
  title: string;
  description: string;
  host: string;
  duration: string;
  category: string;
  image: string;
  rating: number;
  episodes: number;
  publishedAt?: Date;
  tags?: string[];
  audioUrl?: string;
  transcriptUrl?: string;
}

export interface Episode {
  id: string | number;
  podcastId: string | number;
  title: string;
  description: string;
  duration: number; // in seconds
  audioUrl: string;
  publishedAt: Date;
  transcriptUrl?: string;
  showNotes?: string;
  chapterMarks?: ChapterMark[];
}

export interface ChapterMark {
  title: string;
  startTime: number; // in seconds
  endTime?: number; // in seconds
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon: string;
  count: number;
  color?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: UserPreferences;
  playlists?: Playlist[];
  listeningHistory?: ListeningHistory[];
}

export interface UserPreferences {
  playbackSpeed: number;
  autoPlay: boolean;
  downloadQuality: "low" | "medium" | "high";
  notifications: boolean;
  darkMode: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  episodes: Episode[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ListeningHistory {
  episodeId: string | number;
  podcastId: string | number;
  listenedAt: Date;
  progress: number; // percentage 0-100
  completed: boolean;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  pagination?: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Search and Filter types
export interface SearchFilters {
  query?: string;
  category?: string;
  duration?: "short" | "medium" | "long";
  rating?: number;
  sortBy?: "relevance" | "rating" | "newest" | "popular";
  page?: number;
  limit?: number;
}

// Audio Player types
export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playbackSpeed: number;
  isMuted: boolean;
  currentEpisode?: Episode;
  queue: Episode[];
  currentIndex: number;
}

// Component Props types
export interface PodcastCardProps {
  podcast: Podcast;
  onPlay?: (podcast: Podcast) => void;
  onAddToPlaylist?: (podcast: Podcast) => void;
  showActions?: boolean;
}

export interface EpisodeCardProps {
  episode: Episode;
  podcast?: Podcast;
  onPlay?: (episode: Episode) => void;
  onDownload?: (episode: Episode) => void;
  showActions?: boolean;
}

export interface SearchBarProps {
  onSearch: (query: string, filters?: SearchFilters) => void;
  placeholder?: string;
  className?: string;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
  interests: string[];
}
