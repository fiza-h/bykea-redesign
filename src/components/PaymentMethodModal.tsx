import { Button } from './ui/button';

interface PaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (method: string) => void;
}

export function PaymentMethodModal({ isOpen, onClose, onSelect }: PaymentMethodModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="relative bg-white rounded-t-3xl w-full max-w-md shadow-2xl animate-in slide-in-from-bottom duration-300">
        <div className="flex flex-col gap-3 p-6 pb-8">
          <button
            onClick={() => {
              onSelect('no-cash');
              onClose();
            }}
            className="w-full py-4 px-6 text-blue-500 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
          >
            No Cash Collection
          </button>
          
          <button
            onClick={() => {
              onSelect('cod');
              onClose();
            }}
            className="w-full py-4 px-6 text-blue-500 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
          >
            Cash on Delivery (COD)
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-4 px-6 text-blue-500 bg-white border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors mt-2"
          >
            Cancel
          </button>
        </div>
        
        {/* Home indicator */}
        <div className="h-1 w-32 bg-black rounded-full mx-auto mb-2"></div>
      </div>
    </div>
  );
}
