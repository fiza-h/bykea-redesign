import { ArrowLeft, MapPin, Locate, Check } from 'lucide-react';
import { useState } from 'react';
import { StepIndicator } from '../shared/StepIndicator';
import { FareCard } from '../shared/FareCard';
import { VoiceMicButton } from '../shared/VoiceMicButton';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface SeniorBookingScreenProps {
  onBack: () => void;
}

export function SeniorBookingScreen({ onBack }: SeniorBookingScreenProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [pickupLocation, setPickupLocation] = useState('DHA Phase 8, Defence, Karachi');
  const [dropLocation, setDropLocation] = useState('');

  const steps = ['Pickup', 'Drop', 'Fare', 'Confirm'];

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Status Bar */}
      <div className="bg-[#00A859] px-4 py-3 flex items-center justify-between text-white">
        <span>9:35 AM</span>
        <div className="flex items-center gap-2">
          <span>📶</span>
          <span>100%</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-[#00A859] px-6 py-4 flex items-center gap-4 text-white">
        <button
          onClick={onBack}
          className="p-3 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl">Book Your Ride</h1>
      </div>

      {/* Content */}
      <div className="p-4 pb-32">
        {/* Step Indicator */}
        <StepIndicator currentStep={currentStep} steps={steps} />

        {/* Map */}
        <div className="relative h-80 bg-gray-200 rounded-3xl overflow-hidden mb-4 border-4 border-[#00A859]">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759802524049-2421ddaee0fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc3RyZWV0JTIwbWFwfGVufDF8fHx8MTc2MjYzMjQzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Map"
            className="h-full w-full object-cover opacity-40"
          />
          
          {/* Location Pin */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
            <div className="bg-white rounded-3xl px-6 py-4 shadow-2xl border-4 border-[#00A859]">
              <p className="text-lg">Your Pickup Location</p>
            </div>
            <div className="w-1 h-12 bg-[#00A859] mx-auto"></div>
            <MapPin className="h-10 w-10 text-[#00A859] fill-[#00A859] mx-auto -mt-2" />
          </div>

          {/* Locate Button */}
          <button className="absolute bottom-4 right-4 bg-white rounded-2xl p-4 shadow-xl hover:bg-gray-50 transition-colors">
            <Locate className="h-8 w-8 text-[#00A859]" />
          </button>
        </div>

        {/* Location Card */}
        <div className="bg-white rounded-3xl p-6 mb-4 shadow-lg border-2 border-gray-200">
          <div className="space-y-4">
            <div>
              <label className="text-gray-600 text-lg mb-2 block">Pickup Location</label>
              <p className="text-gray-900 text-xl p-4 bg-[#F5F5F5] rounded-2xl">{pickupLocation}</p>
            </div>
            
            {currentStep >= 2 && (
              <div>
                <label className="text-gray-600 text-lg mb-2 block">Drop Location</label>
                <input
                  type="text"
                  value={dropLocation}
                  onChange={(e) => setDropLocation(e.target.value)}
                  placeholder="Enter drop location"
                  className="w-full text-xl p-4 bg-[#F5F5F5] rounded-2xl border-2 border-gray-300 focus:border-[#00A859] outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {currentStep === 1 && (
            <>
              <button className="w-full bg-[#00A859] hover:bg-[#008f4a] text-white rounded-3xl p-6 shadow-xl transition-all min-h-[72px] text-xl">
                Use Current Location
              </button>
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 rounded-3xl p-6 shadow-lg transition-all min-h-[72px] text-xl border-2 border-gray-300"
              >
                Change Location
              </button>
            </>
          )}

          {currentStep === 2 && (
            <button
              onClick={() => setCurrentStep(3)}
              disabled={!dropLocation}
              className="w-full bg-[#00A859] hover:bg-[#008f4a] text-white rounded-3xl p-6 shadow-xl transition-all min-h-[72px] text-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Fare
            </button>
          )}

          {currentStep === 3 && (
            <>
              <FareCard
                baseFare={250}
                distance="8.5 km"
                total={450}
              />
              <button
                onClick={() => setCurrentStep(4)}
                className="w-full bg-[#00A859] hover:bg-[#008f4a] text-white rounded-3xl p-6 shadow-xl transition-all min-h-[72px] text-xl"
              >
                Continue to Confirm
              </button>
            </>
          )}

          {currentStep === 4 && (
            <button className="w-full bg-[#00A859] hover:bg-[#008f4a] text-white rounded-3xl p-6 shadow-xl transition-all min-h-[72px] text-xl flex items-center justify-center gap-3">
              <Check className="h-8 w-8" strokeWidth={3} />
              Confirm Ride
            </button>
          )}
        </div>
      </div>

      {/* Voice Button */}
      <VoiceMicButton label="Speak Destination" size="lg" />
    </div>
  );
}
