import React, { useState } from 'react';
import { CartItem, Product, OrderConfirmation } from '../types';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  QrCode, 
  ThermometerSnowflake,
  ArrowRight,
  FileText
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (product: Product, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onViewTraceability: (product: Product) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onViewTraceability,
}) => {
  const [shippingOption, setShippingOption] = useState<'chilled_express' | 'sameday_insulated' | 'cold_truck'>('chilled_express');
  const [deliveryAddress, setDeliveryAddress] = useState('Restoran Nusantara Kitchen, Jl. Senopati No. 42, Kebayoran Baru, Jakarta Selatan');
  const [prepNotes, setPrepNotes] = useState('Mohon tuna loin dipotong vacuum pack per 2kg, tomat beef gunakan peti kayu organik.');
  const [orderConfirmation, setOrderConfirmation] = useState<OrderConfirmation | null>(null);

  if (!isOpen) return null;

  // Calculate pricing
  const subtotal = items.reduce((acc, item) => {
    // Check wholesale discount
    const activeDiscount = item.product.wholesaleDiscounts
      .filter((d) => item.quantity >= d.minKg)
      .sort((a, b) => b.minKg - a.minKg)[0];

    const discount = activeDiscount ? activeDiscount.discountPercent : 0;
    const unitPrice = Math.round(item.product.pricePerUnit * (1 - discount / 100));
    return acc + unitPrice * item.quantity;
  }, 0);

  const coldChainFee = shippingOption === 'chilled_express' ? 35000 : shippingOption === 'sameday_insulated' ? 22000 : 0;
  const grandTotal = subtotal + coldChainFee;

  const formatRupiah = (val: number) => 'Rp ' + val.toLocaleString('id-ID');

  const handleCheckout = () => {
    const confirmation: OrderConfirmation = {
      orderId: 'AGR-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB, Hari Ini',
      items: [...items],
      subtotal,
      coldChainFee,
      total: grandTotal,
      shippingOption: shippingOption === 'chilled_express' ? 'Chilled Express Van (0-4°C)' : shippingOption === 'sameday_insulated' ? 'Sameday Insulated Thermal Box' : 'Kargo Truk Berpendingin Horeca',
      deliveryAddress,
      lotCodes: items.map((i) => i.product.lotId),
      estimatedArrival: 'Hari Ini, 14:30 WIB (Garansi Dingin)',
    };

    setOrderConfirmation(confirmation);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E2EBE5] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E8F5E9] text-[#2D8A4E] flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-[#1B2E23]">
                {orderConfirmation ? 'Bukti Pemesanan Panen' : 'Keranjang Rantai Dingin'}
              </h2>
              <span className="text-xs text-gray-500">
                {orderConfirmation ? 'Order Terverifikasi' : `${items.length} komoditas direct-trade`}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setOrderConfirmation(null);
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-5 flex-1 space-y-5 overflow-y-auto">
          {orderConfirmation ? (
            /* Order Confirmation Success Screen */
            <div className="space-y-5 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#2D8A4E] flex items-center justify-center mx-auto border-4 border-emerald-100 animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#2D8A4E] uppercase tracking-wider bg-[#E8F5E9] px-3 py-1 rounded-full">
                  Pemesanan Berhasil Terverifikasi
                </span>
                <h3 className="text-2xl font-bold text-[#1B2E23] mt-2">
                  No. Pesanan: {orderConfirmation.orderId}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Komoditas dipersiapkan langsung oleh petani & nelayan mitra bersangkutan.
                </p>
              </div>

              {/* Provenance Card */}
              <div className="bg-[#F7FAF8] rounded-2xl p-4 border border-[#2D8A4E]/20 text-left space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#1B2E23] pb-2 border-b border-gray-200">
                  <span className="flex items-center gap-1.5 text-[#2D8A4E]">
                    <ThermometerSnowflake className="w-4 h-4" />
                    <span>Layanan Pengiriman: {orderConfirmation.shippingOption}</span>
                  </span>
                  <span className="text-xs font-semibold text-emerald-800">
                    Est. Tiba: {orderConfirmation.estimatedArrival}
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <span className="text-gray-500 block text-[11px]">Tujuan Pengantaran Kuliner:</span>
                  <p className="font-medium text-[#1B2E23]">{orderConfirmation.deliveryAddress}</p>
                </div>

                <div className="text-xs space-y-1">
                  <span className="text-gray-500 block text-[11px]">Lot Terverifikasi:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {orderConfirmation.lotCodes.map((lot, idx) => (
                      <span key={idx} className="font-mono bg-white px-2 py-0.5 rounded border border-gray-200 text-emerald-900 font-bold text-[10px]">
                        {lot}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200 flex items-center justify-between font-bold text-sm text-[#1B2E23]">
                  <span>Total Pembayaran:</span>
                  <span className="text-emerald-800">{formatRupiah(orderConfirmation.total)}</span>
                </div>
              </div>

              {/* Action: View Traceability or Back to Market */}
              <div className="space-y-2 pt-2">
                {orderConfirmation.items.length > 0 && (
                  <button
                    onClick={() => {
                      onViewTraceability(orderConfirmation.items[0].product);
                      onClose();
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-[#1A5276] hover:bg-[#154360] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <QrCode className="w-4 h-4 text-cyan-200" />
                    <span>Pantau Rantai Dingin & GPS Van (Screen 6)</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setOrderConfirmation(null);
                    onClose();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors"
                >
                  Kembali ke Beranda Pasar
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            /* Empty Cart */
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[#1B2E23] text-lg">Keranjang Anda Kosong</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Pilih hasil bumi organik dari Ciwidey atau hasil laut segar Sendangbiru untuk memulai.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-5 py-2.5 rounded-xl bg-[#2D8A4E] text-white text-xs font-semibold"
              >
                Jelajahi Panen Sekarang
              </button>
            </div>
          ) : (
            /* Cart Items List & Options */
            <>
              {/* Product items */}
              <div className="space-y-3">
                {items.map(({ product, quantity }) => {
                  const activeDiscount = product.wholesaleDiscounts
                    .filter((d) => quantity >= d.minKg)
                    .sort((a, b) => b.minKg - a.minKg)[0];

                  const disc = activeDiscount ? activeDiscount.discountPercent : 0;
                  const unitPrice = Math.round(product.pricePerUnit * (1 - disc / 100));

                  return (
                    <div
                      key={product.id}
                      className="p-3 rounded-2xl bg-[#F7FAF8] border border-[#E2EBE5] flex items-center gap-3"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 rounded-xl object-cover border border-emerald-100 shrink-0"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-[#1B2E23] line-clamp-1">
                            {product.title}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(product.id)}
                            className="text-gray-400 hover:text-red-500 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[11px] text-gray-500">
                          {product.producerName} ({product.originMunicipality})
                        </p>

                        <div className="mt-2 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-[#1B2E23]">
                              {formatRupiah(unitPrice * quantity)}
                            </span>
                            {disc > 0 && (
                              <span className="text-[10px] text-[#2D8A4E] ml-1 font-semibold">
                                (-{disc}%)
                              </span>
                            )}
                          </div>

                          {/* Stepper */}
                          <div className="inline-flex items-center bg-white border border-[#E2EBE5] rounded-xl p-0.5">
                            <button
                              onClick={() => onUpdateQuantity(product, quantity - 1)}
                              disabled={quantity <= 1}
                              className="w-6 h-6 rounded flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-30"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-bold text-gray-900 min-w-[36px] text-center">
                              {quantity} {product.unit}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(product, quantity + 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-gray-700 hover:bg-gray-100"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cold-Chain Shipping Selector */}
              <div className="bg-white p-4 rounded-2xl border border-[#E2EBE5] space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1B2E23]">
                  <ThermometerSnowflake className="w-4 h-4 text-[#1A5276]" />
                  <span>Pilihan Logistik Rantai Dingin Terakreditasi:</span>
                </div>

                <div className="space-y-2">
                  <label
                    onClick={() => setShippingOption('chilled_express')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      shippingOption === 'chilled_express'
                        ? 'border-[#2D8A4E] bg-emerald-50/50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-xs">
                      <span className="font-bold text-[#1B2E23] block">
                        Chilled Express Van (0°C – 4°C, Garansi 3 Jam)
                      </span>
                      <span className="text-gray-500 text-[11px]">
                        Armada berpendingin IoT aktif, suhu dipantau realtime.
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#2D8A4E]">Rp 35.000</span>
                  </label>

                  <label
                    onClick={() => setShippingOption('sameday_insulated')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      shippingOption === 'sameday_insulated'
                        ? 'border-[#2D8A4E] bg-emerald-50/50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-xs">
                      <span className="font-bold text-[#1B2E23] block">
                        Sameday Thermal Box Insulated
                      </span>
                      <span className="text-gray-500 text-[11px]">
                        Box busa kedap udara dengan gel es makanan higienis.
                      </span>
                    </div>
                    <span className="text-xs font-bold text-[#2D8A4E]">Rp 22.000</span>
                  </label>
                </div>
              </div>

              {/* Delivery Address & Culinary Instructions */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-[#1B2E23] block mb-1">
                    Alamat Pengantaran Restoran / Dapur:
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E2EBE5] bg-[#F7FAF8] focus:bg-white focus:border-[#2D8A4E] outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#1B2E23] block mb-1">
                    Instruksi Khusus Dapur / Preparasi Petani & Nelayan:
                  </label>
                  <input
                    type="text"
                    value={prepNotes}
                    onChange={(e) => setPrepNotes(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E2EBE5] bg-[#F7FAF8] focus:bg-white focus:border-[#2D8A4E] outline-none text-xs"
                    placeholder="Contoh: Bersihkan insang, packing daun pisang..."
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer / Sticky Checkout Summary */}
        {!orderConfirmation && items.length > 0 && (
          <div className="p-5 border-t border-[#E2EBE5] bg-white space-y-3 sticky bottom-0">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal Komoditas:</span>
                <span>{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Rantai Dingin & Insulasi:</span>
                <span>{formatRupiah(coldChainFee)}</span>
              </div>
              <div className="flex justify-between text-[#2D8A4E] font-medium">
                <span>Potongan Tengkulak / Perantara:</span>
                <span className="font-bold">Rp 0 (100% Direct-Trade)</span>
              </div>
              <div className="pt-2 border-t border-[#E2EBE5] flex justify-between text-base font-bold text-[#1B2E23]">
                <span>Total Biaya:</span>
                <span className="text-[#2D8A4E]">{formatRupiah(grandTotal)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 px-4 rounded-2xl bg-[#2D8A4E] hover:bg-[#246F3E] text-white text-sm font-semibold shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Konfirmasi & Beli Langsung ({formatRupiah(grandTotal)})</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
