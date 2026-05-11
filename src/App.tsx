import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Route, Routes, useLocation, Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Nav } from './components/Nav';
import { pageFadeTransition } from './lib/motionPresets';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { Home } from './pages/Home';
import { WorkDetail } from './pages/WorkDetail';

function AnimatedOutlet(): JSX.Element {
  const location = useLocation();
  const reduce = useReducedMotion() ?? false;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className="min-h-[50vh] bg-bg"
        initial={{ opacity: reduce ? 1 : 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: reduce ? 1 : 0 }}
        transition={pageFadeTransition(reduce, 0.2)}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

export default function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <main>
        <Routes>
          <Route element={<AnimatedOutlet />}>
            <Route index element={<Home />} />
            <Route path="work/:slug" element={<WorkDetail />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
