import { ArrowLeft, MapPin, Clock, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BottomNavbar } from './shared/BottomNavbar';

interface RideOnWayScreenProps {
  onBack: () => void;
  onConfirm: () => void;
  fareType: string;
  pickup?: string;
  destination?: string;
}

export function RideOnWayScreen({
  onBack,
  onConfirm,
  fareType,
  pickup = 'DHA Phase 8, Defence, Karachi',
  destination = 'Clifton, Karachi',
}: RideOnWayScreenProps) {
  const fareDetails: Record<string, any> = {
    bike: { icon: '🏍️', name: 'Bike', price: 150 },
    rickshaw: { icon: '🛺', name: 'Rickshaw', price: 220 },
    car: { icon: '🚗', name: 'Car', price: 350 },
    'car-ac': { icon: '🚙', name: 'Car AC', price: 450 },
  };

  const selectedFare = fareDetails[fareType] || fareDetails.car;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* ✅ Top Bar (consistent with others) */}
      <div className="bg-[#00A859] px-4 py-3 flex items-center justify-between text-white">
        <button
          onClick={onBack}
          className="p-3 hover:bg-white/20 rounded-xl transition-colors min-w-[48px] min-h-[48px]"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-lg font-semibold">Confirm Your Ride</h1>
        <div className="flex items-center gap-2 text-lg">
          <span>📶</span>
          <span>100%</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5 space-y-5">
        {/* Map Preview */}
        <div className="relative h-48 bg-gray-200 rounded-3xl overflow-hidden shadow-md">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759802524049-2421ddaee0fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Map"
            className="h-full w-full object-cover opacity-40"
          />

          {/* Pickup + Drop Markers */}
          <div className="absolute top-4 left-4">
            <div className="bg-[#00A859] rounded-full p-2">
              <MapPin className="h-4 w-4 text-white fill-white" />
            </div>
          </div>
          <div className="absolute bottom-4 right-4">
            <div className="bg-purple-500 rounded-full p-2">
              <MapPin className="h-4 w-4 text-white fill-white" />
            </div>
          </div>
        </div>

        {/* Selected Ride */}
        <div className="bg-white rounded-3xl p-5 shadow-lg">
          <div className="flex items-center gap-4 pb-4 border-b-2 border-gray-100">
            <div className="w-16 h-16 bg-[#F5F5F5] rounded-2xl flex items-center justify-center">
              <span className="text-4xl">{selectedFare.icon}</span>
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">{selectedFare.name}</h3>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Arriving in 5–10 mins</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl text-[#00A859]">Rs. {selectedFare.price}</p>
            </div>
          </div>

          {/* Trip Details */}
          <div className="pt-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-[#00A859] mt-1.5"></div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Pickup</p>
                <p className="text-sm text-gray-900">{pickup}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-3 h-3 rounded-full bg-purple-500 mt-1.5"></div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 mb-1">Dropoff</p>
                <p className="text-sm text-gray-900">{destination}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fare Breakdown */}
        <div className="bg-white rounded-3xl p-5 shadow-lg">
          <h3 className="mb-3 font-semibold text-gray-800">Fare Breakdown</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Fare</span>
              <span className="text-gray-900">Rs. {Math.floor(selectedFare.price * 0.6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Distance (8.5 km)</span>
              <span className="text-gray-900">Rs. {Math.floor(selectedFare.price * 0.3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service Fee</span>
              <span className="text-gray-900">Rs. {Math.floor(selectedFare.price * 0.1)}</span>
            </div>
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-[#00A859] text-lg">Rs. {selectedFare.price}</span>
            </div>
          </div>
        </div>

        {/* Confirm / Cancel */}
        <div className="space-y-3">
          <button
            onClick={onBack}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 rounded-3xl p-4 shadow-md border-2 border-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* ✅ Bottom Navbar */}
      <BottomNavbar activeTab="home" />
    </div>
  );
}
