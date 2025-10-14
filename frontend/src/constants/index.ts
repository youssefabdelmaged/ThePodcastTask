// App constants
export const APP_NAME = "PodcastApp";
export const APP_VERSION = "1.0.0";
export const APP_DESCRIPTION = "A modern podcast discovery platform";

// API endpoints
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
export const API_ENDPOINTS = {
  PODCASTS: "/podcasts",
  EPISODES: "/episodes",
  CATEGORIES: "/categories",
  USERS: "/users",
  PLAYLISTS: "/playlists",
  SEARCH: "/search",
  UPLOAD: "/upload",
} as const;

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 50;

// Audio player constants
export const AUDIO_CONFIG = {
  DEFAULT_VOLUME: 1.0,
  DEFAULT_PLAYBACK_SPEED: 1.0,
  MIN_PLAYBACK_SPEED: 0.5,
  MAX_PLAYBACK_SPEED: 3.0,
  PLAYBACK_SPEED_STEP: 0.25,
  SEEK_STEP: 10, // seconds
  BUFFER_SIZE: 1024 * 1024, // 1MB
} as const;

// File upload limits
export const UPLOAD_LIMITS = {
  MAX_FILE_SIZE: 100 * 1024 * 1024, // 100MB
  ALLOWED_AUDIO_FORMATS: ["mp3", "wav", "m4a", "aac", "ogg"],
  MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_FORMATS: ["jpg", "jpeg", "png", "webp"],
} as const;

// Podcast categories
export const PODCAST_CATEGORIES = [
  { id: "technology", name: "Technology", icon: "💻", color: "#3B82F6" },
  { id: "business", name: "Business", icon: "💼", color: "#10B981" },
  { id: "science", name: "Science", icon: "🔬", color: "#8B5CF6" },
  { id: "health", name: "Health", icon: "🏥", color: "#EF4444" },
  { id: "education", name: "Education", icon: "📚", color: "#F59E0B" },
  { id: "entertainment", name: "Entertainment", icon: "🎭", color: "#EC4899" },
  { id: "news", name: "News", icon: "📰", color: "#6B7280" },
  { id: "sports", name: "Sports", icon: "⚽", color: "#059669" },
  { id: "music", name: "Music", icon: "🎵", color: "#7C3AED" },
  { id: "comedy", name: "Comedy", icon: "😂", color: "#DC2626" },
] as const;

// Duration filters
export const DURATION_FILTERS = [
  { id: "short", label: "Under 30 min", min: 0, max: 1800 },
  { id: "medium", label: "30-60 min", min: 1800, max: 3600 },
  { id: "long", label: "Over 60 min", min: 3600, max: Infinity },
] as const;

// Sort options
export const SORT_OPTIONS = [
  { id: "relevance", label: "Most Relevant" },
  { id: "rating", label: "Highest Rated" },
  { id: "newest", label: "Newest First" },
  { id: "oldest", label: "Oldest First" },
  { id: "popular", label: "Most Popular" },
  { id: "duration", label: "Duration" },
] as const;

// Local storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: "podcast-app-preferences",
  LISTENING_HISTORY: "podcast-app-history",
  PLAYLISTS: "podcast-app-playlists",
  FAVORITES: "podcast-app-favorites",
  RECENT_SEARCHES: "podcast-app-recent-searches",
  AUDIO_PLAYER_STATE: "podcast-app-player-state",
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNAUTHORIZED: "You need to be logged in to perform this action.",
  FORBIDDEN: "You do not have permission to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER_ERROR: "Something went wrong on our end. Please try again.",
  VALIDATION_ERROR: "Please check your input and try again.",
  UPLOAD_ERROR: "Failed to upload file. Please try again.",
  AUDIO_ERROR: "Failed to load audio. Please check the file format.",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  PODCAST_ADDED: "Podcast added to your library",
  PODCAST_REMOVED: "Podcast removed from your library",
  PLAYLIST_CREATED: "Playlist created successfully",
  PLAYLIST_UPDATED: "Playlist updated successfully",
  PLAYLIST_DELETED: "Playlist deleted successfully",
  EPISODE_DOWNLOADED: "Episode downloaded successfully",
  PROFILE_UPDATED: "Profile updated successfully",
  SETTINGS_SAVED: "Settings saved successfully",
} as const;

// Social media links
export const SOCIAL_LINKS = {
  TWITTER: "https://twitter.com/podcastapp",
  FACEBOOK: "https://facebook.com/podcastapp",
  INSTAGRAM: "https://instagram.com/podcastapp",
  YOUTUBE: "https://youtube.com/podcastapp",
  LINKEDIN: "https://linkedin.com/company/podcastapp",
} as const;

// Feature flags
export const FEATURES = {
  ENABLE_DOWNLOADS: true,
  ENABLE_SOCIAL_SHARING: true,
  ENABLE_COMMENTS: false,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_DARK_MODE: true,
  ENABLE_OFFLINE_MODE: false,
} as const;
