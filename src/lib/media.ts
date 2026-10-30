import manifest from '../content/media.generated.json';

export type ImageMedia = {
  type: 'image';
  alt: string;
  width: number;
  height: number;
  src: string;
  srcset: { avif: string; webp: string };
  blur?: string;
};

export type VideoMedia = {
  type: 'video';
  alt: string;
  width: number;
  height: number;
  poster: string;
  loop?: string; // short muted web loop, shipped with the site
  full?: string; // full-length video hosted elsewhere (Bunny Stream, etc.)
};

export type DocMedia = {
  type: 'pdf' | 'html';
  alt: string;
  src: string;
  poster?: string;
};

export type Media = ImageMedia | VideoMedia | DocMedia;

const media = manifest as Record<string, Media>;

export function getMedia(id: string | undefined): Media | undefined {
  return id ? media[id] : undefined;
}
