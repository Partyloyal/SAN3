import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { TenAreasSection } from './components/TenAreasSection';
import { AboutBrand } from './components/AboutBrand';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState('foam-wash');

  const handleOpenBooking = (serviceId = 'foam-wash') => {
    setSelectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-yellow-400 selection:text-black">
      {/* GTA San Andreas Top Navigation */}
      <Navbar onOpenBooking={() => handleOpenBooking('foam-wash')} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section: "IT ALL STARTS HERE" */}
        <Hero onOpenBooking={() => handleOpenBooking('foam-wash')} />

        {/* 2. Services Section: "PREP DONE RIGHT. RESULTS DONE BETTER." */}
        <Services onSelectService={(serviceId) => handleOpenBooking(serviceId)} />

        {/* 2b. Results / Before & After Detailing Comparison Slider */}
        <BeforeAfterSlider />

        {/* 2c. 10 Areas Most People Never Clean (As requested by user) */}
        <TenAreasSection onOpenBooking={() => handleOpenBooking('interior-resto')} />

        {/* 3. About / Brand Section: San Andreas Badge, Slogan "Quality is the Difference" */}
        <AboutBrand />
      </main>

      {/* 4. Footer: Solid Black, Bright Yellow, Fictional Los Santos Address */}
      <Footer />

      {/* Interactive Booking Modal with Mission Passed GTA Screen */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialServiceId={selectedServiceId}
      />
    </div>
  );
}
