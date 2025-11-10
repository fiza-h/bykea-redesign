import { Home, FileText, Wallet, User, ArrowLeft } from 'lucide-react';

interface TopNavbarProps {
  onBack?: () => void;
  showBackButton?: boolean;
  activeTab?: 'home' | 'bookings' | 'wallet' | 'profile';
  transparent?: boolean;
}

export function TopNavbar({ onBack, showBackButton = false, activeTab = 'home', transparent = false }: TopNavbarProps) {
  return (
    <div className={`${transparent ? 'bg-transparent' : 'bg-white border-b-2 border-gray-200'} px-4 py-2 flex items-center justify-between`}>
      {/* Back Button or Logo */}
      <div className="flex items-center gap-2">
        {showBackButton && onBack ? (
          <button
            onClick={onBack}
            className={`p-2 rounded-xl transition-colors ${
              transparent 
                ? 'hover:bg-white/20' 
                : 'hover:bg-gray-100'
            }`}
            aria-label="Go back"
          >
            <ArrowLeft className={`h-5 w-5 ${transparent ? 'text-white' : 'text-gray-700'}`} />
          </button>
        ) : (
          <div className="w-9"></div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-1">
        <button
          className={`p-2 rounded-xl transition-colors ${
            activeTab === 'home'
              ? 'bg-[#00A859] text-white'
              : transparent 
                ? 'text-white hover:bg-white/20' 
                : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Home"
        >
          <Home className="h-5 w-5" />
        </button>
        <button
          className={`p-2 rounded-xl transition-colors ${
            activeTab === 'bookings'
              ? 'bg-[#00A859] text-white'
              : transparent 
                ? 'text-white hover:bg-white/20' 
                : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Bookings"
        >
          <FileText className="h-5 w-5" />
        </button>
        <button
          className={`p-2 rounded-xl transition-colors ${
            activeTab === 'wallet'
              ? 'bg-[#00A859] text-white'
              : transparent 
                ? 'text-white hover:bg-white/20' 
                : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Wallet"
        >
          <Wallet className="h-5 w-5" />
        </button>
        <button
          className={`p-2 rounded-xl transition-colors ${
            activeTab === 'profile'
              ? 'bg-[#00A859] text-white'
              : transparent 
                ? 'text-white hover:bg-white/20' 
                : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Profile"
        >
          <User className="h-5 w-5" />
        </button>
      </div>

      {/* Spacer for balance */}
      <div className="w-9"></div>
    </div>
  );
}
