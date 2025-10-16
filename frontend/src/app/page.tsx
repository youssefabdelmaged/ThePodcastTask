import PodcastPlatform from '@/components/PodcastPlatform';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Podcastr - Portuguese Podcast Streaming Platform',
  description: 'Discover and stream the best Portuguese podcasts with Podcastr. Browse programming content, tech talks, and diverse audio content with our intuitive platform featuring recent episodes and integrated player.',
  keywords: 'portuguese podcasts, podcast streaming, programming podcasts, tech content, audio streaming, podcast platform, episode discovery, podcast player',
  
  openGraph: {
    title: 'Podcastr - Portuguese Podcast Streaming Platform',
    description: 'Stream Portuguese podcasts seamlessly with Podcastr. Discover programming content, tech discussions, and more with our modern podcast platform featuring episode highlights and integrated playback.',
  }
}

export default function Page() {
  return <PodcastPlatform />
}