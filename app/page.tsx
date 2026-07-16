"use client"

import React from 'react';
import { Header } from '../src/components/Header';
import { Hero } from '../src/components/Hero';
import { QuienesSomos } from '../src/components/QuienesSomos';
import { ServiceGrid } from '../src/components/ServiceGrid';
import { Footer } from '../src/components/Footer';
import { Cursor } from '../src/components/Cursor';

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-dark font-sans selection:bg-black selection:text-white cursor-none">
      <Cursor />
      <Header />
      <main>
        <Hero />
        <QuienesSomos />
        <ServiceGrid />
      </main>
      <Footer />
    </div>
  );
}
