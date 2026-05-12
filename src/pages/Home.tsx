import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { About } from '../components/About';
import { Contact } from '../components/Contact';
import { Hero } from '../components/Hero';
import { Skills } from '../components/Skills';
import { TechStack } from '../components/TechStack';
import { WorkGrid } from '../components/WorkGrid';

export function Home(): JSX.Element {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#work') {
      const el = document.getElementById('work');
      window.requestAnimationFrame(() => {
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [location.hash, location.pathname]);

  return (
    <>
      <Helmet>
        <title>{'Pradeep C — Full-stack developer & creative engineer'}</title>
        <meta
          name="description"
          content="Pradeep C builds React and Node.js systems from Chennai: cloud-native apps, developer tooling, and performance-minded interfaces. Open to freelance and full-time roles."
        />
        <link rel="canonical" href="https://pradeepc.dev/" />
      </Helmet>
      <Hero />
      <About id="about" />
      <Skills id="skills" />
      <WorkGrid id="work" />
      <TechStack />
      <Contact />
    </>
  );
}
