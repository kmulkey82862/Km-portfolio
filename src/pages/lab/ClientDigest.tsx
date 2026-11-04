import { useState } from 'react';
import LabShell from '../../components/LabShell';
import DeviceFrame from '../../components/DeviceFrame';
import { DIGESTS, DigestId } from '../../content/digests';

export default function ClientDigest() {
  const [active, setActive] = useState<DigestId>('team');
  const d = DIGESTS[active];
  return (
    <LabShell slug="client-digest">
      <div className="dg-tabs" role="tablist" aria-label="Digests">
        {(Object.keys(DIGESTS) as DigestId[]).map((id) => (
          <button key={id} type="button" role="tab" aria-selected={active === id} onClick={() => setActive(id)}>
            <span className="emails__type">{DIGESTS[id].cadence}</span>
            {DIGESTS[id].label}
          </button>
        ))}
      </div>
      <div className="tool">
        <div className="tool__controls dg-panel">
          <div>
            <h2 className="aside-h">What it reads</h2>
            <ul className="chips">
              {d.reads.map((r) => (
                <li key={r} className="chip">
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="aside-h">What it does</h2>
            <ul className="dg-list">
              {d.does.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="aside-h">Why it matters</h2>
            <p className="dg-why">{d.why}</p>
          </div>
          <p className="muted dg-fine">Client names and people are placeholder aliases. Shown as the email would arrive.</p>
        </div>
        <div className="tool__preview">
          <DeviceFrame key={active} title={d.label} html={d.build()} />
        </div>
      </div>
    </LabShell>
  );
}
