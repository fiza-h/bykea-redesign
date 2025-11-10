import { ArrowLeft, Clock, Users, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BottomNavbar } from "./shared/BottomNavbar";

interface FareSelectionScreenProps {
  onBack: () => void;
  onSelectFare: (fareType: string) => void;
  pickup?: string;
  destination?: string;
}

export function FareSelectionScreen({
  onBack,
  onSelectFare,
  pickup = "Auto-detected pickup",
  destination = "Enter destination",
}: FareSelectionScreenProps) {
  const fareOptions = [
    {
      id: "bike",
      icon: "🏍️",
      name: "Bike",
      time: "5 mins",
      price: 150,
      capacity: "1 person",
      rating: 4.8,
    },
    {
      id: "rickshaw",
      icon: "🛺",
      name: "Rickshaw",
      time: "8 mins",
      price: 220,
      capacity: "2 persons",
      rating: 4.6,
    },
    {
      id: "car",
      icon: "🚗",
      name: "Car",
      time: "10 mins",
      price: 350,
      capacity: "3 persons",
      rating: 4.9,
      popular: true,
    },
    {
      id: "car-ac",
      icon: "🚙",
      name: "Car AC",
      time: "12 mins",
      price: 450,
      capacity: "3 persons",
      rating: 4.9,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Map */}
      <div className="relative h-64 bg-gray-200 overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1759802524049-2421ddaee0fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc3RyZWV0JTIwbWFwfGVufDF8fHx8MTc2MjYzMjQzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Map"
          className="h-full w-full object-cover opacity-40"
        />

        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3">
          <span className="text-sm">8:50</span>
          <div className="flex items-center gap-2">
            <span className="text-sm">📶</span>
            <span className="text-sm">12</span>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-14 left-4 bg-white rounded-xl p-3 shadow-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>

        {/* Route Info (Dynamic) */}
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-[#00A859]" />
                <span className="text-sm text-gray-600 truncate">{pickup}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-sm text-gray-600 truncate">
                  {destination}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Distance</p>
              <p className="text-gray-900">8.5 km</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-6 pb-24">
        <h2 className="mb-4 font-semibold text-lg text-gray-800">
          Choose Your Ride
        </h2>

        {/* Fare Options */}
        <div className="space-y-3">
          {fareOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelectFare(option.id)}
              className="w-full bg-white rounded-3xl p-4 shadow-md hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] border-2 border-transparent hover:border-[#00A859] relative"
            >
              {option.popular && (
                <div className="absolute top-3 right-3 bg-[#00A859] text-white text-xs px-3 py-1 rounded-full">
                  Popular
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#F5F5F5] rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-4xl">{option.icon}</span>
                </div>

                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-gray-900">{option.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-gray-600">
                        {option.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{option.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{option.capacity}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-gray-900 text-xl">Rs. {option.price}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Info Banner */}
        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
          <p className="text-sm text-blue-900">
            💡 Prices may vary based on traffic and demand
          </p>
        </div>
      </div>
      {/* Bottom Navigation */}
      <BottomNavbar activeTab="home" />
    </div>
  );
}
