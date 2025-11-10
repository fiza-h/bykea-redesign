import { Car, Package, Store } from 'lucide-react';

interface ServiceTabsProps {
  activeService: 'ride' | 'delivery' | 'shops';
  onServiceChange: (service: 'ride' | 'delivery' | 'shops') => void;
}

export function ServiceTabs({ activeService, onServiceChange }: ServiceTabsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Ride */}
      <button
        onClick={() => onServiceChange('ride')}
        className={`relative flex flex-col items-center p-4 rounded-2xl transition-all ${
          activeService === 'ride'
            ? 'bg-green-100 shadow-md'
            : 'bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <div className="mb-2 h-16 flex items-center justify-center">
          <Car className={`h-12 w-12 ${activeService === 'ride' ? 'text-green-600' : 'text-gray-600'}`} />
        </div>
        <span className={`text-xs uppercase tracking-wider ${
          activeService === 'ride' ? 'text-green-600' : 'text-gray-600'
        }`}>
          Ride
        </span>
        {activeService === 'ride' && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-green-500 rounded-full"></div>
        )}
      </button>

      {/* Delivery */}
      <button
        onClick={() => onServiceChange('delivery')}
        className={`relative flex flex-col items-center p-4 rounded-2xl transition-all ${
          activeService === 'delivery'
            ? 'bg-green-100 shadow-md'
            : 'bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <div className="mb-2 h-16 flex items-center justify-center">
          <Package className={`h-12 w-12 ${activeService === 'delivery' ? 'text-green-600' : 'text-gray-600'}`} />
        </div>
        <span className={`text-xs uppercase tracking-wider ${
          activeService === 'delivery' ? 'text-green-600' : 'text-gray-600'
        }`}>
          Delivery
        </span>
        {activeService === 'delivery' && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-green-500 rounded-full"></div>
        )}
      </button>

      {/* Shops */}
      <button
        onClick={() => onServiceChange('shops')}
        className={`relative flex flex-col items-center p-4 rounded-2xl transition-all ${
          activeService === 'shops'
            ? 'bg-green-100 shadow-md'
            : 'bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <div className="mb-2 h-16 flex items-center justify-center">
          <Store className={`h-12 w-12 ${activeService === 'shops' ? 'text-green-600' : 'text-gray-600'}`} />
        </div>
        <span className={`text-xs uppercase tracking-wider ${
          activeService === 'shops' ? 'text-green-600' : 'text-gray-600'
        }`}>
          Shops
        </span>
        {activeService === 'shops' && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-green-500 rounded-full"></div>
        )}
      </button>
    </div>
  );
}
