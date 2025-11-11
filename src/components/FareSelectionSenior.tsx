import { ArrowLeft, Clock, Users, Star, Volume2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BottomNavbar } from "./shared/BottomNavbar";

interface FareSelectionScreenProps {
  onBack: () => void;
  onSelectFare: (fareType: string) => void;
  pickup?: string;
  destination?: string;
}

export function FareSelectionScreenSenior({
  onBack,
  onSelectFare,
  pickup = "Your Location",
  destination = "Your Destination",
}: FareSelectionScreenProps) {
  const fareOptions = [
    { id: "bike", emoji: "🏍️", name: "Bike", time: "5 min", price: 150 },
    { id: "rickshaw", emoji: "🛺", name: "Rickshaw", time: "8 min", price: 220 },
    { id: "car", emoji: "🚗", name: "Car", time: "10 min", price: 350, popular: true },
    { id: "car-ac", emoji: "🚙", name: "Car AC", time: "12 min", price: 450 },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col justify-between">
      {/* HEADER */}
      <div className="bg-[#00A859] px-5 py-4 flex items-center justify-between text-white">
        <button
          onClick={onBack}
          className="p-3 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors"
        >
          <ArrowLeft className="h-7 w-7" />
        </button>
        <h1 className="text-2xl font-semibold">Choose Ride</h1>
        <Volume2 className="h-7 w-7 opacity-80" />
      </div>

      {/* MAP AREA */}
      <div className="relative h-64 bg-gray-200 m-4 rounded-3xl overflow-hidden border-4 border-[#00A859]">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1759802524049-2421ddaee0fe"
          alt="Map"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-3xl p-4 shadow-xl">
          <p className="text-lg font-medium text-gray-700 truncate">
            📍 <strong>{pickup}</strong>
          </p>
          <p className="text-lg font-medium text-gray-700 truncate mt-1">
            🎯 <strong>{destination}</strong>
          </p>
          <p className="mt-2 text-gray-600 text-base">Approx. Distance: 8.5 km</p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Select Your Ride Type
        </h2>

        <div className="space-y-4">
          {fareOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSelectFare(opt.id)}
              className="w-full bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl border-4 border-transparent hover:border-[#00A859] transition-all flex items-center justify-between active:scale-[0.98]"
            >
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-[#EAF9F1] rounded-3xl flex items-center justify-center text-6xl">
                  {opt.emoji}
                </div>
                <div className="flex flex-col text-left">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {opt.name}
                    {opt.popular && (
                      <span className="ml-2 bg-[#00A859] text-white text-sm px-2 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-700 text-lg mt-1">⏱ {opt.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-[#00A859]">Rs. {opt.price}</p>
                <p className="text-gray-500 text-sm mt-1">per ride</p>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 text-center bg-yellow-50 border-2 border-yellow-300 text-yellow-900 rounded-2xl p-4 text-lg">
          💡 <strong>Tip:</strong> Choose what’s most comfortable for you.
        </div>
      </div>

      {/* Bottom Navbar */}
      <BottomNavbar activeTab="home" />
    </div>
  );
}
