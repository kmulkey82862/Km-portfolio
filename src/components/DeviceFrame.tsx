import { useState } from 'react';

type Props = {
  title: string;
  /** Full HTML document to render. */
  html?: string;
  /** Or a same-origin URL (e.g. /media/html/email.html). */
  src?: string;
  defaultDevice?: 'desktop' | 'mobile';
};

/** Renders an HTML email or page in a sandboxed iframe with a desktop/mobile toggle. */
export default function DeviceFrame({ title, html, src, defaultDevice = 'desktop' }: Props) {
  const [device, setDevice] = useState(defaultDevice);
  return (
    <div className={`device device--${device}`}>
      <div className="device__bar">
        <span className="device__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="device__title">{title}</span>
        <div className="device__toggle" role="group" aria-label="Preview size">
          {(['desktop', 'mobile'] as const).map((d) => (
            <button key={d} type="button" aria-pressed={device === d} onClick={() => setDevice(d)}>
              {d === 'desktop' ? 'Desktop' : 'Mobile'}
            </button>
          ))}
        </div>
      </div>
      <div className="device__stage">
        {/* No allow-scripts: emails never need them, and this keeps embedded HTML inert. */}
        <iframe title={title} sandbox="allow-popups" srcDoc={html} src={html ? undefined : src} loading="lazy" />
      </div>
    </div>
  );
}
