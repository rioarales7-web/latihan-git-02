import React from 'react';
import { ScreenType } from '../types';
import { 
  Sparkles, 
  RotateCcw, 
  Smartphone, 
  Monitor, 
  Layers, 
  Compass, 
  ShoppingBag, 
  UserCheck, 
  QrCode,
  Store
} from 'lucide-react';

interface PrototypeBarProps {
  currentScreen: ScreenType;
  onNavigateScreen: (screen: ScreenType) => void;
  isMobileSimulator: boolean;
  onToggleMobileSimulator: () => void;
  onResetPrototype: () => void;
}

export const PrototypeBar: React.FC<PrototypeBarProps> = ({
  currentScreen,
  onNavigateScreen,
  isMobileSimulator,
  onToggleMobileSimulator,
  onResetPrototype,
}) => {
  const screens: { id: ScreenType; label: string; num: string; icon: any }[] = [
    { id: 'splash', label: '1. Splash', num: 'S1', icon: Sparkles },
    { id: 'marketplace', label: '2. Pasar Segar', num: 'S2', icon: Store },
    { id: 'detail', label: '3. Detail Komoditas', num: 'S3', icon: Layers },
    { id: 'producer', label: '4. Profil Petani', num: 'S4', icon: UserCheck },
    { id: 'cart', label: '5. Keranjang & Beli', num: 'S5', icon: ShoppingBag },
    { id: 'traceability', label: '6. Paspor Lot & Suhu', num: 'S6', icon: QrCode },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#1B2E23] text-white border-b border-emerald-900/60 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Prototype Info Pill */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-tight text-white flex items-center gap-1.5">
              <span>AgroMarine Direct</span>
              <span className="text-[10px] font-semibold bg-emerald-700/60 text-emerald-200 px-1.5 py-0.2 rounded font-mono">
                PROTOTYPE NAV SPEC
              </span>
            </span>
          </div>
        </div>

        {/* Screen Switcher Pills */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
          {screens.map((s) => {
            const Icon = s.icon;
            const isActive = currentScreen === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onNavigateScreen(s.id)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#2D8A4E] text-white shadow-sm ring-1 ring-emerald-300'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{s.label}</span>
                <span className="sm:hidden">{s.num}</span>
              </button>
            );
          })}
        </div>

        {/* Viewport and Reset Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile frame toggle */}
          <button
            onClick={onToggleMobileSimulator}
            className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 border transition-all ${
              isMobileSimulator
                ? 'bg-emerald-600 border-emerald-400 text-white'
                : 'bg-white/10 border-white/20 text-gray-300 hover:text-white'
            }`}
            title={isMobileSimulator ? 'Beralih ke Tampilan Penuh Layar' : 'Simulasikan Tampilan Mobile Phone'}
          >
            {isMobileSimulator ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span className="text-[11px] hidden md:inline">
              {isMobileSimulator ? 'Full View' : 'Mobile View'}
            </span>
          </button>

          {/* Reset Flow to Splash */}
          <button
            onClick={onResetPrototype}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border border-white/20 text-xs flex items-center gap-1 transition-all"
            title="Mulai Ulang Alur dari Screen 1: Splash"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[11px] hidden md:inline">Replay Splash</span>
          </button>
        </div>
      </div>
    </header>
  );
};
