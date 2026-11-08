import React, { useState, useMemo } from 'react';
import { Product, Producer, Ecosystem } from '../types';
import { ProductCard } from './ProductCard';
import { PRODUCERS, LIVE_ACTIVITY_FEED } from '../data/mockData';
import { 
  Sprout, 
  Fish, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  MapPin, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  X,
  Truck,
  Flame,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface MarketplaceViewProps {
  products: Product[];
  selectedCategory: Ecosystem;
  onSelectCategory: (cat: Ecosystem) => void;
  onSelectProduct: (product: Product) => void;
  onSelectProducer: (producerId: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onDirectInquiry: (product: Product) => void;
  cartItemsCount: number;
  onOpenCart: () => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onSelectProducer,
  onAddToCart,
  onDirectInquiry,
  cartItemsCount,
  onOpenCart,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [freshFilter, setFreshFilter] = useState<'all' | 'harvestToday' | 'lowStock' | 'gradeA' | 'organic'>('all');
  const [sortOption, setSortOption] = useState<'recommended' | 'priceLow' | 'priceHigh' | 'stock'>('recommended');

  // Filter products based on search, ecosystem category, and sub-filter
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category ecosystem
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchOrigin = p.originMunicipality.toLowerCase().includes(q);
        const matchProducer = p.producerName.toLowerCase().includes(q);
        const matchSub = p.subCategory.toLowerCase().includes(q);
        if (!matchTitle && !matchOrigin && !matchProducer && !matchSub) return false;
      }
      // Freshness sub-filter
      if (freshFilter === 'harvestToday' && p.freshnessStatus !== 'Panen Hari Ini') return false;
      if (freshFilter === 'lowStock' && p.freshnessStatus !== 'Sisa < 20 kg') return false;
      if (freshFilter === 'gradeA' && p.freshnessStatus !== 'Grade A Restoran') return false;
      if (freshFilter === 'organic' && !p.organicCertified) return false;

      return true;
    }).sort((a, b) => {
      if (sortOption === 'priceLow') return a.pricePerUnit - b.pricePerUnit;
      if (sortOption === 'priceHigh') return b.pricePerUnit - a.pricePerUnit;
      if (sortOption === 'stock') return b.stockAvailable - a.stockAvailable;
      return 0; // recommended order
    });
  }, [products, selectedCategory, searchQuery, freshFilter, sortOption]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Top Banner: Direct Harvest & Tide Status */}
      <div className="bg-gradient-to-r from-[#2D8A4E]/10 via-[#F7FAF8] to-[#1A5276]/10 border border-[#2D8A4E]/20 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-organic-1">
        <div className="flex items-center gap-3.5 text-left">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#2D8A4E]/20 flex items-center justify-center text-[#2D8A4E] shadow-sm shrink-0">
            <Sparkles className="w-6 h-6 text-[#2D8A4E]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D8A4E] bg-[#E8F5E9] px-2 py-0.5 rounded-full">
                Siklus Panen & Pendaratan Langsung
              </span>
              <span className="text-xs text-gray-500 font-mono hidden sm:inline">Pembaruan Subuh 05:00 WIB</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[#1B2E23] mt-0.5">
              1.420 kg Komoditas Segar Telah Didaratkan & Dipanen Pagi Ini
            </h2>
            <p className="text-xs text-[#3f4940]">
              Sayur dataran tinggi Ciwidey & Lembang serta ikan laut Sendangbiru & Muara Baru siap dikirim ke dapur Anda.
            </p>
          </div>
        </div>

        {/* Live Ticker Item */}
        <div className="w-full md:w-auto shrink-0 bg-white/90 backdrop-blur-md rounded-xl p-3 border border-[#E2EBE5] text-xs">
          <div className="flex items-center gap-2 font-semibold text-[#1B2E23] mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[11px] text-[#2D8A4E] uppercase font-bold tracking-wider">Aktivitas Terkini:</span>
          </div>
          <p className="text-gray-700 font-medium truncate max-w-xs sm:max-w-sm">
            {LIVE_ACTIVITY_FEED[0].time} — {LIVE_ACTIVITY_FEED[0].text}
          </p>
        </div>
      </div>

      {/* Search and Ecosystem Category Switcher */}
      <div className="bg-white rounded-2xl border border-[#E2EBE5] p-4 sm:p-5 shadow-organic-1 space-y-4">
        {/* Search Input Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari komoditas (misal: Tuna Sirip Kuning, Tomat Beef, Udang, Ciwidey)..."
              className="w-full pl-10 pr-10 py-2.5 bg-[#F7FAF8] hover:bg-white focus:bg-white rounded-xl border border-[#E2EBE5] focus:border-[#2D8A4E] focus:ring-2 focus:ring-[#2D8A4E]/20 text-sm text-[#1B2E23] placeholder:text-gray-400 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-400 hidden sm:inline" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="px-3 py-2.5 bg-[#F7FAF8] rounded-xl border border-[#E2EBE5] text-xs font-semibold text-[#1B2E23] outline-none cursor-pointer hover:border-[#2D8A4E]"
            >
              <option value="recommended">Urutkan: Rekomendasi Tersegar</option>
              <option value="priceLow">Harga: Terendah ke Tertinggi</option>
              <option value="priceHigh">Harga: Tertinggi ke Terendah</option>
              <option value="stock">Stok: Kuantitas Terbanyak</option>
            </select>
          </div>
        </div>

        {/* Primary Ecosystem Toggle Tabs (from brand spec) */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-[#E2EBE5]">
          <span className="text-xs font-semibold text-[#6f7a6f] mr-1">Ekosistem:</span>

          {/* All */}
          <button
            onClick={() => onSelectCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#1B2E23] text-white shadow-sm'
                : 'bg-white text-[#6B7280] border border-[#E2EBE5] hover:border-gray-400'
            }`}
          >
            Semua Hasil Bumi & Laut ({products.length})
          </button>

          {/* Agriculture Chip (Spec: Selected Agriculture: #E8F5E9 background with #2D8A4E text and border) */}
          <button
            onClick={() => onSelectCategory('agriculture')}
            className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              selectedCategory === 'agriculture'
                ? 'bg-[#E8F5E9] text-[#2D8A4E] border border-[#2D8A4E] shadow-sm font-bold'
                : 'bg-white text-[#6B7280] border border-[#E2EBE5] hover:border-[#2D8A4E]/50'
            }`}
          >
            <Sprout className="w-3.5 h-3.5 text-[#2D8A4E]" />
            <span>🌾 Pertanian & Sayur Organik</span>
          </button>

          {/* Fisheries Chip (Spec: Selected Fisheries: #E0F2FE background with #1A5276 text and border) */}
          <button
            onClick={() => onSelectCategory('fisheries')}
            className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              selectedCategory === 'fisheries'
                ? 'bg-[#E0F2FE] text-[#1A5276] border border-[#1A5276] shadow-sm font-bold'
                : 'bg-white text-[#6B7280] border border-[#E2EBE5] hover:border-[#1A5276]/50'
            }`}
          >
            <Fish className="w-3.5 h-3.5 text-[#1A5276]" />
            <span>🐟 Tangkapan Laut Segar</span>
          </button>
        </div>

        {/* Secondary Filter & Origin Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-medium text-[#6f7a6f] mr-1">Status Panen:</span>

          <button
            onClick={() => setFreshFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              freshFilter === 'all'
                ? 'bg-emerald-100 text-[#2D8A4E] font-semibold'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Semua Status
          </button>

          <button
            onClick={() => setFreshFilter('harvestToday')}
            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
              freshFilter === 'harvestToday'
                ? 'bg-[#E8F5E9] text-[#2D8A4E] border border-[#2D8A4E] font-semibold'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#2D8A4E]" />
            <span>Panen Hari Ini</span>
          </button>

          <button
            onClick={() => setFreshFilter('lowStock')}
            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
              freshFilter === 'lowStock'
                ? 'bg-[#FEF3C7] text-[#D97706] border border-[#D97706] font-semibold'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Flame className="w-3 h-3 text-[#D97706]" />
            <span>Sisa &lt; 20 kg (Cepat Habis)</span>
          </button>

          <button
            onClick={() => setFreshFilter('gradeA')}
            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
              freshFilter === 'gradeA'
                ? 'bg-[#E0F2FE] text-[#1A5276] border border-[#1A5276] font-semibold'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-[#1A5276]" />
            <span>Grade A Restoran</span>
          </button>

          <button
            onClick={() => setFreshFilter('organic')}
            className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
              freshFilter === 'organic'
                ? 'bg-[#E8F5E9] text-[#2D8A4E] border border-[#2D8A4E] font-semibold'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Sprout className="w-3 h-3 text-[#2D8A4E]" />
            <span>Organik Terverifikasi</span>
          </button>
        </div>
      </div>

      {/* Verified Producer Carousel Section (Screen 4 Entry) */}
      <div className="bg-[#e8ffee]/50 rounded-2xl p-4 sm:p-5 border border-[#2D8A4E]/15">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-[#1B2E23] text-sm sm:text-base flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#2D8A4E]" />
              <span>Mitra Petani & Armada Nelayan Terverifikasi</span>
            </h3>
            <p className="text-xs text-[#3f4940]">
              Kenali langsung kelompok tani dan nelayan lokal di balik komoditas Anda.
            </p>
          </div>
          <span className="text-xs font-semibold text-[#2D8A4E] hidden sm:inline">
            4 Komunitas Aktif
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRODUCERS.map((producer) => (
            <div
              key={producer.id}
              onClick={() => onSelectProducer(producer.id)}
              className="bg-white p-3.5 rounded-xl border border-[#E2EBE5] hover:border-[#2D8A4E] shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-3 group"
            >
              <img
                src={producer.avatar}
                alt={producer.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-emerald-100 group-hover:scale-105 transition-transform shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#1B2E23] truncate group-hover:text-[#2D8A4E]">
                    {producer.name}
                  </h4>
                  <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded">
                    ★ {producer.rating}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 truncate">{producer.cooperativeName}</p>
                <div className="flex items-center gap-1 text-[10px] text-[#2D8A4E] mt-0.5">
                  <MapPin className="w-2.5 h-2.5 shrink-0" />
                  <span className="truncate">{producer.municipality}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Commodity Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-[#1B2E23]">
              Katalog Komoditas Segar Langsung
            </h3>
            <p className="text-xs text-[#6f7a6f]">
              Menampilkan {filteredProducts.length} hasil panen & tangkapan siap dikirim
            </p>
          </div>

          {/* Quick Cart Pill if items added */}
          {cartItemsCount > 0 && (
            <button
              onClick={onOpenCart}
              className="px-3.5 py-1.5 rounded-full bg-[#2D8A4E] text-white text-xs font-semibold flex items-center gap-2 hover:bg-[#246F3E] transition-all shadow-sm"
            >
              <span>{cartItemsCount} komoditas di keranjang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#E2EBE5] max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-[#1B2E23]">Tidak ada komoditas yang cocok</h4>
            <p className="text-xs text-gray-500 mt-1">
              Coba reset pencarian atau pilih kategori ekosistem lain untuk melihat panen lainnya.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFreshFilter('all');
                onSelectCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#2D8A4E] text-white text-xs font-semibold"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onProducerClick={onSelectProducer}
                onAddToCart={onAddToCart}
                onDirectInquiry={onDirectInquiry}
              />
            ))}
          </div>
        )}
      </div>

      {/* Direct-Trade Integrity Guarantee Banner */}
      <div className="bg-[#1B2E23] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Garansi Mutu Rantai Dingin & Asal Usul</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Transparansi Radikal: Dari Petik & Pendaratan ke Dapur Anda
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
            Setiap lot komoditas dilengkapi ID pelacakan QR digital, rekaman suhu transit, serta nama dan kontak kelompok tani/nelayan yang bertanggung jawab langsung.
          </p>
        </div>

        <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-xs text-left">
            <span className="text-emerald-300 font-bold block mb-0.5">Suhu Dingin Terkendali</span>
            <span className="text-gray-200">Sensor IoT 0°C – 4°C selama perjalanan armada van berpendingin.</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 text-xs text-left">
            <span className="text-emerald-300 font-bold block mb-0.5">Potongan Tengah 0%</span>
            <span className="text-gray-200">100% margin harga disalurkan ke kas koperasi tani dan nelayan.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
