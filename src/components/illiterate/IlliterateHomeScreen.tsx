import { Volume2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { BottomNavbar } from '../shared/BottomNavbar';

interface IlliterateHomeScreenProps {
  onNavigateToBooking: () => void;
  onNavigateToParcel?: () => void;
  onBack?: () => void;
}

export function IlliterateHomeScreen({ onNavigateToBooking, onNavigateToParcel, onBack }: IlliterateHomeScreenProps) {
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);

  const playAudio = (action: string, text: string) => {
    setAudioPlaying(action);
    console.log('Playing audio:', text);
    setTimeout(() => setAudioPlaying(null), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00A859] to-[#008f4a] relative">
      {/* ✅ Top Bar with Back */}
      <div className="bg-[#00A859] px-4 py-3 flex items-center justify-between text-white">
        {onBack && (
          <button
            onClick={onBack}
            className="p-3 hover:bg-white/20 rounded-xl transition-colors min-w-[48px] min-h-[48px]"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        )}
        <h1 className="text-xl font-semibold">Bykea</h1>
        <div className="flex items-center gap-2 text-lg">
          <span>📶</span>
          <span>100%</span>
        </div>
      </div>

      {/* Voice Mode Info */}
      <div className="px-6 py-6 text-center text-white">
        <Volume2 className="h-8 w-8 mx-auto mb-3" />
        <p className="text-2xl font-bold">آواز سے چلائیں</p>
        <p className="text-white/80 mt-1 text-lg">"Safar karna hai ya parcel bhejna hai?"</p>
      </div>

      {/* Large Buttons */}
      <div className="px-6 space-y-6 pb-40">
        {/* Ride Button */}
        <button
          onClick={() => {
            playAudio('ride', 'Safar karna hai');
            setTimeout(() => onNavigateToBooking(), 600);
          }}
          className={`w-full bg-white rounded-3xl p-10 shadow-2xl transition-all hover:scale-105 active:scale-95 ${
            audioPlaying === 'ride' ? 'ring-4 ring-yellow-400 animate-pulse' : ''
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-36 h-36 bg-[#00A859] rounded-3xl flex items-center justify-center">
              <span className="text-8xl">🚖</span>
            </div>
            <span className="text-3xl text-[#00A859] font-bold">سفر</span>
          </div>
        </button>

        {/* Parcel Button */}
        <button
          onClick={() => {
            playAudio('parcel', 'Parcel bhejna hai');
            if (onNavigateToParcel) setTimeout(() => onNavigateToParcel(), 600);
          }}
          className={`w-full bg-white rounded-3xl p-10 shadow-2xl transition-all hover:scale-105 active:scale-95 ${
            audioPlaying === 'parcel' ? 'ring-4 ring-yellow-400 animate-pulse' : ''
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-36 h-36 bg-[#00A859] rounded-3xl flex items-center justify-center">
              <span className="text-8xl">📦</span>
            </div>
            <span className="text-3xl text-[#00A859] font-bold">پارسل</span>
          </div>
        </button>

        {/* Help Button */}
        <button
          onClick={() => playAudio('help', 'Madad chahiye')}
          className={`w-full bg-white rounded-3xl p-10 shadow-2xl transition-all hover:scale-105 active:scale-95 ${
            audioPlaying === 'help' ? 'ring-4 ring-yellow-400 animate-pulse' : ''
          }`}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-36 h-36 bg-[#FF5B00] rounded-3xl flex items-center justify-center">
              <span className="text-8xl">💬</span>
            </div>
            <span className="text-3xl text-[#FF5B00] font-bold">مدد</span>
          </div>
        </button>
      </div>

      {/* Big Mic */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2">
        <button
          onClick={() => playAudio('mic', 'Apni manzil batayein')}
          className="w-24 h-24 rounded-full bg-yellow-400 hover:bg-yellow-300 shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 ring-4 ring-yellow-400/30"
        >
          <Volume2 className="h-12 w-12 text-gray-900" />
        </button>
      </div>

      {/* Bottom Navbar */}
      <BottomNavbar activeTab="home" />
    </div>
  );
}
