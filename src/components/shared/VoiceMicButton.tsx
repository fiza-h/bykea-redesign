import { Mic } from 'lucide-react';
import { useState } from 'react';

interface VoiceMicButtonProps {
  label?: string;
  onVoiceInput?: (input: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export function VoiceMicButton({ label = 'Speak Destination', onVoiceInput, size = 'md' }: VoiceMicButtonProps) {
  const [isListening, setIsListening] = useState(false);

  const handleClick = () => {
    setIsListening(true);
    // Simulate voice input
    setTimeout(() => {
      setIsListening(false);
      onVoiceInput?.('DHA Phase 8 to Clifton');
    }, 2000);
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const iconSizes = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10'
  };

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-center gap-2">
      <button
        onClick={handleClick}
        className={`${sizeClasses[size]} rounded-full bg-[#00A859] hover:bg-[#008f4a] shadow-2xl flex items-center justify-center transition-all ${
          isListening ? 'scale-110 animate-pulse' : ''
        }`}
        aria-label="Voice input"
      >
        <Mic className={`${iconSizes[size]} text-white`} />
      </button>
      {label && (
        <span className="text-xs text-gray-700 bg-white px-3 py-1 rounded-full shadow-md">
          {isListening ? '🎤 Listening...' : label}
        </span>
      )}
    </div>
  );
}
