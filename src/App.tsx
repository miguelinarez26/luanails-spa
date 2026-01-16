import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { ProjectSlider } from './components/ProjectSlider';
import { ServiceGrid } from './components/ServiceGrid';
import { Footer } from './components/Footer';
import { Cursor } from './components/Cursor';
import { ChatWidget } from './components/ChatWidget';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white cursor-none">
      <Cursor />
      <Header onOpenBooking={() => setIsBookingOpen(true)} />
      <main>
        <Hero />
        <ChatWidget />
        <Intro />
        <ProjectSlider />
        <ServiceGrid />
      </main>
      <Footer />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
}
