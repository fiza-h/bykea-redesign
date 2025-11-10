import { Volume2, Home, FileText, Wallet, User } from 'lucide-react';
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
    // Simulate audio playback
    console.log('Playing audio:', text);
    setTimeout(() => setAudioPlaying(null), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00A859] to-[#008f4a] relative">
      {/* Status Bar */}
      <div className="px-4 py-3 flex items-center justify-between text-white">
        <span className="text-lg">10:00 AM</span>
        <div className="flex items-center gap-2">
          <span>📶</span>
          <span>100%</span>
        </div>
      </div>

      {/* Logo */}
      <div className="px-6 py-8 text-center">
        <h1 className="text-white text-5xl mb-2">Bykea</h1>
        <div className="flex items-center justify-center gap-2 text-white/90">
          <Volume2 className="h-5 w-5" />
          <p className="text-lg">آواز سے چلائیں</p>
        </div>
      </div>

      {/* Audio Prompt */}
      <div className="px-6 mb-8">
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 text-white text-center">
          <Volume2 className="h-12 w-12 mx-auto mb-3" />
          <p className="text-xl">🔊 "اپنے سفر کرنا ہے یا پارسل بھیجنا ہے؟"</p>
          <p className="text-white/80 mt-2">Apne safar karna hai ya parcel bhejna hai?</p>
        </div>
      </div>

      {/* Icon-Only Menu - Centered Icons */}
      <div className="px-6 pb-40">
        <div className="space-y-6">
          {/* Ride */}
          <button
            onClick={() => {
              playAudio('ride', 'Safar karna hai - Ride');
              setTimeout(() => onNavigateToBooking(), 500);
            }}
            className={`w-full bg-white rounded-3xl p-10 shadow-2xl transition-all hover:scale-105 active:scale-95 ${
              audioPlaying === 'ride' ? 'ring-4 ring-yellow-400 animate-pulse' : ''
            }`}
            aria-label="Ride"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-32 h-32 bg-[#00A859] rounded-3xl flex items-center justify-center">
                <span className="text-7xl" role="img" aria-label="Car">🚖</span>
              </div>
              {audioPlaying === 'ride' && (
                <div className="flex items-center gap-2 text-[#00A859]">
                  <Volume2 className="h-8 w-8 animate-pulse" />
                  <span className="text-2xl">سفر</span>
                </div>
              )}
            </div>
          </button>

          {/* Delivery */}
          <button
            onClick={() => {
              playAudio('delivery', 'Parcel bhejna hai - Delivery');
              if (onNavigateToParcel) {
                setTimeout(() => onNavigateToParcel(), 500);
              }
            }}
            className={`w-full bg-white rounded-3xl p-10 shadow-2xl transition-all hover:scale-105 active:scale-95 ${
              audioPlaying === 'delivery' ? 'ring-4 ring-yellow-400 animate-pulse' : ''
            }`}
            aria-label="Delivery"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-32 h-32 bg-[#00A859] rounded-3xl flex items-center justify-center">
                <span className="text-7xl" role="img" aria-label="Package">📦</span>
              </div>
              {audioPlaying === 'delivery' && (
                <div className="flex items-center gap-2 text-[#00A859]">
                  <Volume2 className="h-8 w-8 animate-pulse" />
                  <span className="text-2xl">پارسل</span>
                </div>
              )}
            </div>
          </button>

          {/* Help */}
          <button
            onClick={() => playAudio('help', 'Madad chahiye - Help')}
            className={`w-full bg-white rounded-3xl p-10 shadow-2xl transition-all hover:scale-105 active:scale-95 ${
              audioPlaying === 'help' ? 'ring-4 ring-yellow-400 animate-pulse' : ''
            }`}
            aria-label="Help"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-32 h-32 bg-[#FF5B00] rounded-3xl flex items-center justify-center">
                <span className="text-7xl" role="img" aria-label="Help">💬</span>
              </div>
              {audioPlaying === 'help' && (
                <div className="flex items-center gap-2 text-[#FF5B00]">
                  <Volume2 className="h-8 w-8 animate-pulse" />
                  <span className="text-2xl">مدد</span>
                </div>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Large Microphone Button - Bottom Left */}
      <div className="fixed bottom-24 left-6 z-50">
        <button
          onClick={() => playAudio('mic', 'Apni manzil batayein')}
          className="w-20 h-20 rounded-full bg-yellow-400 hover:bg-yellow-300 shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 ring-4 ring-yellow-400/30"
          aria-label="Voice input"
        >
          <Volume2 className="h-10 w-10 text-gray-900" />
        </button>
      </div>

      {/* Bottom Navigation - Minimal Icons for Illiterate Mode */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md border-t-2 border-white/20 px-6 py-3 max-w-md mx-auto">
        <div className="flex items-center justify-around">
          <button
            className="flex flex-col items-center gap-1 p-2 rounded-xl transition-colors text-white"
            aria-label="Home"
          >
            <Home className="h-7 w-7" />
          </button>
          <button
            className="flex flex-col items-center gap-1 p-2 rounded-xl transition-colors text-white/60"
            aria-label="Bookings"
          >
            <FileText className="h-7 w-7" />
          </button>
          <button
            className="flex flex-col items-center gap-1 p-2 rounded-xl transition-colors text-white/60"
            aria-label="Wallet"
          >
            <Wallet className="h-7 w-7" />
          </button>
          <button
            className="flex flex-col items-center gap-1 p-2 rounded-xl transition-colors text-white/60"
            aria-label="Profile"
          >
          </button>
          {/* Bottom Navbar */}
                <BottomNavbar activeTab="home" />
        </div>
      </div>
    </div>
  );
}
