import React, { useState } from 'react';
import { X, Check, Calendar, Clock, Car, MapPin, Sparkles, Shield, DollarSign, ArrowRight } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
}

const VEHICLE_TYPES = [
  { id: 'coupe-sedan', name: 'Sedan / Coupe', sub: 'M3, C63, Sentinel, Sultan', mult: 1.0 },
  { id: 'muscle-lowrider', name: 'Muscle / Lowrider', sub: 'Voodoo, Buccaneer, Challenger', mult: 1.0 },
  { id: 'suv-truck', name: 'SUV / 4x4 Truck', sub: 'Huntley, G-Wagon, Landstalker', mult: 1.2 },
  { id: 'exotic-supercar', name: 'Exotic / Supercar', sub: 'Infernus, Bullet, GT3, Huracan', mult: 1.25 },
];

const PACKAGES = [
  { id: 'foam-wash', name: 'Full Body Foam Wash', basePrice: 65, time: '45 min' },
  { id: 'rims-tires', name: 'Rims & Tire Detailing', basePrice: 85, time: '35 min' },
  { id: 'interior-resto', name: 'Interior Restoration', basePrice: 110, time: '60 min' },
  { id: 'master-bundle', name: 'San Andreas Master Bundle', basePrice: 220, time: '120 min' },
];

const LOCATIONS = [
  { id: 'ganton', name: 'Ganton Bay #1 (Grove St)', type: 'Workshop Bay' },
  { id: 'vinewood', name: 'Vinewood Detailing Lab', type: 'Private Studio' },
  { id: 'rodeo-mobile', name: 'Rodeo Mobile Squad', type: 'We Come To You' },
  { id: 'santamaria', name: 'Santa Maria Bay', type: 'Express Tunnel' },
];

