import { Car, Package, Wallet, Settings as SettingsIcon, Volume2 } from 'lucide-react';
import { VoiceMicButton } from '../shared/VoiceMicButton';
import { TopNavbar } from '../shared/TopNavbar';
import { useState } from 'react';

interface DisabilityHomeScreenProps {
  onNavigateToBooking: () => void;
  onNavigateToParcel?: () => void;
  onBack?: () => void;
}

export function DisabilityHomeScreen({ onNavigateToBooking, onNavigateToParcel, onBack }: DisabilityHomeScreenProps) {
  const [voiceInstructions, setVoiceInstructions] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const speakLabel = (text: string) => {
    // Simulate screen reader
    console.log('Screen reader:', text);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navbar */}
      <TopNavbar onBack={onBack} showBackButton={!!onBack} />

      {/* Status Bar */}
      <div className="bg-[#00A859] px-4 py-3 flex items-center justify-between text-white">
        <span>9:40 AM</span>
        <div className="flex items-center gap-2">
          <span>📶</span>
          <Volume2 className="h-5 w-5" />
        </div>
      </div>

      {/* Header */}
      <div className="bg-[#00A859] px-6 py-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl mb-1">Bykea</h1>
            <p className="text-white/90">Accessible Mode ON</p>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            onFocus={() => speakLabel('Accessibility settings')}
            className="p-4 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors focus:ring-4 focus:ring-white/50"
            aria-label="Accessibility Settings"
          >
            <SettingsIcon className="h-7 w-7" />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-[#F5F5F5] px-6 py-6 border-b-4 border-[#00A859]">
          <h2 className="mb-4">Accessibility Preferences</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl">
              <span className="text-lg">Voice Instructions</span>
              <button
                onClick={() => setVoiceInstructions(!voiceInstructions)}
                className={`w-16 h-10 rounded-full transition-all ${
                  voiceInstructions ? 'bg-[#00A859]' : 'bg-gray-300'
                }`}
                aria-label={`Voice instructions ${voiceInstructions ? 'on' : 'off'}`}
              >
                <div
                  className={`w-8 h-8 bg-white rounded-full transition-transform ${
                    voiceInstructions ? 'translate-x-7' : 'translate-x-1'
                  }`}
                ></div>
              </button>
            </div>
            
            <button className="w-full bg-white hover:bg-gray-50 p-4 rounded-2xl text-left text-lg focus:ring-4 focus:ring-[#00A859]/50 min-h-[56px]">
              High Contrast Mode
            </button>
            
            <button className="w-full bg-white hover:bg-gray-50 p-4 rounded-2xl text-left text-lg focus:ring-4 focus:ring-[#00A859]/50 min-h-[56px]">
              Emergency Contact Shortcut
            </button>
          </div>
        </div>
      )}

      {/* Main Tiles */}
      <div className="p-6 pb-32">
        <div className="grid grid-cols-1 gap-4">
          {/* Ride Tile */}
          <button
            onClick={onNavigateToBooking}
            onFocus={() => speakLabel('Book a ride')}
            className="bg-[#00A859] hover:bg-[#008f4a] text-white rounded-3xl p-8 shadow-xl transition-all hover:scale-105 focus:scale-105 focus:ring-4 focus:ring-[#00A859]/50 min-h-[140px]"
            aria-label="Ride - Tap to book a ride"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center flex-shrink-0">
                <Car className="h-12 w-12" strokeWidth={2.5} />
              </div>
              <div className="text-left flex-1">
                <h2 className="text-2xl mb-2">Ride</h2>
                <p className="text-white/90 text-lg">Book a ride now</p>
              </div>
            </div>
          </button>

          {/* Delivery Tile */}
          <button
            onClick={onNavigateToParcel}
            onFocus={() => speakLabel('Send a parcel')}
            className="bg-white hover:bg-gray-50 text-gray-900 rounded-3xl p-8 shadow-lg transition-all hover:scale-105 focus:scale-105 focus:ring-4 focus:ring-[#00A859]/50 min-h-[140px] border-2 border-gray-200"
            aria-label="Delivery - Send a parcel"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-[#F5F5F5] rounded-3xl flex items-center justify-center flex-shrink-0">
                <Package className="h-12 w-12 text-[#00A859]" strokeWidth={2.5} />
              </div>
              <div className="text-left flex-1">
                <h2 className="text-2xl mb-2">Delivery</h2>
                <p className="text-gray-600 text-lg">Send a parcel</p>
              </div>
            </div>
          </button>

          {/* Wallet Tile */}
          <button
            onFocus={() => speakLabel('Check your wallet')}
            className="bg-white hover:bg-gray-50 text-gray-900 rounded-3xl p-8 shadow-lg transition-all hover:scale-105 focus:scale-105 focus:ring-4 focus:ring-[#00A859]/50 min-h-[140px] border-2 border-gray-200"
            aria-label="Wallet - Check balance and payment methods"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-[#F5F5F5] rounded-3xl flex items-center justify-center flex-shrink-0">
                <Wallet className="h-12 w-12 text-[#00A859]" strokeWidth={2.5} />
              </div>
              <div className="text-left flex-1">
                <h2 className="text-2xl mb-2">Wallet</h2>
                <p className="text-gray-600 text-lg">Manage payments</p>
              </div>
            </div>
          </button>
        </div>

        {/* Voice Prompt */}
        <div className="mt-6 bg-[#F5F5F5] rounded-3xl p-6 border-2 border-[#00A859]">
          <div className="flex items-center gap-4">
            <Volume2 className="h-8 w-8 text-[#00A859] flex-shrink-0" />
            <p className="text-lg text-gray-800">Say "Book a ride" or tap the microphone button</p>
          </div>
        </div>
      </div>

      {/* Voice Button */}
      <VoiceMicButton label="Say your pickup" size="lg" />
    </div>
  );
}
