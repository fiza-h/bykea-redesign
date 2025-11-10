import { ArrowLeft, Package, MapPin, Clock } from 'lucide-react';
import { BottomNavbar } from '../shared/BottomNavbar';

interface ParcelConfirmScreenProps {
  onBack: () => void;
  onConfirm: () => void;
  mode?: 'standard' | 'senior' | 'disability' | 'illiterate';
}

export function ParcelConfirmScreen({ onBack, onConfirm, mode = 'standard' }: ParcelConfirmScreenProps) {
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
      <div className="bg-[#00A859] px-6 py-4 text-white">
        <h1 className={`${isSeniorMode ? 'text-3xl' : 'text-2xl'}`}>Confirm Delivery</h1>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 pb-24">
        {/* Delivery Details */}
        <div className="bg-white rounded-3xl p-5 shadow-lg">
          <div className="flex items-center gap-4 pb-4 border-b-2 border-gray-100">
            <div className="w-16 h-16 bg-[#F5F5F5] rounded-2xl flex items-center justify-center">
              <Package className="h-8 w-8 text-[#00A859]" />
            </div>
            <div className="flex-1">
              <h3 className={`text-gray-900 mb-1 ${isSeniorMode ? 'text-xl' : ''}`}>Standard Delivery</h3>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className={`text-gray-600 ${isSeniorMode ? 'text-base' : 'text-sm'}`}>30-45 mins</span>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-[#00A859] ${isSeniorMode ? 'text-3xl' : 'text-2xl'}`}>Rs. 180</p>
            </div>
          </div>
          
          {/* Locations */}
          <div className="pt-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-[#00A859] mt-1.5"></div>
              <div className="flex-1">
                <p className={`text-gray-600 mb-1 ${isSeniorMode ? 'text-base' : 'text-xs'}`}>Pickup</p>
                <p className={`text-gray-900 ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>DHA Phase 8, Defence, Karachi</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-purple-500 mt-1.5"></div>
              <div className="flex-1">
                <p className={`text-gray-600 mb-1 ${isSeniorMode ? 'text-base' : 'text-xs'}`}>Dropoff</p>
                <p className={`text-gray-900 ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>Clifton, Karachi</p>
              </div>
            </div>
          </div>
        </div>

        {/* Parcel Details */}
        <div className="bg-white rounded-3xl p-5 shadow-lg">
          <h3 className={`mb-3 ${isSeniorMode ? 'text-xl' : ''}`}>Parcel Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className={`text-gray-600 ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>Size</span>
              <span className={`text-gray-900 ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>Medium (2-5 kg)</span>
            </div>
            <div className="flex justify-between">
              <span className={`text-gray-600 ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>Distance</span>
              <span className={`text-gray-900 ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>8.5 km</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-3xl p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-gray-600 mb-1 ${isSeniorMode ? 'text-base' : 'text-xs'}`}>Payment Method</p>
              <p className={`text-gray-900 ${isSeniorMode ? 'text-xl' : ''}`}>Cash on Delivery</p>
            </div>
            <button className={`text-[#00A859] ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>Change</button>
          </div>
        </div>

        {/* Fare Breakdown */}
        <div className="bg-white rounded-3xl p-5 shadow-lg">
          <h3 className={`mb-3 ${isSeniorMode ? 'text-xl' : ''}`}>Fare Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className={`text-gray-600 ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>Base Fare</span>
              <span className={`text-gray-900 ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>Rs. 100</span>
            </div>
            <div className="flex justify-between">
              <span className={`text-gray-600 ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>Distance (8.5 km)</span>
              <span className={`text-gray-900 ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>Rs. 65</span>
            </div>
            <div className="flex justify-between">
              <span className={`text-gray-600 ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>Service Fee</span>
              <span className={`text-gray-900 ${isSeniorMode ? 'text-lg' : 'text-sm'}`}>Rs. 15</span>
            </div>
            <div className="h-px bg-gray-200 my-2"></div>
            <div className="flex justify-between">
              <span className={`text-gray-900 ${isSeniorMode ? 'text-xl' : ''}`}>Total</span>
              <span className={`text-[#00A859] ${isSeniorMode ? 'text-3xl' : 'text-xl'}`}>Rs. 180</span>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={onConfirm}
          className={`w-full bg-[#00A859] hover:bg-[#008f4a] text-white rounded-3xl shadow-xl transition-all ${
            isSeniorMode ? 'p-6 text-2xl min-h-[72px]' : 'p-5 text-lg min-h-[60px]'
          }`}
        >
          Confirm Delivery
        </button>

        {/* Cancel */}
        <button
          onClick={onBack}
          className={`w-full bg-white hover:bg-gray-50 text-gray-700 rounded-3xl shadow-md transition-all border-2 border-gray-200 ${
            isSeniorMode ? 'p-5 text-xl min-h-[64px]' : 'p-4 min-h-[56px]'
          }`}
        >
          Cancel
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavbar />
    </div>
  );
}
