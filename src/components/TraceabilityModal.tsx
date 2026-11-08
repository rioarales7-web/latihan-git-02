import React from 'react';
import { Product } from '../types';
import { 
  X, 
  ShieldCheck, 
  QrCode, 
  Thermometer, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Anchor, 
  Sprout, 
  Award,
  Layers,
  Activity
} from 'lucide-react';

interface TraceabilityModalProps {
  product: Product;
  onClose: () => void;
  onProducerClick: (producerId: string) => void;
}

export const TraceabilityModal: React.FC<TraceabilityModalProps> = ({
  product,
  onClose,
  onProducerClick,
}) => {
  const isAgri = product.category === 'agriculture';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-organic-3 border border-[#E2EBE5] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-gray-200 text-gray-700 hover:text-black flex items-center justify-center shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[#1B2E23] to-[#2D8A4E] text-white">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Digital Provenance & Cold-Chain Passport</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Paspor Asal-Usul & Sensor Lot
          </h2>
          <p className="text-xs sm:text-sm text-gray-200 mt-1 max-w-xl">
            Bukti verifikasi rantai dingin dan integritas panen langsung dari produsen terdaftar.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="font-mono bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <QrCode className="w-4 h-4" />
              <span>LOT ID: {product.lotId}</span>
            </span>

            <span className="bg-emerald-500/20 px-3 py-1 rounded-lg text-xs font-semibold text-emerald-100 border border-emerald-400/30">
              Integritas Mutu: 100% Lulus Uji
            </span>
          </div>
        </div>

        {/* Passport Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Commodity Brief Lockup */}
          <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#E2EBE5] flex items-center gap-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-16 h-16 rounded-xl object-cover border border-emerald-200 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-[#1B2E23] text-sm sm:text-base truncate">
                {product.title}
              </h3>
              <p className="text-xs text-gray-500">
                Produsen: <strong className="text-[#2D8A4E]">{product.producerName}</strong> ({product.originMunicipality})
              </p>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-600">
                <Clock className="w-3.5 h-3.5 text-[#2D8A4E]" />
                <span>Waktu Catat: {product.harvestTimestamp}</span>
              </div>
            </div>
          </div>

          {/* IoT Temperature Log Graph Simulator */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2EBE5] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1B2E23]">
                <Activity className="w-4 h-4 text-[#1A5276]" />
                <span>Log Sensor Suhu Terpadu (6 Jam Terakhir)</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#1A5276] text-xs font-bold">
                Rata-rata: +1.2°C (Aman)
              </span>
            </div>

            {/* Simulated Temp Bars */}
            <div className="h-28 flex items-end justify-between gap-2 pt-4 px-2 border-b border-gray-200">
              {[
                { time: '06:00', temp: 1.1, label: 'Pendaratan' },
                { time: '07:00', temp: 1.3, label: 'Sortir' },
                { time: '08:00', temp: 1.0, label: 'Slurry Box' },
                { time: '09:00', temp: 1.2, label: 'Loading Van' },
                { time: '10:00', temp: 1.4, label: 'Tol Jagorawi' },
                { time: '11:00', temp: 1.2, label: 'DKI Transit' },
                { time: '12:00', temp: 1.1, label: 'Delivery' },
              ].map((point, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <span className="text-[10px] font-bold text-[#1A5276]">{point.temp}°C</span>
                  <div 
                    className="w-full max-w-[28px] bg-gradient-to-t from-[#1A5276] to-[#48BB78] rounded-t-md transition-all hover:brightness-110"
                    style={{ height: `${(point.temp / 3) * 65 + 20}%` }}
                  />
                  <span className="text-[9px] text-gray-500 font-mono">{point.time}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-gray-500">
              Kepatuhan suhu dingin berada dalam standar HACCP (Hazard Analysis Critical Control Point) 0°C – 4°C tanpa deviasi kritis.
            </p>
          </div>

          {/* Lineage & Provenance Milestones Timeline */}
          <div>
            <h3 className="text-sm font-bold text-[#1B2E23] uppercase tracking-wider mb-4">
              Jejak Rantai Pasok Fisik (Provenance Milestones)
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#2D8A4E]/30">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#2D8A4E] text-white flex items-center justify-center text-[10px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-[#1B2E23]">
                      {isAgri ? 'Pemetikan Kebun Organik' : 'Pendaratan Kapal Nelayan Tradisional'}
                    </h4>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-medium">
                      Terverifikasi
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Dilakukan langsung oleh {product.producerName} di {product.originMunicipality}.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#2D8A4E] text-white flex items-center justify-center text-[10px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-[#1B2E23]">
                      Uji Fisik & Sortasi Grade A Restoran
                    </h4>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-medium">
                      0% Residu Kimia
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Pemeriksaan kesegaran insang/daun, tekstur serat, dan penimbangan akurat tanpa perantara.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#1A5276] text-white flex items-center justify-center text-[10px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-[#1B2E23]">
                      Pengemasan Rantai Dingin & Label QR Lot
                    </h4>
                    <span className="text-[10px] bg-blue-100 text-[#1A5276] px-1.5 py-0.2 rounded font-medium">
                      Chilled Slurry +1.2°C
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Dimasukkan ke dalam armada van berpendingin dengan sensor IoT transmisi sinyal kontinu.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#2D8A4E] text-white text-xs font-semibold hover:bg-[#246F3E] transition-colors"
            >
              Tutup Paspor Asal-Usul
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
