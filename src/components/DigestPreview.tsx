import { useState } from 'react';
import { Link } from 'react-router-dom';
import DeviceFrame from './DeviceFrame';
import { DIGESTS, DigestId } from '../content/digests';

// The three automated digests as they arrive, on sample data, in the AI section.
export default function DigestPreview() {
  const [active, setActive] = useState<DigestId>('team');
  const d = DIGESTS[active];
  return (
    <div className="dpreview">
      <div className="dg-tabs" role="tablist" aria-label="Digests">
        {(Object.keys(DIGESTS) as DigestId[]).map((id) => (
          <button key={id} type="button" role="tab" aria-selected={active === id} onClick={() => setActive(id)}>
            <span className="emails__type">{DIGESTS[id].cadence}</span>
            {DIGESTS[id].label}
          </button>
        ))}
      </div>
      <p className="dpreview__why">{d.why}</p>
      <DeviceFrame key={active} title={d.label} html={d.build()} />
      <p className="muted dpreview__fine">
        Client names and people are placeholder aliases. <Link to="/lab/client-digest">What each digest reads and does →</Link>
      </p>
    </div>
  );
}