const ADDONS = [
  { id: 'ceramic-shield', name: 'Hydrophobic Ceramic Windshield Shield', price: 25 },
  { id: 'engine-bay', name: 'Under-Hood Engine Bay Foam & Dressing', price: 45 },
  { id: 'leather-balm', name: '2-Stage Matte Leather Nourishing Balm', price: 35 },
  { id: 'scent', name: 'Signature G-Funk Vanilla / Black Ice Mist', price: 10 },
];

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId = 'foam-wash',
}) => {
  const [vehicleType, setVehicleType] = useState('coupe-sedan');
  const [selectedPackage, setSelectedPackage] = useState(initialServiceId);
  const [selectedLocation, setSelectedLocation] = useState('ganton');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('11:00 AM');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [carModel, setCarModel] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const currentPkg = PACKAGES.find((p) => p.id === selectedPackage) || PACKAGES[0];
  const vehicleObj = VEHICLE_TYPES.find((v) => v.id === vehicleType) || VEHICLE_TYPES[0];

  const addonsTotal = selectedAddons.reduce((acc, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    return acc + (addon ? addon.price : 0);
  }, 0);

  const calculatedTotal = Math.round(currentPkg.basePrice * vehicleObj.mult + addonsTotal);

  const toggleAddon = (id: string) => {
    soundEngine.playClick();
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playMissionPassed();
    const ref = `SA-${Math.floor(1000 + Math.random() * 9000)}-CJ`;
    setBookingRef(ref);
    setIsSuccess(true);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-zinc-950 border-4 border-yellow-400 shadow-[0_0_50px_rgba(255,230,0,0.4)] text-white overflow-hidden my-8">
        {/* Top Header Bar */}
        <div className="bg-yellow-400 text-black px-6 py-3 flex items-center justify-between font-bebas">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-black rounded-full animate-ping" />
            <span className="text-xl sm:text-2xl tracking-wider font-extrabold uppercase">
              SAN ANDREAS DETAIL DISPATCH • BOOK YOUR RIDE
            </span>
          </div>
          <button
            onClick={resetAndClose}
            className="text-black hover:bg-black hover:text-yellow-400 p-1 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {isSuccess ? (
          /* MISSION PASSED - GTA CELEBRATION SCREEN */
          <div className="p-8 sm:p-12 text-center bg-black animate-mission-in">
            <div className="inline-block bg-yellow-400 text-black px-4 py-1 font-bebas text-sm font-bold tracking-widest uppercase mb-4 shadow-[0_0_20px_#FFE600]">
              DISPATCH CONFIRMED
            </div>

            <h2 className="gta-headline-yellow text-5xl sm:text-7xl font-black uppercase tracking-tight mb-2">
              MISSION PASSED!
            </h2>
            <div className="font-bebas text-3xl sm:text-4xl text-white tracking-widest uppercase mb-6">
              RESPECT + 100
            </div>

            {/* Ticket Card */}
            <div className="bg-zinc-950 border-2 border-yellow-400 max-w-md mx-auto p-6 text-left my-6 shadow-[0_0_30px_rgba(255,230,0,0.2)]">
              <div className="flex justify-between items-center border-b border-yellow-400/40 pb-3 mb-4">
                <span className="font-mono text-xs text-zinc-400">DISPATCH REF:</span>
                <span className="font-mono text-yellow-400 font-bold text-lg">{bookingRef}</span>
              </div>

              <div className="space-y-2 text-sm font-sans">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Owner:</span>
                  <span className="font-bold text-white">{ownerName || 'CJ Johnson'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Vehicle:</span>
                  <span className="font-bold text-white">{carModel || vehicleObj.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Detail Service:</span>
                  <span className="font-bold text-yellow-400">{currentPkg.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Location Bay:</span>
                  <span className="font-bold text-white">
                    {LOCATIONS.find((l) => l.id === selectedLocation)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Appointment:</span>
                  <span className="font-bold text-white">{date} at {time}</span>
                </div>
                <div className="flex justify-between border-t border-zinc-800 pt-3 mt-3">
                  <span className="text-zinc-300 font-bebas text-lg">TOTAL BILLED:</span>
                  <span className="font-pricedown text-2xl text-yellow-400">${calculatedTotal}</span>
                </div>
              </div>
            </div>

            <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto mb-8 font-sans">
              Our Los Santos crew has reserved your detail bay. Bring your ride in or watch for our mobile squad van. Quality is the Difference!
            </p>

            <button
              onClick={resetAndClose}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bebas text-2xl px-10 py-3 uppercase tracking-wider font-black border-2 border-black shadow-[0_0_20px_rgba(255,230,0,0.5)]"
            >
              RETURN TO SHOWROOM
            </button>
          </div>
        ) : (
          /* BOOKING FORM */
          <form onSubmit={handleBookingSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Step 1: Vehicle Type */}
            <div>
              <label className="block font-bebas text-lg text-yellow-400 uppercase tracking-wider mb-2">
                1. SELECT YOUR VEHICLE CATEGORY
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {VEHICLE_TYPES.map((v) => (
                  <button
                    type="button"
                    key={v.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setVehicleType(v.id);
                    }}
                    className={`p-3 text-left border-2 transition-all cursor-pointer ${
                      vehicleType === v.id
                        ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400 shadow-[0_0_15px_rgba(255,230,0,0.2)]'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="font-bebas text-lg tracking-wide flex items-center justify-between">
                      <span>{v.name}</span>
                      {vehicleType === v.id && <Check className="w-4 h-4 text-yellow-400" />}
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono mt-0.5">{v.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Detailing Service Package */}
            <div>
              <label className="block font-bebas text-lg text-yellow-400 uppercase tracking-wider mb-2">
                2. CHOOSE DETAIL PACKAGE
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PACKAGES.map((pkg) => (
                  <button
                    type="button"
                    key={pkg.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedPackage(pkg.id);
                    }}
                    className={`p-3 text-left border-2 transition-all cursor-pointer ${
                      selectedPackage === pkg.id
                        ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400 shadow-[0_0_15px_rgba(255,230,0,0.2)]'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-bebas text-lg tracking-wide">{pkg.name}</span>
                      <span className="font-pricedown text-xl text-yellow-400">
                        ${Math.round(pkg.basePrice * vehicleObj.mult)}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 font-mono mt-1">Est: {pkg.time}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Location Bay */}
            <div>
              <label className="block font-bebas text-lg text-yellow-400 uppercase tracking-wider mb-2">
                3. SERVICE LOCATION / DETAIL BAY
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {LOCATIONS.map((loc) => (
                  <button
                    type="button"
                    key={loc.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setSelectedLocation(loc.id);
                    }}
                    className={`p-2.5 text-left border transition-all cursor-pointer ${
                      selectedLocation === loc.id
                        ? 'border-yellow-400 bg-yellow-400 text-black font-bold'
                        : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <div className="font-bebas text-sm leading-tight">{loc.name}</div>
                    <div className={`text-[10px] font-mono ${selectedLocation === loc.id ? 'text-black/80' : 'text-zinc-500'}`}>
                      {loc.type}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Add-Ons */}
            <div>
              <label className="block font-bebas text-lg text-yellow-400 uppercase tracking-wider mb-2">
                4. WEST COAST ADD-ONS (OPTIONAL)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ADDONS.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      type="button"
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-2.5 text-left border flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="text-xs font-sans font-medium">{addon.name}</div>
                      <div className="font-mono text-xs font-bold text-yellow-400 ml-2 whitespace-nowrap">
                        +${addon.price}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Schedule & Client Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">DATE</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-white font-mono text-sm focus:border-yellow-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">TIME SLOT</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-white font-mono text-sm focus:border-yellow-400 focus:outline-none"
                >
                  <option>09:00 AM</option>
                  <option>11:00 AM</option>
                  <option>01:30 PM</option>
                  <option>03:30 PM</option>
                  <option>06:00 PM</option>
                  <option>08:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">DRIVER / OWNER NAME</label>
                <input
                  type="text"
                  placeholder="e.g. Carl Johnson"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-white font-sans text-sm focus:border-yellow-400 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">PHONE NUMBER</label>
                <input
                  type="tel"
                  placeholder="e.g. (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-white font-mono text-sm focus:border-yellow-400 focus:outline-none"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-zinc-400 mb-1">
                  VEHICLE MAKE, MODEL & COLOR
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2024 Black BMW M3 Competition / Custom Black Rims"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-white font-sans text-sm focus:border-yellow-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Total and Submit CTA */}
            <div className="pt-4 border-t-2 border-yellow-400/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-zinc-400 font-mono">ESTIMATED TOTAL:</div>
                <div className="font-pricedown text-4xl text-yellow-400">${calculatedTotal}</div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-black font-bebas text-2xl px-10 py-3.5 uppercase tracking-wider font-black border-2 border-black shadow-[0_0_25px_rgba(255,230,0,0.5)] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>CONFIRM RIDE BOOKING</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
