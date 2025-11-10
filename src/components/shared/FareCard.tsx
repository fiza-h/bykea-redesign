interface FareCardProps {
  baseFare: number;
  distance?: string;
  total: number;
  currency?: string;
}

export function FareCard({ baseFare, distance, total, currency = 'Rs.' }: FareCardProps) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-lg">
      <h3 className="mb-4">Fare Details</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Base Fare</span>
          <span className="text-gray-900">{currency} {baseFare.toLocaleString()}</span>
        </div>
        
        {distance && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Distance</span>
            <span className="text-gray-900">{distance}</span>
          </div>
        )}
        
        <div className="h-px bg-gray-200"></div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-900">Total</span>
          <span className="text-[#00A859] text-xl">{currency} {total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
