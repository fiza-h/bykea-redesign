import { Car, Package, Phone, Settings, ArrowLeft, Info } from 'lucide-react';
import { VoiceMicButton } from '../shared/VoiceMicButton';
import { BottomNavbar } from '../shared/BottomNavbar';
import { useState } from 'react';

interface SeniorHomeScreenProps {
  onNavigateToBooking: () => void;
  onNavigateToParcel?: () => void;
  onBack?: () => void;
}

export function SeniorHomeScreen({
  onNavigateToBooking,
  onNavigateToParcel,
  onBack,
}: SeniorHomeScreenProps) {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [showSettings, setShowSettings] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const fontSizeClasses = {
    normal: 'text-base',
    large: 'text-lg',
    xlarge: 'text-xl',
  };

  const tooltipText: Record<string, string> = {
    ride: 'Tap here to book a ride. The app will guide you step by step.',
    parcel: 'Send a parcel safely. Common addresses can be pre-saved.',
    helpline: 'Call our helpline for support or emergencies.',
  };

  const handleAction = (action: () => void, tipKey: string) => {
    setShowTooltip(tipKey);
    setTimeout(() => {
      setShowTooltip(null);
      action();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white pb-20 relative">
      {/* Top Bar */}
      <div className="bg-[#00A859] px-4 py-3 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="p-3 hover:bg-white/20 rounded-xl transition-colors min-w-[48px] min-h-[48px]"
              aria-label="Go back"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          )}
          <span className="text-lg font-semibold">9:30 AM</span>
        </div>
        <div className="flex items-center gap-2 text-lg">
          <span>📶</span>
          <span>100%</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-[#00A859] px-6 py-8 text-white">
        <div className="flex items-center justify-between mb-3">
          <h1 className={`${fontSizeClasses[fontSize]} text-3xl font-bold`}>
            Good Morning, Fatima
          </h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-3 bg-white/20 rounded-2xl hover:bg-white/30 transition-colors min-w-[48px] min-h-[48px]"
            aria-label="Open Settings"
          >
            <Settings className="h-7 w-7" />
          </button>
        </div>
        <p className={`${fontSizeClasses[fontSize]} text-white/90`}>
          How can we help you today?
        </p>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-[#F5F5F5] px-6 py-5 border-b-2 border-gray-200">
          <p className="mb-3 font-semibold text-gray-800">Text Size</p>
          <div className="flex gap-4">
            {(['normal', 'large', 'xlarge'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFontSize(s)}
                className={`px-6 py-3 rounded-2xl min-h-[48px] font-bold transition-all ${
                  fontSize === s
                    ? 'bg-[#00A859] text-white'
                    : 'bg-white text-gray-800 border-2 border-gray-300'
                }`}
              >
                <span
                  className={`${
                    s === 'xlarge'
                      ? 'text-2xl'
                      : s === 'large'
                      ? 'text-xl'
                      : 'text-base'
                  }`}
                >
                  A
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tooltip overlay */}
      {showTooltip && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white text-gray-900 p-6 rounded-3xl shadow-2xl max-w-sm text-center mx-4">
            <Info className="mx-auto mb-3 text-[#00A859] h-8 w-8" />
            <p className="text-xl font-medium">{tooltipText[showTooltip]}</p>
          </div>
        </div>
      )}

      {/* Main Actions */}
      <div className="p-6 space-y-6">
        {/* Book Ride */}
        <button
          onClick={() => handleAction(onNavigateToBooking, 'ride')}
          className="w-full bg-[#00A859] hover:bg-[#008f4a] text-white rounded-3xl p-10 shadow-xl transition-all hover:scale-105 active:scale-95 min-h-[130px] flex flex-col items-center justify-center"
        >
          <Car className="h-16 w-16 mb-3" strokeWidth={2.5} />
          <span className={`${fontSizeClasses[fontSize]} text-2xl font-semibold`}>
            Book a Ride
          </span>
        </button>

        {/* Send Parcel */}
        <button
          onClick={() => handleAction(onNavigateToParcel!, 'parcel')}
          className="w-full bg-[#F5F5F5] hover:bg-gray-200 text-gray-900 rounded-3xl p-10 shadow-lg transition-all hover:scale-105 active:scale-95 min-h-[130px] border-2 border-gray-300 flex flex-col items-center justify-center"
        >
          <Package className="h-16 w-16 mb-3" strokeWidth={2.5} />
          <span className={`${fontSizeClasses[fontSize]} text-2xl font-semibold`}>
            Send Parcel
          </span>
        </button>

        {/* Help Line */}
        <button
          onClick={() =>
            handleAction(() => alert('Calling help line...'), 'helpline')
          }
          className="w-full bg-[#FF5B00] hover:bg-[#e05200] text-white rounded-3xl p-10 shadow-xl transition-all hover:scale-105 active:scale-95 min-h-[130px] flex flex-col items-center justify-center"
        >
          <Phone className="h-16 w-16 mb-3" strokeWidth={2.5} />
          <span className={`${fontSizeClasses[fontSize]} text-2xl font-semibold`}>
            Help Line
          </span>
        </button>
      </div>

      {/* 🎤 Voice Mic — bottom-right above navbar */}
      <div className="fixed bottom-24 right-6 z-50">
        <VoiceMicButton label="Speak Destination" size="xl" />
      </div>

      {/* Bottom Navbar */}
      <BottomNavbar activeTab="home" />
    </div>
  );
}
