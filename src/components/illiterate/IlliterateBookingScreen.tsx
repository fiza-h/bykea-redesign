import { ArrowLeft, Volume2, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { BottomNavbar } from '../shared/BottomNavbar';

export function IlliterateBookingScreen({
  onBack,
  onConfirmRide,
}: {
  onBack: () => void;
  onConfirmRide: (selectedRide: string) => void;
}) {
  const [step, setStep] = useState<'pickup' | 'drop' | 'ride' | 'confirm'>('pickup');
  const [selectedPickup, setSelectedPickup] = useState<string | null>(null);
  const [selectedDrop, setSelectedDrop] = useState<string | null>(null);

  const pickupOptions = [
    { id: 'home', label: '🏠 گھر' },
    { id: 'market', label: '🛍️ مارکیٹ' },
    { id: 'hospital', label: '🏥 اسپتال' },
    { id: 'office', label: '🏢 دفتر' },
    { id: 'current', label: '📍 موجودہ مقام' },
  ];

  const dropOptions = [
    { id: 'bazaar', label: '🛒 بازار' },
    { id: 'school', label: '🏫 اسکول' },
    { id: 'friend', label: '👫 دوست کا گھر' },
    { id: 'mall', label: '🏬 مال' },
  ];

  const rideOptions = [
    { id: 'bike', emoji: '🏍️', name: 'بائیک', price: 150 },
    { id: 'rickshaw', emoji: '🛺', name: 'رکشہ', price: 220 },
    { id: 'car', emoji: '🚗', name: 'کار', price: 350 },
    { id: 'car-ac', emoji: '🚙', name: 'کار AC', price: 450 },
  ];

  const handlePickupSelect = (id: string) => {
    setSelectedPickup(id);
    setTimeout(() => setStep('drop'), 400);
  };

  const handleDropSelect = (id: string) => {
    setSelectedDrop(id);
    setTimeout(() => setStep('ride'), 400);
  };

  const handleRideSelect = (rideId: string) => {
    setStep('confirm');
    setTimeout(() => onConfirmRide(rideId), 1200); // ⏳ short pause before confirmation screen
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00A859] to-[#008f4a] text-white flex flex-col justify-between">
      {/* Header */}
      <div className="bg-[#00A859] px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-3 hover:bg-white/20 rounded-xl transition-colors min-w-[48px] min-h-[48px]"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">Bykea Ride</h1>
        <div className="flex items-center gap-2">
          <span>📶</span>
          <span>100%</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
        {step === 'pickup' && (
          <>
            <Volume2 className="h-16 w-16 mb-4" />
            <p className="text-3xl mb-6 font-bold">اپنا مقام منتخب کریں</p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {pickupOptions.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePickupSelect(p.id)}
                  className="bg-white text-[#00A859] text-2xl font-bold rounded-3xl py-5 shadow-xl hover:scale-105 transition-all"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 'drop' && (
          <>
            <Volume2 className="h-16 w-16 mb-4" />
            <p className="text-3xl mb-6 font-bold">اپنی منزل منتخب کریں</p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {dropOptions.map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleDropSelect(d.id)}
                  className="bg-white text-[#00A859] text-2xl font-bold rounded-3xl py-5 shadow-xl hover:scale-105 transition-all"
                >
                  {d.label}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 'ride' && (
          <>
            <Volume2 className="h-16 w-16 mb-4" />
            <p className="text-3xl mb-6 font-bold">اپنی سواری منتخب کریں</p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {rideOptions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleRideSelect(r.id)}
                  className="bg-white text-[#00A859] rounded-3xl p-5 shadow-xl hover:scale-105 transition-all flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-6xl">{r.emoji}</span>
                  <span className="text-2xl font-bold">{r.name}</span>
                  <span className="text-lg text-gray-700">Rs. {r.price}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 'confirm' && (
          <>
            <CheckCircle className="h-20 w-20 text-yellow-400 mb-6 animate-bounce" />
            <p className="text-3xl font-bold">آپ کی سواری منتخب ہو گئی!</p>
            <p className="text-xl text-white/90 mt-3">تصدیق ہو رہی ہے...</p>
          </>
        )}
      </div>

      <BottomNavbar activeTab="home" />
    </div>
  );
}
