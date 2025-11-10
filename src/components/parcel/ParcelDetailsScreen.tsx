import { ArrowLeft, Package, MapPin, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import { BottomNavbar } from '../shared/BottomNavbar';

interface ParcelDetailsScreenProps {
  onBack: () => void;
  onContinue: () => void;
  mode?: 'standard' | 'senior' | 'disability' | 'illiterate';
}

export function ParcelDetailsScreen({ onBack, onContinue, mode = 'standard' }: ParcelDetailsScreenProps) {
  const [pickupLocation, setPickupLocation] = useState('DHA Phase 8, Defence, Karachi');
  const [dropLocation, setDropLocation] = useState('');
  const [parcelSize, setParcelSize] = useState<'small' | 'medium' | 'large' | null>(null);

  const isSeniorMode = mode === 'senior';

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Back Button */}
      <div className="bg-white border-b-2 border-gray-200 px-4 py-3 flex items-center">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* Header */}
      <div className="bg-[#00A859] px-6 py-6 text-white">
        <div className="flex items-center gap-3">
          <Package className={`${isSeniorMode ? 'h-10 w-10' : 'h-8 w-8'}`} />
          <div>
            <h1 className={`${isSeniorMode ? 'text-3xl' : 'text-2xl'}`}>Send Parcel</h1>
            <p className={`text-white/90 ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>Where would you like to send?</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6 pb-24">
        {/* Location Inputs */}
        <div className="bg-white border-2 border-[#00A859] rounded-3xl p-5 shadow-lg">
          {/* Pickup */}
          <div className="flex items-start gap-3 mb-4">
            <div className="flex flex-col items-center gap-1 pt-1">
              <div className="w-3 h-3 rounded-full border-2 border-[#00A859] bg-white"></div>
              <div className="w-0.5 h-8 bg-gray-300"></div>
            </div>
            <div className="flex-1">
              <p className={`text-xs text-gray-600 mb-1 ${isSeniorMode ? 'text-base' : ''}`}>Pickup Location</p>
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className={`w-full text-gray-800 outline-none ${isSeniorMode ? 'text-lg' : 'text-sm'}`}
              />
            </div>
            <button className="text-gray-400 hover:text-gray-600 p-2">
              <ArrowUpDown className="h-5 w-5" />
            </button>
          </div>

          {/* Dropoff */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center pt-1">
              <div className="w-3 h-3 rounded-full border-2 border-purple-500 bg-white"></div>
            </div>
            <div className="flex-1">
              <p className={`text-xs text-gray-600 mb-1 ${isSeniorMode ? 'text-base' : ''}`}>Drop Location</p>
              <input
                type="text"
                value={dropLocation}
                onChange={(e) => setDropLocation(e.target.value)}
                placeholder="Enter drop location"
                className={`w-full text-gray-800 outline-none ${isSeniorMode ? 'text-lg' : 'text-sm'}`}
              />
            </div>
          </div>
        </div>

        {/* Parcel Size Selection */}
        <div>
          <h3 className={`mb-4 ${isSeniorMode ? 'text-2xl' : 'text-lg'}`}>Select Parcel Size</h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setParcelSize('small')}
              className={`bg-white rounded-2xl p-4 shadow-md transition-all ${
                parcelSize === 'small'
                  ? 'border-2 border-[#00A859] bg-[#00A859]/5'
                  : 'border-2 border-gray-200 hover:border-[#00A859]/50'
              } ${isSeniorMode ? 'min-h-[120px]' : 'min-h-[100px]'}`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className={`${isSeniorMode ? 'text-4xl' : 'text-3xl'}`}>📦</span>
                <span className={`text-gray-900 ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>Small</span>
                <span className={`text-gray-600 ${isSeniorMode ? 'text-sm' : 'text-xs'}`}>&lt; 2 kg</span>
              </div>
            </button>

            <button
              onClick={() => setParcelSize('medium')}
              className={`bg-white rounded-2xl p-4 shadow-md transition-all ${
                parcelSize === 'medium'
                  ? 'border-2 border-[#00A859] bg-[#00A859]/5'
                  : 'border-2 border-gray-200 hover:border-[#00A859]/50'
              } ${isSeniorMode ? 'min-h-[120px]' : 'min-h-[100px]'}`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className={`${isSeniorMode ? 'text-5xl' : 'text-4xl'}`}>📦</span>
                <span className={`text-gray-900 ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>Medium</span>
                <span className={`text-gray-600 ${isSeniorMode ? 'text-sm' : 'text-xs'}`}>2-5 kg</span>
              </div>
            </button>

            <button
              onClick={() => setParcelSize('large')}
              className={`bg-white rounded-2xl p-4 shadow-md transition-all ${
                parcelSize === 'large'
                  ? 'border-2 border-[#00A859] bg-[#00A859]/5'
                  : 'border-2 border-gray-200 hover:border-[#00A859]/50'
              } ${isSeniorMode ? 'min-h-[120px]' : 'min-h-[100px]'}`}
            >
              <div className="flex flex-col items-center gap-2">
                <span className={`${isSeniorMode ? 'text-6xl' : 'text-5xl'}`}>📦</span>
                <span className={`text-gray-900 ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>Large</span>
                <span className={`text-gray-600 ${isSeniorMode ? 'text-sm' : 'text-xs'}`}>5-10 kg</span>
              </div>
            </button>
          </div>
        </div>

        {/* Continue Button */}
        {dropLocation && parcelSize && (
          <button
            onClick={onContinue}
            className={`w-full bg-[#00A859] hover:bg-[#008f4a] text-white rounded-3xl shadow-xl transition-all ${
              isSeniorMode ? 'p-6 text-2xl min-h-[72px]' : 'p-5 text-lg min-h-[60px]'
            }`}
          >
            Continue to Delivery Options
          </button>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar />
    </div>
  );
}
