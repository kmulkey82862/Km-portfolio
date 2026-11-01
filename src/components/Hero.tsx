import { profile } from '../content/profile';
import { Daisy, Rose, Sparkle, Tulip } from './Flowers';

// Single descriptors, taken from the résumé's skills.
const DESCRIPTORS = [
  { label: 'AI enablement', tone: 'icy' },
  { label: 'Workflow automation', tone: 'blush' },
  { label: 'Systems integration', tone: 'olive' },
  { label: 'Website development', tone: 'mulberry' },
  { label: 'Data analytics', tone: 'icy' },
  { label: 'Digital strategy', tone: 'blush' },
];

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero__title">
        <Daisy className="fl fl--daisy" />
        <Sparkle className="fl fl--spark1" color="#d0342c" />
        <h1 className="hname">
          <span className="hname__first">{profile.firstName}</span> {profile.lastName}’s
          <span className="hname__portfolio">Portfolio</span>
        </h1>
        <Rose className="fl fl--rose" />
        <Tulip className="fl fl--tulip" />
        <Daisy className="fl fl--daisy2" petal="#ffffff" center="#f3c4d2" />
        <Sparkle className="fl fl--spark2" color="#7f7c1e" />
      </div>
      <ul className="descriptors" aria-label="What’s in this portfolio">
        {DESCRIPTORS.map((d) => (
          <li key={d.label} className={`descriptor descriptor--${d.tone}`}>
            {d.label}
          </li>
        ))}
      </ul>
    </header>
  );
}
