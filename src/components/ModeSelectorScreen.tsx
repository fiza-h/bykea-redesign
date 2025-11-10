import { UserRound, Volume2 } from 'lucide-react';
import bykeaLogo from '/Users/fiza.hussain/Desktop/bykea/my-ride-app/src/assets/dc0bc47fa2fec076d60fa057460579f7632c4188.png';

interface ModeSelectorScreenProps {
  onSelectMode: (mode: 'standard' | 'senior' | 'illiterate') => void;
}

export function ModeSelectorScreen({ onSelectMode }: ModeSelectorScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00ab31] to-[#00ab31] flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="mb-12 text-center">
        <img 
          src={bykeaLogo} 
          alt="Bykea" 
          className="w-40 h-40 mx-auto mb-4 object-contain"
        />
        <p className="text-white/80 text-lg">Select Your Mode</p>
      </div>

      {/* Mode Cards */}
      <div className="w-full max-w-md space-y-4">
        {/* Standard Mode */}
        <button
          onClick={() => onSelectMode('standard')}
          className="w-full bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#F5F5F5] rounded-2xl flex items-center justify-center flex-shrink-0">
              <UserRound className="h-8 w-8 text-[#00A859]" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-gray-900 mb-1">Standard Mode</h3>
              <p className="text-sm text-gray-600">Regular booking experience</p>
            </div>
          </div>
        </button>

        {/* Senior Citizens Mode */}
        <button
          onClick={() => onSelectMode('senior')}
          className="w-full bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#F5F5F5] rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-4xl">👴</span>
            </div>
            <div className="text-left flex-1">
              <h3 className="text-gray-900 mb-1">Senior Citizens</h3>
              <p className="text-sm text-gray-600">Larger text & simple interface</p>
            </div>
          </div>
        </button>

        {/* Voice-Only Mode */}
        <button
          onClick={() => onSelectMode('illiterate')}
          className="w-full bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#F5F5F5] rounded-2xl flex items-center justify-center flex-shrink-0">
              <Volume2 className="h-8 w-8 text-[#00A859]" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-gray-900 mb-1">Voice Mode</h3>
              <p className="text-sm text-gray-600">Icon & voice-based navigation</p>
            </div>
          </div>
        </button>
      </div>

      {/* Footer */}
      <p className="text-white/60 text-sm mt-12 text-center">
        Your preference will be saved for future use
      </p>
    </div>
  );
}
