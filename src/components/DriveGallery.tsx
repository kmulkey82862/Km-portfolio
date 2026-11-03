import { useEffect, useRef, useState } from 'react';
import { driveGroups, DriveGroup, drivePreview, driveThumb, driveView, PORTFOLIO_FOLDER } from '../content/driveGallery';

function Viewer({ group, start, onClose }: { group: DriveGroup; start: number; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [i, setI] = useState(start);
  const item = group.items[i];
  useEffect(() => {
    const d = ref.current;
    d?.showModal();
    return () => d?.close();
  }, []);
  const go = (delta: number) => setI((n) => (n + delta + group.items.length) % group.items.length);
  return (
    <dialog
      ref={ref}
      className="dviewer"
      aria-label={`${group.client}: ${group.title}`}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      <div className="dviewer__stage">
        {item.kind === 'video' ? (
          <iframe key={item.id} src={drivePreview(item.id)} title={item.title} allow="autoplay; fullscreen" allowFullScreen />
        ) : (
          <img key={item.id} src={driveThumb(item.id, 1800)} alt={item.title} />
        )}
      </div>
      <div className="dviewer__bar">
        <div>
          <strong>{item.title}</strong>
          <div className="dviewer__meta">
            {group.client} · {group.title} · {i + 1} of {group.items.length}
          </div>
        </div>
        <div className="dviewer__nav">
          <a href={driveView(item.id)} target="_blank" rel="noopener noreferrer" className="dviewer__open">
            Open in Drive ↗
          </a>
          <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Previous">
            ←
          </button>
          <button type="button" className="icon-btn" onClick={() => go(1)} aria-label="Next">
            →
          </button>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default function DriveGallery({ groups, folderLink = false }: { groups: string[]; folderLink?: boolean }) {
  const list = groups.map((id) => driveGroups.find((g) => g.id === id)).filter((g): g is DriveGroup => !!g);
  const [open, setOpen] = useState<{ group: DriveGroup; index: number } | null>(null);
  return (
    <div className="dgallery">
      {list.map((g) => (
        <section key={g.id} className="dgroup reveal" aria-labelledby={`dg-${g.id}`}>
          <header className="dgroup__head">
            <div>
              <p className="dgroup__client">{g.client}</p>
              <h3 id={`dg-${g.id}`} className="dgroup__title">
                {g.title}
              </h3>
              {g.note && <p className="dgroup__note">{g.note}</p>}
            </div>
            <span className="dgroup__count">
              {g.items.length} {g.items.length === 1 ? 'piece' : 'pieces'}
            </span>
          </header>
          <ul className={`dstrip${g.shape === 'wide' ? ' dstrip--wide' : ''}`}>
            {g.items.map((item, index) => (
              <li key={item.id}>
                <button type="button" className="dthumb" onClick={() => setOpen({ group: g, index })} aria-label={`Open ${item.title}`}>
                  <img src={driveThumb(item.id, 600)} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />
                  {item.kind === 'video' && (
                    <span className="dthumb__play" aria-hidden="true">
                      ▶
                    </span>
                  )}
                </button>
                <span className="dthumb__caption">{item.title}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
      {folderLink && (
      <p className="dgallery__folder">
        <a href={PORTFOLIO_FOLDER} target="_blank" rel="noopener noreferrer">
          Browse the full portfolio folder in Google Drive ↗
        </a>
      </p>
      )}
      {open && <Viewer group={open.group} start={open.index} onClose={() => setOpen(null)} />}
    </div>
  );
}
