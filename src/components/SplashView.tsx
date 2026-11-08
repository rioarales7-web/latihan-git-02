import React from 'react';
import { 
  Sprout, 
  Anchor, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Thermometer, 
  MapPin, 
  TrendingUp, 
  CheckCircle2,
  Fish,
  Leaf
} from 'lucide-react';

interface SplashViewProps {
  onEnterApp: () => void;
  onExploreTraceability: () => void;
  onSelectCategory?: (category: 'agriculture' | 'fisheries') => void;
}

export const SplashView: React.FC<SplashViewProps> = ({ 
  onEnterApp, 
  onExploreTraceability,
  onSelectCategory 
}) => {
  return (
    <div className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#e8ffee]/60 rounded-3xl border border-emerald-900/10 shadow-organic-2 my-2 mx-auto max-w-7xl">
      {/* Dynamic Background Organic Aura */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#2D8A4E]/15 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-[#1A5276]/15 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#48BB78]/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      {/* Top Bar with Provenance Badges */}
      <div className="relative z-10 px-6 pt-6 sm:px-10 sm:pt-8 flex flex-wrap items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#2D8A4E] to-[#1A5276] p-[2px] shadow-sm flex items-center justify-center">
            <div className="w-full h-full bg-[#1B2E23] rounded-[14px] flex items-center justify-center text-white">
              <div className="relative">
                <Leaf className="w-5 h-5 text-[#88f9b0] -translate-x-1 -translate-y-0.5" />
                <Fish className="w-4 h-4 text-[#a3d4fe] absolute top-1.5 left-2" />
              </div>
            </div>
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-[#1B2E23]">
              AgroMarine<span className="text-[#2D8A4E]">Direct</span>
            </span>
            <div className="flex items-center gap-1.5 text-xs text-[#3f4940] font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-[#48BB78] animate-pulse" />
              <span>Direct-Trade Panen & Tangkapan Terbuka</span>
            </div>
          </div>
        </div>

        {/* Live Network Pill */}
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#2D8A4E]/15 text-xs font-semibold text-[#1B2E23] shadow-sm">
          <span className="px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2D8A4E] font-bold text-[11px]">
            ONLINE PROVENANCE
          </span>
          <span className="text-gray-400">|</span>
          <span className="flex items-center gap-1 text-emerald-800">
            <Thermometer className="w-3.5 h-3.5 text-[#1A5276]" />
            Cold-Chain 0°C – 4°C Aktif
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 px-6 py-8 sm:px-12 sm:py-12 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Screen Tag Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#2D8A4E]" />
          <span>Screen 1: Splash & Discovery</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1B2E23] leading-[1.15] max-w-4xl">
          Dari Tanah Vulkanik & Laut Lepas, <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#2D8A4E] via-[#006a34] to-[#1A5276] bg-clip-text text-transparent">
            Langsung ke Meja Kuliner Anda
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-[#3f4940] max-w-2xl leading-relaxed">
          Platform perdagangan langsung antara kelompok tani pegunungan dan armada nelayan bahari dengan restoran dan pembeli kuliner. Tanpa tengkulak, bergaransi rantai dingin, dan transparan asal-usul 100%.
        </p>

        {/* Dual Ecosystem Discovery Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl text-left">
          {/* Agriculture Portal */}
          <div 
            onClick={() => {
              if (onSelectCategory) onSelectCategory('agriculture');
              onEnterApp();
            }}
            className="group cursor-pointer p-4 rounded-2xl bg-white/95 hover:bg-white border border-[#2D8A4E]/20 hover:border-[#2D8A4E] transition-all shadow-organic-1 hover:shadow-organic-2 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] text-[#2D8A4E] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2D8A4E]">
                Ciwidey & Lembang
              </span>
            </div>
            <h3 className="mt-3 font-bold text-[#1B2E23] text-base group-hover:text-[#2D8A4E] transition-colors">
              Hasil Pertanian Organik
            </h3>
            <p className="text-xs text-[#3f4940] mt-1">
              Sayur dataran tinggi 1.450 mdpl, tomat beef vulkanik, baby buncis, dan cabai rawit petik hari ini.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#2D8A4E]">
              <span>Lihat Panen Hari Ini</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Marine Portal */}
          <div 
            onClick={() => {
              if (onSelectCategory) onSelectCategory('fisheries');
              onEnterApp();
            }}
            className="group cursor-pointer p-4 rounded-2xl bg-white/95 hover:bg-white border border-[#1A5276]/20 hover:border-[#1A5276] transition-all shadow-organic-1 hover:shadow-organic-2 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] text-[#1A5276] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Anchor className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#1A5276]">
                Sendangbiru & Muara Baru
              </span>
            </div>
            <h3 className="mt-3 font-bold text-[#1B2E23] text-base group-hover:text-[#1A5276] transition-colors">
              Tangkapan Laut Pesisir
            </h3>
            <p className="text-xs text-[#3f4940] mt-1">
              Tuna sirip kuning sashimi grade, udang vaname subuh, kerapu karang, dan cumi sero ikejime.
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#1A5276]">
              <span>Lihat Tangkapan Subuh</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="mt-9 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onEnterApp}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#2D8A4E] hover:bg-[#246F3E] text-white font-semibold text-base shadow-lg shadow-[#2D8A4E]/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            <span>Masuk ke Pasar Segar (Screen 2)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreTraceability}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-[#1A5276] font-semibold text-sm border-2 border-[#1A5276] transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#1A5276]" />
            <span>Verifikasi Paspor Asal-Usul (Trace)</span>
          </button>
        </div>
      </div>

      {/* Bottom Proof Metrics Bar */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md border-t border-[#2D8A4E]/10 px-6 py-5 sm:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[#2D8A4E] font-bold text-xl sm:text-2xl">
              <TrendingUp className="w-5 h-5" />
              <span>1.420 kg</span>
            </div>
            <span className="text-xs text-[#3f4940] mt-0.5 font-medium">Panen & Tangkapan Hari Ini</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[#1A5276] font-bold text-xl sm:text-2xl">
              <ShieldCheck className="w-5 h-5" />
              <span>0% Potongan</span>
            </div>
            <span className="text-xs text-[#3f4940] mt-0.5 font-medium">Direct-Trade Tanpa Tengkulak</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[#2D8A4E] font-bold text-xl sm:text-2xl">
              <Clock className="w-5 h-5" />
              <span>&lt; 6 Jam</span>
            </div>
            <span className="text-xs text-[#3f4940] mt-0.5 font-medium">Dari Kebun/Laut ke Dapur</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1.5 text-[#1A5276] font-bold text-xl sm:text-2xl">
              <CheckCircle2 className="w-5 h-5" />
              <span>0°C – 4°C</span>
            </div>
            <span className="text-xs text-[#3f4940] mt-0.5 font-medium">Garansi Rantai Dingin Terpadu</span>
          </div>
        </div>
      </div>
    </div>
  );
};
