/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Ecosystem, 
  ScreenType, 
  Product, 
  Producer, 
  CartItem 
} from './types';
import { PRODUCTS, PRODUCERS } from './data/mockData';
import { SplashView } from './components/SplashView';
import { MarketplaceView } from './components/MarketplaceView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProducerProfileModal } from './components/ProducerProfileModal';
import { CartDrawer } from './components/CartDrawer';
import { TraceabilityModal } from './components/TraceabilityModal';
import { DirectInquiryModal } from './components/DirectInquiryModal';
import { PrototypeBar } from './components/PrototypeBar';
import { 
  Leaf, 
  Fish, 
  ShoppingBag, 
  MapPin, 
  ShieldCheck, 
  QrCode, 
  Sparkles,
  Search,
  ArrowRight
} from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [selectedCategory, setSelectedCategory] = useState<Ecosystem>('all');
  const [isMobileSimulator, setIsMobileSimulator] = useState<boolean>(false);

  // Active Modals & Selected Entities
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedProducerId, setSelectedProducerId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [traceabilityProduct, setTraceabilityProduct] = useState<Product | null>(null);
  const [inquiryTarget, setInquiryTarget] = useState<{ product?: Product; producer?: Producer } | null>(null);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 2 }, // Yellowfin tuna 2kg
    { product: PRODUCTS[1], quantity: 3 }, // Tomat beef 3kg
  ]);

  // Cart actions
  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (product: Product, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(product.id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === product.id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  // Producer selection helper
  const activeProducer = PRODUCERS.find((p) => p.id === selectedProducerId);

  // Navigation handlers for Prototype Bar
  const handleNavigateScreen = (screen: ScreenType) => {
    setCurrentScreen(screen);
    if (screen === 'detail') {
      setSelectedProduct(PRODUCTS[0]);
    } else if (screen === 'producer') {
      setSelectedProducerId(PRODUCERS[0].id);
    } else if (screen === 'cart') {
      setIsCartOpen(true);
    } else if (screen === 'traceability') {
      setTraceabilityProduct(PRODUCTS[0]);
    }
  };

  const handleResetPrototype = () => {
    setCurrentScreen('splash');
    setSelectedProduct(null);
    setSelectedProducerId(null);
    setIsCartOpen(false);
    setTraceabilityProduct(null);
    setInquiryTarget(null);
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] text-[#1B2E23] flex flex-col font-sans selection:bg-[#2D8A4E] selection:text-white">
      {/* Prototype Control Bar (Quick Screen Switcher & Specs Navigator) */}
      <PrototypeBar
        currentScreen={currentScreen}
        onNavigateScreen={handleNavigateScreen}
        isMobileSimulator={isMobileSimulator}
        onToggleMobileSimulator={() => setIsMobileSimulator(!isMobileSimulator)}
        onResetPrototype={handleResetPrototype}
      />

      {/* Main Application Container (Optionally wrapped in Mobile Frame simulator) */}
      <div className={`flex-1 flex flex-col ${isMobileSimulator ? 'py-8 px-4 items-center bg-gray-900/10' : ''}`}>
        <div className={`w-full flex-1 flex flex-col ${
          isMobileSimulator 
            ? 'max-w-[410px] min-h-[840px] bg-[#F7FAF8] rounded-[48px] border-[10px] border-gray-900 shadow-2xl overflow-hidden relative' 
            : ''
        }`}>
          {/* Mobile Notch indicator if in simulator */}
          {isMobileSimulator && (
            <div className="w-36 h-5 bg-gray-900 rounded-b-2xl mx-auto mb-1 flex items-center justify-center">
              <span className="w-3 h-3 rounded-full bg-gray-800" />
            </div>
          )}

          {/* Primary Navbar (Visible except on pure Splash view or accessible anytime) */}
          <header className="sticky top-0 z-30 glass-nav border-b border-[#E2EBE5] px-4 sm:px-8 py-3.5 flex items-center justify-between">
            {/* Logo */}
            <div 
              onClick={() => setCurrentScreen('marketplace')}
              className="flex items-center gap-2.5 cursor-pointer select-none group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2D8A4E] to-[#1A5276] p-[2px] shadow-sm flex items-center justify-center">
                <div className="w-full h-full bg-[#1B2E23] rounded-[10px] flex items-center justify-center text-white">
                  <div className="relative">
                    <Leaf className="w-4 h-4 text-[#88f9b0] -translate-x-0.5 -translate-y-0.5" />
                    <Fish className="w-3.5 h-3.5 text-[#a3d4fe] absolute top-1 left-1.5" />
                  </div>
                </div>
              </div>

              <div>
                <span className="text-base sm:text-lg font-bold tracking-tight text-[#1B2E23] leading-none">
                  AgroMarine<span className="text-[#2D8A4E]">Direct</span>
                </span>
                <span className="block text-[10px] text-gray-500 font-medium leading-tight">
                  Tanah & Bahari Langsung
                </span>
              </div>
            </div>

            {/* Delivery Location Pill */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-[#1B2E23] bg-white border border-[#E2EBE5] px-3 py-1.5 rounded-full shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-[#2D8A4E]" />
              <span className="text-gray-500">Tujuan:</span>
              <span className="font-semibold">DKI Jakarta & Sekitarnya (Chilled Van)</span>
            </div>

            {/* Actions: Traceability QR & Cart */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setTraceabilityProduct(PRODUCTS[0])}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#2D8A4E]/30 bg-emerald-50/60 text-[#2D8A4E] hover:bg-emerald-100 transition-colors"
                title="Lacak Paspor Asal-Usul & Sensor"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Paspor Lot Digital</span>
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#2D8A4E] hover:bg-[#246F3E] text-white text-xs font-semibold shadow-xs active:scale-95 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Keranjang Dingin</span>
                {totalCartCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-white text-[#2D8A4E] font-bold text-[11px] flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </button>
            </div>
          </header>

          {/* Screen Switcher Body */}
          <main className="flex-1 pb-16">
            {currentScreen === 'splash' ? (
              <SplashView
                onEnterApp={() => setCurrentScreen('marketplace')}
                onExploreTraceability={() => {
                  setTraceabilityProduct(PRODUCTS[0]);
                  setCurrentScreen('marketplace');
                }}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  setCurrentScreen('marketplace');
                }}
              />
            ) : (
              <MarketplaceView
                products={PRODUCTS}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onSelectProduct={(p) => setSelectedProduct(p)}
                onSelectProducer={(prodId) => setSelectedProducerId(prodId)}
                onAddToCart={handleAddToCart}
                onDirectInquiry={(p) => setInquiryTarget({ product: p })}
                cartItemsCount={totalCartCount}
                onOpenCart={() => setIsCartOpen(true)}
              />
            )}
          </main>

          {/* Bottom Mobile Floating Bar (when viewing marketplace) */}
          {currentScreen !== 'splash' && (
            <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-30 bg-[#1B2E23]/95 backdrop-blur-md text-white px-4 py-2.5 rounded-full border border-emerald-500/30 shadow-organic-3 flex items-center gap-4 text-xs">
              <button
                onClick={() => setCurrentScreen('splash')}
                className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Screen 1: Splash</span>
              </button>

              <span className="text-gray-600">|</span>

              <button
                onClick={() => setSelectedCategory(selectedCategory === 'agriculture' ? 'all' : 'agriculture')}
                className={`flex items-center gap-1 transition-colors ${
                  selectedCategory === 'agriculture' ? 'text-emerald-400 font-bold' : 'text-gray-300'
                }`}
              >
                <Leaf className="w-3.5 h-3.5" />
                <span>Pertanian</span>
              </button>

              <button
                onClick={() => setSelectedCategory(selectedCategory === 'fisheries' ? 'all' : 'fisheries')}
                className={`flex items-center gap-1 transition-colors ${
                  selectedCategory === 'fisheries' ? 'text-cyan-400 font-bold' : 'text-gray-300'
                }`}
              >
                <Fish className="w-3.5 h-3.5" />
                <span>Bahari</span>
              </button>

              <span className="text-gray-600">|</span>

              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-1.5 text-white font-bold bg-[#2D8A4E] px-2.5 py-1 rounded-full shadow-xs"
              >
                <ShoppingBag className="w-3 h-3" />
                <span>{totalCartCount} Item</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Screen 3: Commodity Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onProducerClick={(producerId) => {
            setSelectedProduct(null);
            setSelectedProducerId(producerId);
          }}
          onAddToCart={handleAddToCart}
          onDirectInquiry={(p) => setInquiryTarget({ product: p })}
          onViewTraceability={(p) => setTraceabilityProduct(p)}
          onBuyNow={(product, quantity) => {
            handleAddToCart(product, quantity);
            setSelectedProduct(null);
            setIsCartOpen(true);
          }}
        />
      )}

      {/* Screen 4: Producer Profile Modal */}
      {activeProducer && (
        <ProducerProfileModal
          producer={activeProducer}
          products={PRODUCTS}
          onClose={() => setSelectedProducerId(null)}
          onSelectProduct={(p) => {
            setSelectedProducerId(null);
            setSelectedProduct(p);
          }}
          onDirectInquiry={(producer) => setInquiryTarget({ producer })}
        />
      )}

      {/* Screen 5: Cold-Chain Cart & Instant Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onViewTraceability={(p) => setTraceabilityProduct(p)}
      />

      {/* Screen 6: Digital Provenance & Cold-Chain Tracker */}
      {traceabilityProduct && (
        <TraceabilityModal
          product={traceabilityProduct}
          onClose={() => setTraceabilityProduct(null)}
          onProducerClick={(prodId) => {
            setTraceabilityProduct(null);
            setSelectedProducerId(prodId);
          }}
        />
      )}

      {/* Direct Inquiry / Chat Modal */}
      {inquiryTarget && (
        <DirectInquiryModal
          target={inquiryTarget}
          onClose={() => setInquiryTarget(null)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-[#E2EBE5] bg-white text-xs text-gray-500 py-6 px-4 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-[#1B2E23] font-bold">
          <span>AgroMarine Direct</span>
          <span>•</span>
          <span className="text-[#2D8A4E]">Direct-Source Harvesting & Catch</span>
        </div>
        <p className="max-w-xl mx-auto text-gray-400">
          Kelompok Tani Subur Ciwidey, Agro Pasundan Lembang, Koperasi Nelayan Sendangbiru, Paguyuban Bahari Muara Baru.
        </p>
      </footer>
    </div>
  );
}
