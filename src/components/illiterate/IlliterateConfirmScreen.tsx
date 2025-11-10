import { Volume2, MapPin, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

interface IlliterateConfirmScreenProps {
  onConfirm: () => void;
  type: 'ride' | 'parcel';
}

export function IlliterateConfirmScreen({ onConfirm, type }: IlliterateConfirmScreenProps) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Auto-confirm after countdown
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onConfirm();
    }
  }, [countdown, onConfirm]);

  const icon = type === 'ride' ? '🚖' : '📦';
  const urduText = type === 'ride' ? 'سفر' : 'پارسل';
  const romanText = type === 'ride' ? 'Safar' : 'Parcel';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00A859] to-[#008f4a] flex flex-col items-center justify-center p-6">
      {/* Large Icon */}
      <div className="mb-8 animate-bounce">
        <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center shadow-2xl">
          <span className="text-9xl">{icon}</span>
        </div>
      </div>

      {/* Text with Audio Indicator */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Volume2 className="h-12 w-12 text-yellow-400 animate-pulse" />
          <span className="text-white text-6xl">{urduText}</span>
        </div>
        <p className="text-white text-3xl">{romanText}</p>
      </div>

      {/* Countdown */}
      <div className="text-center">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
          <span className="text-white text-5xl">{countdown}</span>
        </div>
        <p className="text-white/90 text-xl">تصدیق ہو رہی ہے...</p>
        <p className="text-white/70">Confirming...</p>
      </div>

      {/* Manual Confirm Button */}
      <button
        onClick={onConfirm}
        className="mt-12 w-full max-w-sm bg-yellow-400 hover:bg-yellow-300 text-gray-900 rounded-3xl p-6 shadow-2xl transition-all hover:scale-105"
      >
        <div className="flex items-center justify-center gap-3">
          <Check className="h-8 w-8" />
          <span className="text-2xl">✓ تصدیق کریں</span>
        </div>
      </button>
    </div>
  );
}
