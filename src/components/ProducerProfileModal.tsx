import React from 'react';
import { Producer, Product } from '../types';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Calendar, 
  Users, 
  Award, 
  Star, 
  MessageSquare, 
  Sprout, 
  Anchor, 
  ArrowRight,
  TrendingUp,
  Compass
} from 'lucide-react';

interface ProducerProfileModalProps {
  producer: Producer;
  products: Product[];
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onDirectInquiry: (producer: Producer) => void;
}

export const ProducerProfileModal: React.FC<ProducerProfileModalProps> = ({
  producer,
  products,
  onClose,
  onSelectProduct,
  onDirectInquiry,
}) => {
  const isFarmer = producer.type === 'farmer';
  const producerProducts = products.filter((p) => p.producerId === producer.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-organic-3 border border-[#E2EBE5] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 text-gray-700 hover:text-black flex items-center justify-center shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header Banner */}
        <div className={`p-6 sm:p-8 ${isFarmer ? 'bg-gradient-to-r from-[#2D8A4E]/20 via-[#E8F5E9] to-emerald-50' : 'bg-gradient-to-r from-[#1A5276]/20 via-[#E0F2FE] to-cyan-50'} border-b border-[#E2EBE5]`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <img
              src={producer.avatar}
              alt={producer.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-white shadow-md shrink-0"
            />
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  isFarmer ? 'bg-[#2D8A4E] text-white' : 'bg-[#1A5276] text-white'
                }`}>
                  {isFarmer ? '🌱 Kelompok Tani Mitra' : '🌊 Koperasi Nelayan Pesisir'}
                </span>
                <span className="text-xs font-semibold text-[#1B2E23] flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded-full">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{producer.rating} / 5.0 (Kepuasan Restoran)</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#1B2E23]">
                {producer.name}
              </h1>
              <p className="text-sm font-semibold text-[#2D8A4E] mt-0.5">
                {producer.cooperativeName}
              </p>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-gray-600 mt-2">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#2D8A4E]" />
                  <span>{producer.municipality}, {producer.province}</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-[11px] text-gray-500">
                  <Compass className="w-3.5 h-3.5 text-gray-400" />
                  <span>{producer.coordinates}</span>
                </div>
              </div>
            </div>

            {/* Direct message button */}
            <button
              onClick={() => onDirectInquiry(producer)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-gray-50 border-2 border-[#1A5276] text-[#1A5276] text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Hubungi Langsung</span>
            </button>
          </div>

          {/* Verification Badges Row */}
          <div className="mt-5 flex flex-wrap gap-2">
            {producer.verifiedBadges.map((badge, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-emerald-300 text-xs font-medium text-[#1B2E23] shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#2D8A4E]" />
                <span>{badge}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#F7FAF8] p-3.5 rounded-2xl border border-[#E2EBE5] text-center">
              <span className="text-gray-500 text-xs font-medium">Mitra Sejak</span>
              <p className="text-lg font-bold text-[#1B2E23] mt-0.5">{producer.establishedYear}</p>
            </div>
            <div className="bg-[#F7FAF8] p-3.5 rounded-2xl border border-[#E2EBE5] text-center">
              <span className="text-gray-500 text-xs font-medium">Anggota Aktif</span>
              <p className="text-lg font-bold text-[#1B2E23] mt-0.5">{producer.membersCount} Orang</p>
            </div>
            <div className="bg-[#F7FAF8] p-3.5 rounded-2xl border border-[#E2EBE5] text-center">
              <span className="text-gray-500 text-xs font-medium">{isFarmer ? 'Luas Lahan' : 'Armada Laut'}</span>
              <p className="text-xs sm:text-sm font-bold text-[#1B2E23] mt-1 line-clamp-2">{producer.hectaresOrVessels}</p>
            </div>
            <div className="bg-[#F7FAF8] p-3.5 rounded-2xl border border-[#E2EBE5] text-center">
              <span className="text-gray-500 text-xs font-medium">Total Terdistribusi</span>
              <p className="text-lg font-bold text-[#2D8A4E] mt-0.5">{(producer.totalHarvestKg / 1000).toFixed(0)} Ton</p>
            </div>
          </div>

          {/* Philosophy / Bio */}
          <div>
            <h3 className="text-sm font-bold text-[#1B2E23] uppercase tracking-wider mb-2">
              Profil & Metode Kerja Berkelanjutan
            </h3>
            <p className="text-sm text-[#3f4940] leading-relaxed bg-[#F7FAF8] p-4 rounded-2xl border border-[#E2EBE5]">
              {producer.bio}
            </p>
          </div>

          {/* Upcoming Harvest / Landing Calendar */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#1B2E23] uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#2D8A4E]" />
                <span>Jadwal Panen & Pendaratan Kapal Mendatang</span>
              </h3>
              <span className="text-xs text-gray-500">Bisa pre-order kuota restoran</span>
            </div>

            <div className="space-y-2">
              {producer.upcomingHarvest.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white border border-[#E2EBE5] flex items-center justify-between shadow-xs hover:border-[#2D8A4E] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#2D8A4E] flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#1B2E23]">{item.item}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <span>Estimasi jadwal:</span>
                        <span className="font-semibold text-emerald-800">{item.date}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-[#2D8A4E] bg-[#E8F5E9] px-2.5 py-1 rounded-full">
                      ~ {item.estimatedKg} kg
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Active Commodities by this Producer */}
          <div>
            <h3 className="text-sm font-bold text-[#1B2E23] uppercase tracking-wider mb-3">
              Komoditas Aktif dari {producer.name} ({producerProducts.length})
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {producerProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onSelectProduct(prod)}
                  className="p-3 rounded-2xl bg-white border border-[#E2EBE5] hover:border-[#2D8A4E] hover:shadow-md cursor-pointer transition-all flex items-center gap-3 group"
                >
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-bold text-[#1B2E23] group-hover:text-[#2D8A4E] line-clamp-1">
                      {prod.title}
                    </h4>
                    <p className="text-xs text-gray-500">{prod.subCategory}</p>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-xs font-bold text-[#1B2E23]">
                        Rp {prod.pricePerUnit.toLocaleString('id-ID')} /{prod.unit}
                      </span>
                      <span className="text-[11px] font-semibold text-[#2D8A4E] flex items-center gap-0.5">
                        <span>Lihat Detail</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
