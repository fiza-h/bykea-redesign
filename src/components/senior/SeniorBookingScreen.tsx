import { ArrowLeft, MapPin, Locate, Check, Volume2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { StepIndicator } from '../shared/StepIndicator';
import { FareCard } from '../shared/FareCard';
import { VoiceMicButton } from '../shared/VoiceMicButton';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface SeniorBookingScreenProps {
  onBack: () => void;
  onConfirm: () => void;
}

export function SeniorBookingScreen({ onBack, onConfirm }: SeniorBookingScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [pickupLocation, setPickupLocation] = useState('DHA Phase 8, Defence, Karachi');
  const [dropLocation, setDropLocation] = useState('');

  const steps = ['Pickup', 'Drop', 'Fare', 'Confirm'];

  // Optional voice-hint simulation
  useEffect(() => {
    const hints = {
      1: 'Please confirm your pickup location.',
      2: 'Now enter your destination.',
      3: 'Review your fare.',
      4: 'Confirm your ride.',
    } as const;
    console.log('🗣️', hints[currentStep as keyof typeof hints]);
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <div className="bg-[#00A859] px-5 py-4 flex items-center justify-between text-white">
        <button
          onClick={onBack}
          className="p-3 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="h-7 w-7" />
        </button>
        <h1 className="text-2xl font-semibold">Book Your Ride</h1>
        <Volume2 className="h-6 w-6 opacity-80" />
      </div>

      {/* Step Progress */}
      <div className="px-4 pt-4">
        <StepIndicator currentStep={currentStep} steps={steps} />
      </div>

      {/* Map Area */}
      <div className="relative m-4 h-64 bg-gray-200 rounded-3xl overflow-hidden border-4 border-[#00A859]">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1759802524049-2421ddaee0fe"
          alt="Map"
          className="h-full w-full object-cover opacity-40"
        />
        <MapPin className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-[#00A859] h-12 w-12 fill-[#00A859]" />
        <button
          className="absolute bottom-3 right-3 bg-white p-3 rounded-2xl shadow-lg"
          title="Locate me"
        >
          <Locate className="h-7 w-7 text-[#00A859]" />
        </button>
      </div>

      {/* Main Card */}
      <div className="flex-1 px-4 space-y-5">
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200 text-gray-800">
          {currentStep === 1 && (
            <>
              <p className="text-lg mb-2 font-medium text-gray-600">Pickup Location</p>
              <p className="text-xl font-semibold mb-6">{pickupLocation}</p>
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full bg-[#00A859] text-white rounded-3xl py-5 text-xl font-bold shadow-xl hover:bg-[#008f4a]"
              >
                Confirm Pickup
              </button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <p className="text-lg mb-2 font-medium text-gray-600">Enter Drop Location</p>
              <input
                value={dropLocation}
                onChange={(e) => setDropLocation(e.target.value)}
                placeholder="e.g., Clifton, Karachi"
                className="w-full text-xl p-4 bg-[#F9F9F9] rounded-2xl border-2 border-gray-300 focus:border-[#00A859] outline-none mb-6"
              />
              <button
                onClick={() => setCurrentStep(3)}
                disabled={!dropLocation}
                className="w-full bg-[#00A859] text-white rounded-3xl py-5 text-xl font-bold shadow-xl hover:bg-[#008f4a] disabled:opacity-50"
              >
                Continue
              </button>
            </>
          )}

          {currentStep === 3 && (
            <>
              <FareCard baseFare={250} distance="8.5 km" total={450} />
              <button
                onClick={() => setCurrentStep(4)}
                className="w-full bg-[#00A859] text-white rounded-3xl py-5 text-xl font-bold shadow-xl hover:bg-[#008f4a]"
              >
                Continue to Confirm
              </button>
            </>
          )}

          {currentStep === 4 && (
            <button
              onClick={onConfirm}
              className="w-full bg-[#00A859] text-white rounded-3xl py-6 text-2xl font-bold shadow-2xl hover:bg-[#008f4a] flex items-center justify-center gap-3"
            >
              <Check className="h-8 w-8" strokeWidth={3} />
              Confirm Ride
            </button>
          )}
        </div>
      </div>

      {/* Bottom Voice Button */}
      <div className="p-4">
        <VoiceMicButton label="Speak Destination" size="xl" />
      </div>
    </div>
  );
}
