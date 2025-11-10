import { useState } from 'react';
import { MapView } from './MapView';
import { PaymentMethodModal } from './PaymentMethodModal';
import { BottomNavbar } from './shared/BottomNavbar';
import { MapPin, Bookmark, ArrowUpDown, Package, Phone } from 'lucide-react';

interface HomeScreenProps {
  onNavigateToRental: () => void;
  onNavigateToFare: (pickup: string, destination: string, mode?: 'ride' | 'parcel') => void;
  onBack?: () => void;
}

export function HomeScreen({ onNavigateToRental, onNavigateToFare, onBack }: HomeScreenProps) {
  const [activeService, setActiveService] = useState<'ride' | 'parcel'>('ride');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [parcelPickup, setParcelPickup] = useState('');
  const [parcelDrop, setParcelDrop] = useState('');

  // Selectively use correct values depending on mode
  const currentPickup = activeService === 'ride' ? pickupLocation : parcelPickup;
  const currentDrop = activeService === 'ride' ? dropLocation : parcelDrop;

  const handleContinue = () => {
    if (currentPickup && currentDrop) {
      onNavigateToFare(currentPickup, currentDrop, activeService);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Map Section */}
      <MapView showPickupMarker={true} onBack={onBack} />

      {/* Main Content */}
      <div className="relative -mt-6 bg-white rounded-t-3xl px-4 pt-6 pb-8 min-h-[58vh]">
        {/* Promotional Banner */}
        <div className="mb-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 flex items-center gap-3 shadow-lg w-full">
          <div className="bg-white/20 rounded-xl p-2">
            <Package className="h-6 w-6 text-white" />
          </div>
          <p className="text-white text-sm flex-1 text-left">
            Fatima, Get a 30% DISCOUNT on Your Next {activeService === 'parcel' ? 'Parcel Delivery' : 'Car Ride'}!
          </p>
        </div>

        {/* Location Inputs */}
        <div className="mb-4 bg-white border-2 border-green-500 rounded-3xl p-4 shadow-sm">
          {/* Pickup */}
          <div className="flex items-start gap-3 mb-4">
            <div className="flex flex-col items-center gap-1 pt-1">
              <div className="w-3 h-3 rounded-full border-2 border-green-500 bg-white"></div>
              <div className="w-0.5 h-8 bg-gray-300"></div>
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={currentPickup}
                onChange={(e) =>
                  activeService === 'ride'
                    ? setPickupLocation(e.target.value)
                    : setParcelPickup(e.target.value)
                }
                placeholder={activeService === 'ride' ? 'Enter pickup location' : 'Parcel pickup point'}
                className="w-full text-sm text-gray-800 outline-none bg-transparent"
              />
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <ArrowUpDown className="h-5 w-5" />
            </button>
          </div>

          {/* Dropoff */}
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center pt-1">
              <div className="w-3 h-3 rounded-full border-2 border-purple-500 bg-white"></div>
            </div>
            <input
              type="text"
              value={currentDrop}
              onChange={(e) =>
                activeService === 'ride'
                  ? setDropLocation(e.target.value)
                  : setParcelDrop(e.target.value)
              }
              placeholder={activeService === 'ride' ? 'Enter dropoff location' : 'Parcel destination'}
              className="flex-1 text-sm text-gray-800 outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Save Locations */}
        <div className="flex justify-center gap-8 mb-4">
          <button className="flex flex-col items-center gap-1">
            <Bookmark className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-600">Save Home</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Bookmark className="h-5 w-5 text-gray-400" />
            <span className="text-xs text-gray-600">Save Work</span>
          </button>
        </div>

        {/* Continue Button */}
        {currentPickup && currentDrop && (
          <button
            onClick={handleContinue}
            className="w-full bg-[#00A859] hover:bg-[#008f4a] text-white rounded-3xl p-4 shadow-lg transition-all mb-3"
          >
            Continue
          </button>
        )}

        {/* Tabs: Ride / Parcel / Help */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {/* Ride */}
          <button
            onClick={() => setActiveService('ride')}
            className={`flex flex-col items-center justify-center rounded-3xl p-4 transition-all border-2 ${
              activeService === 'ride'
                ? 'bg-[#00A859] text-white border-[#00A859]'
                : 'bg-[#F5F5F5] text-gray-900 border-gray-300 hover:bg-gray-200'
            }`}
          >
            <MapPin className="h-6 w-6 mb-1" />
            <span className="text-sm font-semibold">Ride</span>
          </button>

          {/* Parcel */}
          <button
            onClick={() => setActiveService('parcel')}
            className={`flex flex-col items-center justify-center rounded-3xl p-4 transition-all border-2 ${
              activeService === 'parcel'
                ? 'bg-[#00A859] text-white border-[#00A859]'
                : 'bg-[#F5F5F5] text-gray-900 border-gray-300 hover:bg-gray-200'
            }`}
          >
            <Package className="h-6 w-6 mb-1" />
            <span className="text-sm font-semibold">Parcel</span>
          </button>

          {/* Help */}
          <button
            onClick={() => alert('Calling help line...')}
            className="flex flex-col items-center justify-center bg-[#FF5B00] text-white rounded-3xl p-4 hover:bg-[#e05200] transition-all"
          >
            <Phone className="h-6 w-6 mb-1" />
            <span className="text-sm font-semibold">Help</span>
          </button>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSelect={(method) => console.log(method)}
      />

      {/* Bottom Navigation */}
      <BottomNavbar activeTab="home" />
    </div>
  );
}