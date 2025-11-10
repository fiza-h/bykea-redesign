import { Volume2, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface IlliterateBookingScreenProps {
  onBack: () => void;
}

export function IlliterateBookingScreen({ onBack }: IlliterateBookingScreenProps) {
  const [step, setStep] = useState<'voice' | 'location' | 'confirm'>('voice');
  const [audioPlaying, setAudioPlaying] = useState<string | null>(null);

  const playAudio = (text: string) => {
    setAudioPlaying(text);
    setTimeout(() => setAudioPlaying(null), 2000);
  };

  const locations = [
    { id: 'school', emoji: '🏫', urdu: 'سکول', english: 'School' },
    { id: 'mall', emoji: '🏬', urdu: 'مال', english: 'Mall' },
    { id: 'office', emoji: '🏢', urdu: 'آفس', english: 'Office' },
    { id: 'hospital', emoji: '🏥', urdu: 'ہسپتال', english: 'Hospital' },
    { id: 'airport', emoji: '✈️', urdu: 'ہوائی اڈا', english: 'Airport' },
    { id: 'home', emoji: '🏠', urdu: 'گھر', english: 'Home' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00A859] to-[#008f4a]">
      {/* Status Bar */}
      <div className="px-4 py-3 flex items-center justify-between text-white">
        <span className="text-lg">10:05 AM</span>
        <div className="flex items-center gap-2">
          <span>📶</span>
          <Volume2 className="h-5 w-5 animate-pulse" />
        </div>
      </div>

      {/* Header */}
      <div className="px-6 py-4 flex items-center gap-4 text-white">
        <button
          onClick={onBack}
          className="p-4 bg-white/20 rounded-2xl hover:bg-white/30 transition-all"
          aria-label="Go back"
        >
          <ArrowLeft className="h-7 w-7" />
        </button>
      </div>

      {/* Content */}
      <div className="px-6 pb-32">
        {/* Step 1: Voice Prompt */}
        {step === 'voice' && (
          <div className="space-y-6">
            {/* Audio Indicator */}
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 text-white text-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Volume2 className="h-12 w-12" />
              </div>
              <p className="text-2xl mb-2">🔊 "اپنی منزل بتائیں"</p>
              <p className="text-white/80 text-lg">Apni manzil batayein</p>
            </div>

            {/* Map Auto-Detect */}
            <div className="bg-white rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-[#00A859] rounded-2xl flex items-center justify-center">
                  <span className="text-4xl">📍</span>
                </div>
                <div className="flex-1">
                  <p className="text-lg text-gray-600 mb-1">آپ کی جگہ</p>
                  <p className="text-gray-900">DHA Phase 8</p>
                </div>
              </div>
              
              <button
                onClick={() => {
                  playAudio('Thik hai');
                  setStep('location');
                }}
                className="w-full bg-[#00A859] hover:bg-[#008f4a] text-white rounded-2xl p-6 text-xl flex items-center justify-center gap-3"
              >
                <span className="text-4xl">✅</span>
                <span>ٹھیک ہے</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Photo-Based Location Selection */}
        {step === 'location' && (
          <div className="space-y-6">
            {/* Audio Prompt */}
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 text-white text-center">
              <Volume2 className="h-10 w-10 mx-auto mb-3" />
              <p className="text-xl">🔊 "کہاں جانا ہے؟"</p>
              <p className="text-white/80">Kahan jana hai?</p>
            </div>

            {/* Location Grid */}
            <div className="grid grid-cols-2 gap-4">
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => {
                    playAudio(`${location.english} jana hai`);
                    setStep('confirm');
                  }}
                  className={`bg-white rounded-3xl p-6 shadow-2xl transition-all hover:scale-105 active:scale-95 ${
                    audioPlaying?.includes(location.english) ? 'ring-4 ring-yellow-400' : ''
                  }`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 bg-[#F5F5F5] rounded-2xl flex items-center justify-center">
                      <span className="text-5xl">{location.emoji}</span>
                    </div>
                    <span className="text-xl text-gray-900">{location.urdu}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 'confirm' && (
          <div className="space-y-6">
            {/* Route Preview */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative h-48 bg-gray-200">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1759802524049-2421ddaee0fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc3RyZWV0JTIwbWFwfGVufDF8fHx8MTc2MjYzMjQzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Map"
                  className="h-full w-full object-cover opacity-40"
                />
                <div className="absolute top-4 left-4 bg-[#00A859] text-white px-4 py-2 rounded-xl flex items-center gap-2">
                  <span className="text-2xl">📍</span>
                  <span>DHA → Mall</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600 text-lg">کرایہ / Fare</span>
                  <span className="text-3xl text-[#00A859]">Rs. 450</span>
                </div>
              </div>
            </div>

            {/* Confirm/Cancel Buttons */}
            <div className="grid grid-cols-2 gap-4">
              {/* Cancel */}
              <button
                onClick={() => {
                  playAudio('Rok diya gaya');
                  setStep('voice');
                }}
                className="bg-white rounded-3xl p-8 shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-5xl">❌</span>
                  </div>
                  <span className="text-xl text-gray-900">نہیں</span>
                  <span className="text-sm text-gray-600">Cancel</span>
                </div>
              </button>

              {/* Confirm */}
              <button
                onClick={() => playAudio('Thik hai. Driver pohanchne wala hai')}
                className="bg-[#00A859] rounded-3xl p-8 shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-5xl">✅</span>
                  </div>
                  <span className="text-xl text-white">ہاں</span>
                  <span className="text-sm text-white/80">Confirm</span>
                </div>
              </button>
            </div>

            {/* Audio Feedback */}
            {audioPlaying?.includes('Driver') && (
              <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 text-white text-center animate-pulse">
                <Volume2 className="h-10 w-10 mx-auto mb-3" />
                <p className="text-xl">🔊 "ٹھیک ہے۔ ڈرائیور پہنچنے والا ہے"</p>
                <p className="text-white/80 mt-2">Thik hai. Driver pohanchne wala hai</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Microphone */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <button
          className="w-24 h-24 rounded-full bg-yellow-400 hover:bg-yellow-300 shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 ring-8 ring-yellow-400/30"
          aria-label="Voice input"
        >
          <Volume2 className="h-14 w-14 text-gray-900" />
        </button>
      </div>
    </div>
  );
}
