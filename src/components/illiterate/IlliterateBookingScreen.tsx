import { ArrowLeft, Volume2, CheckCircle, MapPin, Mic } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { BottomNavbar } from '../shared/BottomNavbar';

export function IlliterateBookingScreen({
  onBack,
  onConfirmRide,
}: {
  onBack: () => void;
  onConfirmRide: (selectedRide: string) => void;
}) {
  const [step, setStep] = useState<'pickup' | 'drop' | 'ride' | 'confirm'>('pickup');
  const [selectedPickup, setSelectedPickup] = useState<string | null>(null);
  const [selectedDrop, setSelectedDrop] = useState<string | null>(null);
  const [customPickup, setCustomPickup] = useState('');
  const [customDrop, setCustomDrop] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // ✅ Load saved locations
  useEffect(() => {
    const savedPickup = localStorage.getItem('illiterate_pickup');
    const savedDrop = localStorage.getItem('illiterate_drop');
    if (savedPickup) setSelectedPickup(savedPickup);
    if (savedDrop) setSelectedDrop(savedDrop);
  }, []);

  // ✅ Initialize voice recognition (browser-based)
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'ur-PK'; // Urdu/Pakistan
      recognition.interimResults = false;
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (step === 'pickup') setCustomPickup(transcript);
        else if (step === 'drop') setCustomDrop(transcript);
        setListening(false);
      };
      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
    }
  }, [step]);

  const startListening = () => {
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
    } else {
      alert('Speech recognition not supported on this device.');
    }
  };

  const pickupOptions = [
    { id: 'home', label: '🏠 گھر' },
    { id: 'market', label: '🛍️ مارکیٹ' },
    { id: 'hospital', label: '🏥 اسپتال' },
    { id: 'office', label: '🏢 دفتر' },
    { id: 'current', label: '📍 موجودہ مقام' },
  ];

  const dropOptions = [
    { id: 'bazaar', label: '🛒 بازار' },
    { id: 'school', label: '🏫 اسکول' },
    { id: 'friend', label: '👫 دوست کا گھر' },
    { id: 'mall', label: '🏬 مال' },
  ];

  const rideOptions = [
    { id: 'bike', emoji: '🏍️', name: 'بائیک', price: 150 },
    { id: 'rickshaw', emoji: '🛺', name: 'رکشہ', price: 220 },
    { id: 'car', emoji: '🚗', name: 'کار', price: 350 },
    { id: 'car-ac', emoji: '🚙', name: 'کار AC', price: 450 },
  ];

  // Handle Selects
  const handlePickupSelect = (id: string | null, isCustom = false) => {
    if (isCustom && customPickup.trim()) {
      localStorage.setItem('illiterate_pickup', customPickup);
      setSelectedPickup(customPickup);
    } else if (id) {
      setSelectedPickup(id);
      localStorage.setItem('illiterate_pickup', id);
    }
    setTimeout(() => setStep('drop'), 400);
  };

  const handleDropSelect = (id: string | null, isCustom = false) => {
    if (isCustom && customDrop.trim()) {
      localStorage.setItem('illiterate_drop', customDrop);
      setSelectedDrop(customDrop);
    } else if (id) {
      setSelectedDrop(id);
      localStorage.setItem('illiterate_drop', id);
    }
    setTimeout(() => setStep('ride'), 400);
  };

  const handleRideSelect = (rideId: string) => {
    setStep('confirm');
    setTimeout(() => onConfirmRide(rideId), 1200);
  };

  const getLabel = (val: string | null, list: { id: string; label: string }[]) =>
    list.find((x) => x.id === val)?.label || val || '—';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00A859] to-[#008f4a] text-white flex flex-col justify-between">
      {/* Header */}
      <div className="bg-[#00A859] px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-3 hover:bg-white/20 rounded-xl transition-colors min-w-[48px] min-h-[48px]"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">Bykea Ride</h1>
        <div className="flex items-center gap-2">
          <span>📶</span>
          <span>100%</span>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        {/* Step 1: Pickup */}
        {step === 'pickup' && (
          <>
            <Volume2 className="h-16 w-16 mb-4" />
            <p className="text-3xl mb-4 font-bold">اپنا مقام منتخب کریں یا نیا شامل کریں</p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-4">
              {pickupOptions.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePickupSelect(p.id)}
                  className={`bg-white text-[#00A859] text-2xl font-bold rounded-3xl py-4 shadow-xl hover:scale-105 transition-all ${
                    selectedPickup === p.id ? 'ring-4 ring-yellow-400' : ''
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Custom Location Input */}
            <div className="w-full max-w-sm flex gap-2 items-center">
              <input
                type="text"
                value={customPickup}
                onChange={(e) => setCustomPickup(e.target.value)}
                placeholder="اپنا نیا مقام لکھیں..."
                className="flex-1 p-4 rounded-3xl text-lg text-gray-800 outline-none"
              />
              <button
                onClick={startListening}
                className={`p-4 rounded-full ${
                  listening ? 'bg-yellow-400 text-black' : 'bg-white text-[#00A859]'
                } shadow-xl`}
              >
                <Mic className="h-6 w-6" />
              </button>
            </div>

            <button
              onClick={() => handlePickupSelect(null, true)}
              disabled={!customPickup.trim()}
              className="mt-4 bg-white text-[#00A859] font-bold rounded-3xl py-4 px-10 shadow-lg text-xl hover:scale-105 transition-all disabled:opacity-50"
            >
              محفوظ کریں اور آگے بڑھیں
            </button>
          </>
        )}

        {/* Step 2: Drop */}
        {step === 'drop' && (
          <>
            <Volume2 className="h-16 w-16 mb-4" />
            <p className="text-3xl mb-4 font-bold">اپنی منزل منتخب کریں یا نیا شامل کریں</p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-4">
              {dropOptions.map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleDropSelect(d.id)}
                  className={`bg-white text-[#00A859] text-2xl font-bold rounded-3xl py-4 shadow-xl hover:scale-105 transition-all ${
                    selectedDrop === d.id ? 'ring-4 ring-yellow-400' : ''
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Custom Drop */}
            <div className="w-full max-w-sm flex gap-2 items-center">
              <input
                type="text"
                value={customDrop}
                onChange={(e) => setCustomDrop(e.target.value)}
                placeholder="اپنی نئی منزل لکھیں..."
                className="flex-1 p-4 rounded-3xl text-lg text-gray-800 outline-none"
              />
              <button
                onClick={startListening}
                className={`p-4 rounded-full ${
                  listening ? 'bg-yellow-400 text-black' : 'bg-white text-[#00A859]'
                } shadow-xl`}
              >
                <Mic className="h-6 w-6" />
              </button>
            </div>

            <button
              onClick={() => handleDropSelect(null, true)}
              disabled={!customDrop.trim()}
              className="mt-4 bg-white text-[#00A859] font-bold rounded-3xl py-4 px-10 shadow-lg text-xl hover:scale-105 transition-all disabled:opacity-50"
            >
              محفوظ کریں اور آگے بڑھیں
            </button>
          </>
        )}

        {/* Step 3: Ride */}
        {step === 'ride' && (
          <>
            <MapPin className="h-14 w-14 mb-4 text-yellow-300" />
            <p className="text-3xl mb-2 font-bold">مقام کی تصدیق</p>
            <div className="bg-white/20 p-4 rounded-3xl mb-6 w-full max-w-xs">
              <p className="text-lg">
                🟢 مقام: {getLabel(selectedPickup, pickupOptions)}
              </p>
              <p className="text-lg">
                🟣 منزل: {getLabel(selectedDrop, dropOptions)}
              </p>
            </div>

            <p className="text-3xl mb-4 font-bold">اپنی سواری منتخب کریں</p>
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              {rideOptions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => handleRideSelect(r.id)}
                  className="bg-white text-[#00A859] rounded-3xl p-5 shadow-xl hover:scale-105 transition-all flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-6xl">{r.emoji}</span>
                  <span className="text-2xl font-bold">{r.name}</span>
                  <span className="text-lg text-gray-700">Rs. {r.price}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 4: Confirmation */}
        {step === 'confirm' && (
          <>
            <CheckCircle className="h-20 w-20 text-yellow-400 mb-6 animate-bounce" />
            <p className="text-3xl font-bold">آپ کی سواری منتخب ہو گئی!</p>
            <p className="text-xl text-white/90 mt-3">تصدیق ہو رہی ہے...</p>
          </>
        )}
      </div>

      <BottomNavbar activeTab="home" />
    </div>
  );
}
