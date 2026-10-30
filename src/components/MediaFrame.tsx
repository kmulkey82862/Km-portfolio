import { useEffect, useRef, useState } from 'react';
import { getMedia, Media } from '../lib/media';

type Props = {
  id: string;
  sizes?: string;
  className?: string;
  /** Autoplay muted loops when visible (respects reduced motion). */
  autoplay?: boolean;
  /** Shown when the media hasn't been imported yet. */
  fallbackLabel?: string;
};

function Placeholder({ id, label }: { id: string; label?: string }) {
  return (
    <div className="media-ph" role="img" aria-label={label ?? 'Image coming soon'}>
      <span className="media-ph__label">{label}</span>
      {import.meta.env.DEV && <code className="media-ph__id">media: {id}</code>}
    </div>
  );
}

function LoopVideo({ media, autoplay }: { media: Extract<Media, { type: 'video' }>; autoplay: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const el = ref.current;
    if (!el || !media.loop || !autoplay || reduced) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [media.loop, autoplay, reduced]);

  if (!media.loop) {
    return <img src={media.poster} alt={media.alt} width={media.width} height={media.height} loading="lazy" decoding="async" />;
  }
  return (
    <video
      ref={ref}
      src={media.loop}
      poster={media.poster}
      muted
      loop
      playsInline
      preload="none"
      controls={reduced || !autoplay}
      aria-label={media.alt}
      width={media.width}
      height={media.height}
    />
  );
}

export default function MediaFrame({ id, sizes = '(max-width: 760px) 100vw, 50vw', className, autoplay = true, fallbackLabel }: Props) {
  const media = getMedia(id);
  const cls = `media${className ? ` ${className}` : ''}`;
  if (!media) {
    return (
      <div className={cls}>
        <Placeholder id={id} label={fallbackLabel} />
      </div>
    );
  }
  if (media.type === 'image') {
    return (
      <div className={cls} style={media.blur ? { backgroundImage: `url(${media.blur})` } : undefined}>
        <picture>
          <source type="image/avif" srcSet={media.srcset.avif} sizes={sizes} />
          <source type="image/webp" srcSet={media.srcset.webp} sizes={sizes} />
          <img src={media.src} alt={media.alt} width={media.width} height={media.height} loading="lazy" decoding="async" />
        </picture>
      </div>
    );
  }
  if (media.type === 'video') {
    return (
      <div className={cls}>
        <LoopVideo media={media} autoplay={autoplay} />
      </div>
    );
  }
  return (
    <div className={cls}>
      {media.poster ? <img src={media.poster} alt={media.alt} loading="lazy" /> : <Placeholder id={id} label={media.alt} />}
    </div>
  );
}

export function hasMedia(id: string) {
  return Boolean(getMedia(id));
}
