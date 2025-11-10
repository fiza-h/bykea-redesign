import { ArrowLeft, Volume2, Check, X, MapPin } from 'lucide-react';
import { useState } from 'react';
import { VoiceMicButton } from '../shared/VoiceMicButton';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DisabilityBookingScreenProps {
  onBack: () => void;
}

export function DisabilityBookingScreen({ onBack }: DisabilityBookingScreenProps) {
  const [voiceStep, setVoiceStep] = useState<'listening' | 'confirming' | 'confirmed'>('listening');
  const [pickupLocation] = useState('DHA Phase 8');
  const [dropLocation] = useState('Clifton');
  const [showVisualAlert, setShowVisualAlert] = useState(false);

  const handleConfirm = () => {
    setVoiceStep('confirmed');
    setShowVisualAlert(true);
    // Haptic feedback simulation
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
    setTimeout(() => setShowVisualAlert(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Status Bar with Visual Alert */}
      <div className={`px-4 py-3 flex items-center justify-between text-white transition-colors ${
        showVisualAlert ? 'bg-[#FF5B00] animate-pulse' : 'bg-[#00A859]'
      }`}>
        <span>9:45 AM</span>
        <div className="flex items-center gap-2">
          <span>📶</span>
          <Volume2 className="h-5 w-5" />
        </div>
      </div>

      {/* Header */}
      <div className="bg-[#00A859] px-6 py-4 flex items-center gap-4 text-white">
        <button
          onClick={onBack}
          className="p-4 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors focus:ring-4 focus:ring-white/50"
          aria-label="Go back"
        >
          <ArrowLeft className="h-7 w-7" />
        </button>
        <h1 className="text-xl">Voice Booking</h1>
      </div>

      {/* Content */}
      <div className="p-6 pb-32">
        {/* Voice Status Card */}
        <div className="bg-[#F5F5F5] rounded-3xl p-8 mb-6 border-4 border-[#00A859]">
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              voiceStep === 'listening' ? 'bg-[#00A859] animate-pulse' : 'bg-gray-400'
            }`}>
              <Volume2 className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl mb-1">
                {voiceStep === 'listening' && 'Listening...'}
                {voiceStep === 'confirming' && 'Confirm Your Ride'}
                {voiceStep === 'confirmed' && 'Ride Confirmed!'}
              </h2>
              <p className="text-gray-600 text-lg">
                {voiceStep === 'listening' && 'Say your destination'}
                {voiceStep === 'confirming' && 'Please confirm your booking'}
                {voiceStep === 'confirmed' && 'Driver will arrive soon'}
              </p>
            </div>
          </div>
        </div>

        {/* Voice Transcript */}
        {voiceStep !== 'listening' && (
          <div className="bg-white rounded-3xl p-6 mb-6 shadow-xl border-2 border-gray-200">
            <div className="flex items-start gap-4 mb-4">
              <Volume2 className="h-6 w-6 text-[#00A859] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-gray-600 mb-2">You said:</p>
                <p className="text-xl text-gray-900">"Book a ride to Clifton"</p>
              </div>
            </div>
            
            <div className="h-px bg-gray-200 my-4"></div>
            
            <div className="flex items-start gap-4">
              <Volume2 className="h-6 w-6 text-[#00A859] flex-shrink-0 mt-1" />
              <div className="flex-1">
                <p className="text-gray-600 mb-2">System reads:</p>
                <p className="text-xl text-gray-900">"Pickup from {pickupLocation} to {dropLocation}. Confirm?"</p>
              </div>
            </div>
          </div>
        )}

        {/* Map Preview */}
        {voiceStep !== 'listening' && (
          <div className="relative h-64 bg-gray-200 rounded-3xl overflow-hidden mb-6 border-2 border-gray-300">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759802524049-2421ddaee0fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc3RyZWV0JTIwbWFwfGVufDF8fHx8MTc2MjYzMjQzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Map showing route"
              className="h-full w-full object-cover opacity-40"
            />
            
            {/* Route Markers */}
            <div className="absolute top-1/4 left-1/4">
              <div className="flex flex-col items-center">
                <div className="bg-[#00A859] rounded-full p-2 shadow-xl">
                  <MapPin className="h-6 w-6 text-white fill-white" />
                </div>
                <span className="text-sm bg-white px-3 py-1 rounded-lg shadow-md mt-2">{pickupLocation}</span>
              </div>
            </div>
            
            <div className="absolute bottom-1/4 right-1/4">
              <div className="flex flex-col items-center">
                <div className="bg-purple-500 rounded-full p-2 shadow-xl">
                  <MapPin className="h-6 w-6 text-white fill-white" />
                </div>
                <span className="text-sm bg-white px-3 py-1 rounded-lg shadow-md mt-2">{dropLocation}</span>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Buttons */}
        {voiceStep === 'confirming' && (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setVoiceStep('listening')}
              className="bg-white hover:bg-gray-50 text-gray-900 rounded-3xl p-8 shadow-lg transition-all hover:scale-105 focus:scale-105 focus:ring-4 focus:ring-gray-300 min-h-[120px] border-2 border-gray-300"
              aria-label="No, cancel booking"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="h-10 w-10 text-red-600" strokeWidth={3} />
                </div>
                <span className="text-xl">No</span>
              </div>
            </button>

            <button
              onClick={handleConfirm}
              className="bg-[#00A859] hover:bg-[#008f4a] text-white rounded-3xl p-8 shadow-xl transition-all hover:scale-105 focus:scale-105 focus:ring-4 focus:ring-[#00A859]/50 min-h-[120px]"
              aria-label="Yes, confirm booking"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <Check className="h-10 w-10 text-white" strokeWidth={3} />
                </div>
                <span className="text-xl">Yes</span>
              </div>
            </button>
          </div>
        )}

        {/* Confirmed State */}
        {voiceStep === 'confirmed' && (
          <div className="bg-[#00A859] text-white rounded-3xl p-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-12 w-12" strokeWidth={3} />
            </div>
            <h2 className="text-2xl mb-2">Booking Confirmed</h2>
            <p className="text-white/90 text-lg">Finding a driver nearby...</p>
            
            {/* Visual Progress Indicator for Deaf Users */}
            <div className="mt-6 bg-white/20 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-white rounded-full animate-[pulse_1.5s_ease-in-out_infinite] w-1/2"></div>
            </div>
          </div>
        )}

        {/* Accessibility Note */}
        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
          <p className="text-sm text-blue-900">
            🔔 Tactile feedback enabled • Visual alerts ON • Voice guidance active
          </p>
        </div>
      </div>

      {/* Voice Button */}
      <VoiceMicButton
        label="Say your destination"
        size="lg"
        onVoiceInput={() => setVoiceStep('confirming')}
      />
    </div>
  );
}
