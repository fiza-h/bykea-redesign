import { Check, MapPin, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useEffect } from 'react';

interface RideRequestedScreenProps {
  onContinue: () => void;
  fareType: string;
}

export function RideRequestedScreen({ onContinue, fareType }: RideRequestedScreenProps) {
  const fareDetails: Record<string, any> = {
    bike: { icon: '🏍️', name: 'Bike', price: 150 },
    rickshaw: { icon: '🛺', name: 'Rickshaw', price: 220 },
    car: { icon: '🚗', name: 'Car', price: 350 },
    'car-ac': { icon: '🚙', name: 'Car AC', price: 450 }
  };

  const selectedFare = fareDetails[fareType] || fareDetails.car;

  // Auto-navigate after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00A859] to-[#008f4a] flex flex-col items-center justify-center p-6">
      {/* Success Animation */}
      <div className="mb-8 animate-scale-in">
        <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl">
          <Check className="h-20 w-20 text-[#00A859] animate-check" strokeWidth={3} />
        </div>
      </div>

      {/* Success Message */}
      <div className="text-center mb-8 text-white">
        <h1 className="text-3xl mb-3">Ride Confirmed!</h1>
        <p className="text-white/90 text-lg">Finding you the nearest driver...</p>
      </div>

      {/* Ride Details Card */}
      <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-[#F5F5F5] rounded-2xl flex items-center justify-center">
            <span className="text-4xl">{selectedFare.icon}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 mb-1">{selectedFare.name}</h3>
            <p className="text-sm text-gray-600">Rs. {selectedFare.price}</p>
          </div>
        </div>

        <div className="space-y-3 border-t-2 border-gray-100 pt-4">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-[#00A859] mt-1.5"></div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-1">Pickup</p>
              <p className="text-sm text-gray-900">DHA Phase 8, Defence, Karachi</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-purple-500 mt-1.5"></div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-1">Dropoff</p>
              <p className="text-sm text-gray-900">Clifton, Karachi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      <div className="mt-8 flex items-center gap-2 text-white">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>

      {/* Home Indicator */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 h-1 w-32 bg-white/50 rounded-full"></div>

      <style>{`
        @keyframes scale-in {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes check {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        
        .animate-check {
          animation: check 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
