import { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Edit, MapPin, Locate, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Checkbox } from './ui/checkbox';

interface HourlyRentalScreenProps {
  onBack: () => void;
}

export function HourlyRentalScreen({ onBack }: HourlyRentalScreenProps) {
  const [selectedHours, setSelectedHours] = useState(2);
  const [selectedVehicle, setSelectedVehicle] = useState(2800);
  const [outsideCity, setOutsideCity] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  const hours = [2, 3, 4, 5, 6, 8];
  const vehicles = [
    { id: 1000, icon: '🏍️', price: 1000 },
    { id: 2200, icon: '🛺', price: 2200 },
    { id: 2800, icon: '🚗', price: 2800 },
    { id: 3500, icon: '🚙', price: 3500, label: 'AC' }
  ];

  const basePrice = selectedVehicle;
  const fasterPickupPrice = basePrice + 280;
  const longerWaitPrice = basePrice - 280;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Map Header */}
      <div className="relative h-80 bg-gray-100 overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1759802524049-2421ddaee0fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc3RyZWV0JTIwbWFwfGVufDF8fHx8MTc2MjYzMjQzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Map"
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGw2MCA2ME0wIDYwbDYwLTYwIiBzdHJva2U9IiNhZGNkZWQiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')] opacity-50"></div>
        </div>

        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 text-gray-800">
          <span className="text-sm">8:52 ✈️</span>
          <div className="flex items-center gap-2">
            <span className="text-sm">📶</span>
            <span className="text-sm">12</span>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-14 left-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-gray-700" />
        </button>

        {/* Location Info */}
        <div className="absolute top-14 left-16 right-16 bg-white rounded-2xl p-3 shadow-lg border-2 border-green-500">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-800 truncate">DHA Phase 8, Defence, Kar...</p>
              <p className="text-xs text-gray-600">Hourly Rental</p>
            </div>
            <Edit className="h-4 w-4 text-gray-400 flex-shrink-0" />
          </div>
        </div>

        {/* Locate Button */}
        <button className="absolute bottom-20 right-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors">
          <Locate className="h-5 w-5 text-gray-700" />
        </button>

        {/* Green Marker */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2">
          <MapPin className="h-8 w-8 text-green-500 fill-green-500" />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-t-3xl -mt-6 px-4 pt-6 pb-24">
        {/* Payment Method */}
        <div className="flex justify-end mb-4">
          <button className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors">
            {paymentMethod}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Select Hours */}
        <div className="mb-6">
          <h2 className="mb-4">Select Hours</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <div className="flex-1 flex gap-2 overflow-x-auto">
              {hours.map((hour) => (
                <button
                  key={hour}
                  onClick={() => setSelectedHours(hour)}
                  className={`flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-xl transition-all ${
                    selectedHours === hour
                      ? 'bg-green-500 text-white shadow-lg scale-110'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {hour}
                </button>
              ))}
            </div>

            <button className="p-2 text-gray-400 hover:text-gray-600">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Outside City Checkbox */}
        <div className="flex items-center gap-2 mb-6">
          <Checkbox
            checked={outsideCity}
            onCheckedChange={(checked) => setOutsideCity(checked as boolean)}
            id="outside-city"
          />
          <label htmlFor="outside-city" className="text-sm text-gray-700 cursor-pointer">
            Outside City
          </label>
        </div>

        {/* Vehicle Selection */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {vehicles.map((vehicle) => (
            <button
              key={vehicle.id}
              onClick={() => setSelectedVehicle(vehicle.price)}
              className={`relative flex flex-col items-center p-3 rounded-2xl transition-all ${
                selectedVehicle === vehicle.price
                  ? 'bg-green-100 border-2 border-green-500'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="text-3xl mb-1">{vehicle.icon}</div>
              <span className="text-sm text-gray-800">{vehicle.price}</span>
              {vehicle.label && (
                <span className="absolute top-1 right-1 text-xs text-gray-500">{vehicle.label}</span>
              )}
              {selectedVehicle === vehicle.price && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-green-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Pricing Options */}
        <div className="flex items-stretch gap-3">
          {/* Main Price */}
          <div className="flex-1 bg-green-50 border-2 border-green-500 rounded-3xl p-4">
            <div className="text-center mb-2">
              <span className="text-gray-400 line-through text-sm">{fasterPickupPrice.toLocaleString()}</span>
            </div>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-gray-600">Rs.</span>
              <span className="text-4xl text-gray-900">{basePrice.toLocaleString()}</span>
            </div>
            <div className="text-center">
              <span className="text-gray-400 text-sm">{longerWaitPrice.toLocaleString()}</span>
            </div>
            
            {/* Labels */}
            <div className="flex justify-between items-center mt-2 text-xs">
              <span className="text-green-600">faster pickup</span>
              <span className="text-green-600">longer wait</span>
            </div>
          </div>

          {/* Confirm Button */}
          <button className="bg-green-500 rounded-3xl p-6 hover:bg-green-600 transition-colors shadow-lg flex items-center justify-center">
            <Check className="h-8 w-8 text-white" strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Home Indicator */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 h-1 w-32 bg-black rounded-full"></div>
    </div>
  );
}
