import React from 'react';
import Hero from '@/components/Home/Hero';
import Features from '@/components/Home/Features';
import Stats from '@/components/Home/Stats';
import About from '@/components/Home/About';
import Team from '@/components/Home/Team';
import Contact from '@/components/Home/Contact';
import Testimonials from '@/components/Home/Testimonials';
import CTA from '@/components/Home/CTA';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
        <Hero />
        <Features />
        <Stats />
        <About />
        <Testimonials />
        <Team />
        <CTA />
        <Contact />
    </div>
  );
}
