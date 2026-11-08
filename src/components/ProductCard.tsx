import React, { useState } from 'react';
import { Product } from '../types';
import { 
  ShieldCheck, 
  Plus, 
  Minus, 
  MessageSquare, 
  ShoppingBag, 
  Check, 
  MapPin, 
  Sparkles,
  ThermometerSnowflake
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onProducerClick: (producerId: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onDirectInquiry: (product: Product) => void;
  currentCartQty?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onProducerClick,
  onAddToCart,
  onDirectInquiry,
  currentCartQty = 0
}) => {
  const [quantity, setQuantity] = useState<number>(currentCartQty > 0 ? currentCartQty : 1);
  const [addedNotice, setAddedNotice] = useState(false);

  const isAgri = product.category === 'agriculture';

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newQty = quantity + 1;
    setQuantity(newQty);
    if (currentCartQty > 0) {
      onAddToCart(product, newQty);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      if (currentCartQty > 0) {
        onAddToCart(product, newQty);
      }
    }
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1600);
  };

  const handleDirectBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, quantity);
    onSelect(product);
  };

  // Format currency
  const formatRupiah = (val: number) => {
    return 'Rp ' + val.toLocaleString('id-ID');
  };

  return (
    <div 
      onClick={() => onSelect(product)}
      className="group cursor-pointer bg-white rounded-[16px] border border-[rgba(45,138,78,0.1)] shadow-organic-1 hover:shadow-organic-2 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
    >
      {/* 4:3 Image Header with Direct Tags & Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-emerald-50">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top-Left: Direct Tag (Frosted Glass) */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[rgba(27,46,35,0.75)] backdrop-blur-md text-white text-[11px] font-medium tracking-wide flex items-center gap-1.5 shadow-sm">
          <span className={`w-2 h-2 rounded-full ${isAgri ? 'bg-[#88f9b0]' : 'bg-[#a3d4fe]'}`} />
          <span className="truncate max-w-[170px]">
            {isAgri ? 'Petani Langsung: ' : 'Nelayan: '} 
            <span className="font-semibold">{product.producerName.replace('Kelompok Tani ', '').replace('Koperasi Nelayan ', '').replace('Paguyuban Nelayan ', '')}</span>
          </span>
        </div>

        {/* Top-Right: Stock Badges */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          {product.freshnessStatus === 'Panen Hari Ini' && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#E8F5E9] text-[#2D8A4E] text-[11px] font-bold shadow-sm border border-emerald-200">
              Panen Hari Ini
            </span>
          )}
          {product.freshnessStatus === 'Sisa < 20 kg' && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] text-[11px] font-bold shadow-sm border border-amber-200">
              Sisa &lt; 20 kg
            </span>
          )}
          {product.freshnessStatus === 'Grade A Restoran' && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#1A5276] text-[11px] font-bold shadow-sm border border-blue-200">
              Grade A Restoran
            </span>
          )}
          {product.coldChainGuaranteed && (
            <span className="px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-sm text-cyan-200 text-[10px] font-medium flex items-center gap-1">
              <ThermometerSnowflake className="w-3 h-3 text-cyan-300" />
              Cold-Chain
            </span>
          )}
        </div>

        {/* Lot ID water mark */}
        <div className="absolute bottom-2 right-3 text-[10px] font-mono text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
          {product.lotId}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Direct Farmer & Fisher Provenance Tag */}
          <div 
            onClick={(e) => {
              e.stopPropagation();
              onProducerClick(product.producerId);
            }}
            className="flex items-center gap-2 mb-2 p-1.5 rounded-xl hover:bg-[#F7FAF8] transition-colors"
          >
            <img 
              src={product.producerAvatar} 
              alt={product.producerName}
              className="w-7 h-7 rounded-full object-cover border border-[#2D8A4E]/30 shrink-0" 
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="text-xs font-semibold text-[#1B2E23] truncate">
                  {product.producerName}
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-[#2D8A4E] shrink-0" />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#6f7a6f]">
                <MapPin className="w-3 h-3 text-[#2D8A4E]" />
                <span className="truncate">{product.originMunicipality}</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-[#1B2E23] text-sm sm:text-base leading-snug line-clamp-2 min-h-[2.6rem]">
            {product.title}
          </h3>

          {/* Freshness Timestamp line */}
          <p className="mt-1 text-xs text-[#2D8A4E] font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 shrink-0" />
            <span>{product.harvestTimestamp}</span>
          </p>
        </div>

        {/* Pricing Cluster & Quantity Control */}
        <div className="mt-3 pt-3 border-t border-[#E2EBE5]">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-lg font-bold text-[#1B2E23] tracking-tight">
                {formatRupiah(product.pricePerUnit)}
              </span>
              <span className="text-xs text-[#6f7a6f] ml-1 font-medium">
                /{product.unit}
              </span>
            </div>
            
            {/* Wholesale discount cue */}
            {product.wholesaleDiscounts.length > 0 && (
              <span className="text-[10px] font-semibold text-[#2D8A4E] bg-[#E8F5E9] px-2 py-0.5 rounded-full">
                Grosir &gt;{product.wholesaleDiscounts[0].minKg}kg -{product.wholesaleDiscounts[0].discountPercent}%
              </span>
            )}
          </div>

          {/* Weight Quantity Stepper */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs text-[#6f7a6f] font-medium">Kuantitas:</span>
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="inline-flex items-center bg-[#F7FAF8] border border-[#E2EBE5] rounded-xl p-0.5"
            >
              <button
                type="button"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#1B2E23] hover:bg-white active:scale-90 transition-all disabled:opacity-40 disabled:hover:bg-transparent"
                title="Kurangi kuantitas"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-3 text-xs font-semibold text-[#1B2E23] min-w-[50px] text-center">
                {quantity} {product.unit}
              </span>
              <button
                type="button"
                onClick={handleIncrement}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[#1B2E23] hover:bg-white active:scale-90 transition-all"
                title="Tambah kuantitas"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action Buttons Cluster */}
          <div className="grid grid-cols-2 gap-2">
            {/* Beli Langsung / Tambah Keranjang */}
            <button
              type="button"
              onClick={handleAddToCartClick}
              className={`w-full py-2 px-2.5 rounded-[12px] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                addedNotice 
                  ? 'bg-[#2D8A4E] text-white' 
                  : 'bg-[#E8F5E9] text-[#2D8A4E] hover:bg-[#d8eedb] active:scale-95'
              }`}
            >
              {addedNotice ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Ditambahkan</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>+ Keranjang</span>
                </>
              )}
            </button>

            {/* Direct Inquiry button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDirectInquiry(product);
              }}
              className="w-full py-2 px-2 rounded-[12px] text-xs font-semibold border border-[#1A5276]/30 text-[#1A5276] hover:bg-[#E0F2FE]/40 active:scale-95 transition-all flex items-center justify-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Tanya Petani</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
