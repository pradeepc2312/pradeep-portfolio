import { Helmet } from 'react-helmet-async';
import { Contact } from '../components/Contact';

export function ContactPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Contact — Pradeep C</title>
        <meta
          name="description"
          content="Email and social links for Pradeep C. Open to work for Q3 2025 — freelance and full-time conversations welcome."
        />
        <link rel="canonical" href="https://pradeepc.dev/contact" />
      </Helmet>
      <div className="pt-16 md:pt-20">
        <Contact />
      </div>
    </>
  );
}
