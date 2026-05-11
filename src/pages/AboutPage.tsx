import { Helmet } from 'react-helmet-async';
import { About } from '../components/About';

export function AboutPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>About — Pradeep C</title>
        <meta
          name="description"
          content="Background, focus radar, and capability map for Pradeep C — full-stack developer specialising in React, Node.js, and cloud-native delivery from Chennai."
        />
        <link rel="canonical" href="https://pradeepc.dev/about" />
      </Helmet>
      <div className="pt-16 md:pt-20">
        <About />
      </div>
    </>
  );
}
