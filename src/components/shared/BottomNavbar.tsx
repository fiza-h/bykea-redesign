import { Home, FileText, Wallet, User } from 'lucide-react';

interface BottomNavbarProps {
  activeTab?: 'home' | 'bookings' | 'wallet' | 'profile';
}

export function BottomNavbar({ activeTab = 'home' }: BottomNavbarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 px-6 py-3 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        <button
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
            activeTab === 'home'
              ? 'text-[#00A859]'
              : 'text-gray-600'
          }`}
          aria-label="Home"
        >
          <Home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </button>
        <button
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
            activeTab === 'bookings'
              ? 'text-[#00A859]'
              : 'text-gray-600'
          }`}
          aria-label="Bookings"
        >
          <FileText className="h-6 w-6" />
          <span className="text-xs">Bookings</span>
        </button>
        <button
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
            activeTab === 'wallet'
              ? 'text-[#00A859]'
              : 'text-gray-600'
          }`}
          aria-label="Wallet"
        >
          <Wallet className="h-6 w-6" />
          <span className="text-xs">Wallet</span>
        </button>
        <button
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-colors ${
            activeTab === 'profile'
              ? 'text-[#00A859]'
              : 'text-gray-600'
          }`}
          aria-label="Profile"
        >
          <User className="h-6 w-6" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </div>
  );
}
