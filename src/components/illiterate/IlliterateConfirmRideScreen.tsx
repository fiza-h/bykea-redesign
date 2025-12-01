import { ArrowLeft, Volume2, CheckCircle, XCircle, MapPin, Mic } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BottomNavbar } from '../shared/BottomNavbar';

interface IlliterateConfirmRideScreenProps {
  onBack: () => void;
  onConfirm: () => void;
  fareType: string;
  pickup?: string;
  destination?: string;
}

export function IlliterateConfirmRideScreen({
  onBack,
  onConfirm,
  fareType,
  pickup = '🏠 گھر',
  destination = '🏬 بازار',
}: IlliterateConfirmRideScreenProps) {
  const fareDetails: Record<string, any> = {
    bike: { icon: '🏍️', name: 'بائیک', price: 150 },
    rickshaw: { icon: '🛺', name: 'رکشہ', price: 220 },
    car: { icon: '🚗', name: 'کار', price: 350 },
    'car-ac': { icon: '🚙', name: 'کار AC', price: 450 },
  };

  const selectedFare = fareDetails[fareType] || fareDetails.car;
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Auto-confirm after 5s
    const timer =
      countdown > 0
        ? setTimeout(() => setCountdown((c) => c - 1), 1000)
        : (onConfirm(), null);
    return () => clearTimeout(timer as any);
  }, [countdown]);

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
        <h1 className="text-lg font-bold">سواری کی تصدیق</h1>
        <div className="flex items-center gap-2 text-lg">
          <span>📶</span>
          <span>100%</span>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 space-y-6">
        {/* Voice Cue */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <Volume2 className="h-10 w-10 text-yellow-300 animate-pulse" />
          <p className="text-3xl font-bold">اپنی سواری کی تصدیق کریں</p>
        </div>

        {/* Ride Summary */}
        <div className="bg-white/20 p-6 rounded-3xl shadow-xl w-full max-w-sm">
          <div className="flex flex-col items-center gap-4">
            <span className="text-7xl">{selectedFare.icon}</span>
            <p className="text-2xl font-bold">{selectedFare.name}</p>
            <p className="text-3xl text-yellow-300 font-bold">
              💰 کرایہ: Rs. {selectedFare.price}
            </p>

            <div className="w-full bg-white/10 p-4 rounded-2xl text-left text-white space-y-2">
              <p className="text-xl">🟢 مقام: {pickup}</p>
              <p className="text-xl">🟣 منزل: {destination}</p>
            </div>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex flex-col items-center mt-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-2">
            <span className="text-4xl font-bold">{countdown}</span>
          </div>
          <p className="text-xl text-white/80">تصدیق خود بخود ہوگی...</p>
        </div>

        {/* Confirm / Cancel Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-sm mt-4">
          <button
            onClick={onConfirm}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-3xl py-5 text-2xl font-bold shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
          >
            ✅ تصدیق کریں
          </button>
          <button
            onClick={onBack}
            className="w-full bg-white/20 hover:bg-white/30 text-white rounded-3xl py-5 text-2xl font-bold shadow-lg flex items-center justify-center gap-2"
          >
            ❌ منسوخ کریں
          </button>
        </div>
      </div>

      {/* Bottom Navbar */}
      <BottomNavbar activeTab="home" />
    </div>
  );
}
