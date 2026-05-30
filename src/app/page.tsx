import Hero from '@/sections/Hero/Hero';
import Services from '@/sections/Services/Services';
import About from '@/sections/About/About';
import Team from '@/sections/Team/Team';
import Testimonials from '@/sections/Testimonials/Testimonials';
import Contact from '@/sections/Contact/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Team />
      <Services />
      <Testimonials />
      <Contact />
    </>
  );
}
