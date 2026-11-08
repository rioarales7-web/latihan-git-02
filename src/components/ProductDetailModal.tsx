import React, { useState } from 'react';
import { Product } from '../types';
import { 
  X, 
  MapPin, 
  ShieldCheck, 
  Thermometer, 
  Clock, 
  Minus, 
  Plus, 
  ShoppingBag, 
  MessageSquare, 
  QrCode, 
  Sparkles, 
  ChefHat, 
  Check, 
  ArrowRight,
  TrendingDown,
  Info
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onProducerClick: (producerId: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onDirectInquiry: (product: Product) => void;
  onViewTraceability: (product: Product) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onProducerClick,
  onAddToCart,
  onDirectInquiry,
  onViewTraceability,
  onBuyNow,
}) => {
  const [selectedImg, setSelectedImg] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(product.minimumOrder || 1);
  const [addedNotice, setAddedNotice] = useState(false);

  const isAgri = product.category === 'agriculture';

  // Calculate active discount based on quantity
  const activeDiscount = product.wholesaleDiscounts
    .filter((d) => quantity >= d.minKg)
    .sort((a, b) => b.minKg - a.minKg)[0];

  const discountPercent = activeDiscount ? activeDiscount.discountPercent : 0;
  const unitPriceAfterDiscount = Math.round(product.pricePerUnit * (1 - discountPercent / 100));
  const totalPrice = unitPriceAfterDiscount * quantity;

  const formatRupiah = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1800);
  };

  const handleDirectPurchase = () => {
    onBuyNow(product, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-organic-3 border border-[#E2EBE5] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 text-gray-700 hover:text-black hover:bg-white flex items-center justify-center shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Column: Visual Media & Provenance Badges */}
          <div className="p-6 bg-[#F7FAF8] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E2EBE5]">
            <div>
              {/* Main Image with aspect ratio */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-organic-1 bg-white border border-[#E2EBE5]">
                <img
                  src={selectedImg}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />

                {/* Direct Origin Tag */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[rgba(27,46,35,0.8)] backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                  <span className={`w-2 h-2 rounded-full ${isAgri ? 'bg-[#88f9b0]' : 'bg-[#a3d4fe]'}`} />
                  <span>{isAgri ? 'Petani Langsung' : 'Nelayan Langsung'}</span>
                </div>

                {/* Lot ID Chip */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-sm text-white font-mono text-[11px] flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{product.lotId}</span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {product.galleryImages.length > 1 && (
                <div className="flex items-center gap-2 mt-3">
                  {product.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImg(img)}
                      className={`relative aspect-square w-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImg === img ? 'border-[#2D8A4E] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="preview" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Live Provenance & Cold-Chain Sensor Card */}
            <div className="mt-6 bg-white rounded-2xl p-4 border border-[#2D8A4E]/15 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-[#1B2E23]">
                <span className="flex items-center gap-1.5 text-[#2D8A4E]">
                  <ShieldCheck className="w-4 h-4 text-[#2D8A4E]" />
                  <span>Audit Paspor Asal-Usul & Sensor IoT</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#E8F5E9] text-[#2D8A4E] text-[10px]">
                  Terverifikasi
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#F7FAF8] p-2.5 rounded-xl border border-gray-100">
                  <span className="text-gray-500 block text-[10px] font-medium">Waktu Panen/Pendaratan</span>
                  <span className="font-semibold text-[#1B2E23] flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#2D8A4E]" />
                    {product.harvestTimestamp}
                  </span>
                </div>

                <div className="bg-[#F7FAF8] p-2.5 rounded-xl border border-gray-100">
                  <span className="text-gray-500 block text-[10px] font-medium">Sensor Rantai Dingin</span>
                  <span className="font-semibold text-[#1A5276] flex items-center gap-1 mt-0.5">
                    <Thermometer className="w-3.5 h-3.5 text-[#1A5276]" />
                    {product.temperatureLogged}
                  </span>
                </div>
              </div>

              {/* View Full Traceability Screen Button */}
              <button
                onClick={() => onViewTraceability(product)}
                className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#2D8A4E] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Lihat Sertifikat & Riwayat Log Suhu (Screen 6)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Commodity Specifications, Pricing & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category Subtitle & Stock Pill */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2D8A4E]">
                  {product.category === 'agriculture' ? '🌱 Pertanian Organik' : '🌊 Tangkapan Laut Bahari'} • {product.subCategory}
                </span>

                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#E8F5E9] text-[#2D8A4E]">
                  {product.freshnessStatus}
                </span>
              </div>

              {/* Commodity Title */}
              <h1 className="text-xl sm:text-2xl font-bold text-[#1B2E23] leading-snug">
                {product.title}
              </h1>

              {/* Producer Micro-Card */}
              <div 
                onClick={() => onProducerClick(product.producerId)}
                className="mt-3 p-3 rounded-2xl bg-[#F7FAF8] border border-[#E2EBE5] hover:border-[#2D8A4E] cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.producerAvatar}
                    alt={product.producerName}
                    className="w-10 h-10 rounded-full object-cover border border-[#2D8A4E]/30"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#1B2E23] group-hover:text-[#2D8A4E]">
                        {product.producerName}
                      </span>
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2D8A4E]" />
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-gray-500">
                      <MapPin className="w-3 h-3 text-[#2D8A4E]" />
                      <span>{product.originMunicipality}</span>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-semibold text-[#2D8A4E] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Lihat Profil</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              {/* Description */}
              <div className="mt-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Deskripsi Panen & Budidaya
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-[#3f4940] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Culinary & Chef Notes */}
              <div className="mt-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-0.5">
                  <ChefHat className="w-4 h-4 text-amber-700" />
                  <span>Catatan Khusus Chef & Kuliner:</span>
                </div>
                <p className="text-amber-800">{product.culinaryNotes}</p>
              </div>

              {/* Wholesale Tier Discounts */}
              {product.wholesaleDiscounts.length > 0 && (
                <div className="mt-4 bg-[#F7FAF8] p-3 rounded-xl border border-[#E2EBE5]">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1B2E23] mb-1.5">
                    <TrendingDown className="w-3.5 h-3.5 text-[#2D8A4E]" />
                    <span>Diskon Grosir Restoran & Horeca:</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {product.wholesaleDiscounts.map((tier, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                          quantity >= tier.minKg
                            ? 'bg-[#E8F5E9] text-[#2D8A4E] border-[#2D8A4E] font-bold'
                            : 'bg-white text-gray-600 border-gray-200'
                        }`}
                      >
                        Beli &ge; {tier.minKg} {product.unit}: Hemat {tier.discountPercent}%
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Cluster */}
            <div className="mt-6 pt-4 border-t border-[#E2EBE5] space-y-4">
              {/* Pricing & Stepper Line */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-medium block">Total Taksiran:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#1B2E23]">
                      {formatRupiah(totalPrice)}
                    </span>
                    {discountPercent > 0 && (
                      <span className="text-xs line-through text-gray-400">
                        {formatRupiah(product.pricePerUnit * quantity)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Weight Stepper */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Kuantitas:</span>
                  <div className="inline-flex items-center bg-[#F7FAF8] border border-[#E2EBE5] rounded-2xl p-1">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-[#1B2E23] hover:bg-white active:scale-90 transition-all disabled:opacity-40"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 text-sm font-bold text-[#1B2E23] min-w-[60px] text-center">
                      {quantity} {product.unit}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-[#1B2E23] hover:bg-white active:scale-90 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons (Primary, Secondary, Direct Inquiry) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* Add to Cart */}
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    addedNotice
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#E8F5E9] text-[#2D8A4E] hover:bg-[#d8eedb] active:scale-98'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Masuk Keranjang</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>+ Keranjang</span>
                    </>
                  )}
                </button>

                {/* Direct Buy */}
                <button
                  type="button"
                  onClick={handleDirectPurchase}
                  className="py-3 px-3 rounded-2xl text-xs sm:text-sm font-semibold bg-[#2D8A4E] hover:bg-[#246F3E] text-white shadow-md active:scale-98 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Beli Langsung</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Direct Farmer Inquiry */}
                <button
                  type="button"
                  onClick={() => onDirectInquiry(product)}
                  className="py-3 px-3 rounded-2xl text-xs sm:text-sm font-semibold border-2 border-[#1A5276] text-[#1A5276] hover:bg-[#E0F2FE]/50 active:scale-98 transition-all flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Tanya Petani</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
