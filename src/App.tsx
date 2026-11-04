import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Tool demos are split out so the homepage stays light.
const Resume = lazy(() => import('./pages/Resume'));
const SpeakerGraphic = lazy(() => import('./pages/lab/SpeakerGraphic'));
const LogoResizer = lazy(() => import('./pages/lab/LogoResizer'));
const ClientDigest = lazy(() => import('./pages/lab/ClientDigest'));
const SessionArchive = lazy(() => import('./pages/lab/SessionArchive'));

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section exists after navigation.
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <Layout>
      <ScrollManager />
      <Suspense fallback={<div className="wrap" style={{ padding: '120px 0' }} aria-busy="true" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/lab" element={<Navigate to="/#tools" replace />} />
          <Route path="/lab/speaker-graphic" element={<SpeakerGraphic />} />
          <Route path="/lab/logo-resizer" element={<LogoResizer />} />
          <Route path="/lab/client-digest" element={<ClientDigest />} />
          <Route path="/lab/session-archive" element={<SessionArchive />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
