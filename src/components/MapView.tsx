import { MapPin, Menu, Locate, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MapViewProps {
  showPickupMarker?: boolean;
  showDropoffMarker?: boolean;
  onBack?: () => void;
}

export function MapView({ showPickupMarker = true, showDropoffMarker = false, onBack }: MapViewProps) {
  return (
    <div className="relative h-96 w-full overflow-hidden rounded-b-3xl">
      {/* Map Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1759802524049-2421ddaee0fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc3RyZWV0JTIwbWFwfGVufDF8fHx8MTc2MjYzMjQzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Map"
          className="h-full w-full object-cover opacity-40"
        />
        {/* Map pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGw2MCA2ME0wIDYwbDYwLTYwIiBzdHJva2U9IiNhZGNkZWQiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==')] opacity-50"></div>
      </div>

      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3">
        <span className="text-sm">8:47</span>
        <div className="flex items-center gap-2">
          <span className="text-sm">📶</span>
          <span className="text-sm">12</span>
        </div>
      </div>

      {/* Back/Menu Button */}
      {onBack ? (
        <button 
          onClick={onBack}
          className="absolute top-16 left-4 bg-white rounded-xl p-3 shadow-lg hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-gray-700" />
        </button>
      ) : (
        <button className="absolute top-16 left-4 bg-white rounded-xl p-3 shadow-lg hover:bg-gray-50 transition-colors">
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      )}

      {/* Locate Button */}
      <button className="absolute top-1/2 right-4 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors">
        <Locate className="h-6 w-6 text-gray-700" />
      </button>

      {/* Pickup Marker */}
      {showPickupMarker && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
          <div className="relative">
            <div className="bg-white rounded-2xl px-4 py-2 shadow-lg border-2 border-green-500">
              <div className="text-center">
                <div className="text-gray-800 text-sm">Your pickup</div>
                <div className="text-green-500 text-xs">Save</div>
              </div>
            </div>
            <div className="w-0.5 h-8 bg-gray-800 mx-auto"></div>
          </div>
        </div>
      )}

      {/* Dropoff Marker */}
      {showDropoffMarker && (
        <div className="absolute top-1/3 right-1/3">
          <div className="bg-purple-500 rounded-full p-2">
            <MapPin className="h-5 w-5 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}
