import { Volume2, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

interface IlliterateConfirmScreenProps {
  onConfirm: () => void;
  type: 'ride' | 'parcel';
}

export function IlliterateConfirmScreen({ onConfirm, type }: IlliterateConfirmScreenProps) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onConfirm();
    }
  }, [countdown, onConfirm]);

  const icon = type === 'ride' ? '🚖' : '📦';
  const urduText = type === 'ride' ? 'سفر شروع ہو گیا ہے' : 'پارسل روانہ ہو گیا ہے';
  const romanText = type === 'ride' ? 'Safar shuru ho gaya hai' : 'Parcel rawana ho gaya hai';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00A859] to-[#008f4a] flex flex-col items-center justify-center text-center p-6 text-white">
      {/* Main Icon */}
      <div className="w-56 h-56 bg-white rounded-full flex items-center justify-center shadow-2xl mb-8 animate-bounce">
        <span className="text-9xl">{icon}</span>
      </div>

      {/* Audio + Text */}
      <div className="mb-6">
        <Volume2 className="h-12 w-12 text-yellow-400 animate-pulse mx-auto mb-3" />
        <p className="text-5xl font-bold">{urduText}</p>
        <p className="text-white/80 text-2xl mt-2">{romanText}</p>
      </div>

      {/* Countdown + Progress */}
      <div className="mt-6 mb-10">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-3">
          <span className="text-4xl font-bold text-white">{countdown}</span>
        </div>
        <p className="text-white/80 text-lg">تصدیق ہو رہی ہے...</p>
        <p className="text-white/60 text-sm">Confirming...</p>
      </div>

      {/* Manual Confirm */}
      <button
        onClick={onConfirm}
        className="w-full max-w-xs bg-yellow-400 hover:bg-yellow-300 text-gray-900 text-2xl rounded-3xl p-6 flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-all"
      >
        <Check className="h-8 w-8" />
        ✓ تصدیق کریں
      </button>
    </div>
  );
}
