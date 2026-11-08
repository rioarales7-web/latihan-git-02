import React, { useState } from 'react';
import { Product, Producer } from '../types';
import { 
  X, 
  Send, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  User, 
  Clock 
} from 'lucide-react';

interface DirectInquiryModalProps {
  target: {
    product?: Product;
    producer?: Producer;
  };
  onClose: () => void;
}

export const DirectInquiryModal: React.FC<DirectInquiryModalProps> = ({
  target,
  onClose,
}) => {
  const [messages, setMessages] = useState<Array<{ sender: 'buyer' | 'producer'; text: string; time: string }>>([
    {
      sender: 'producer',
      text: 'Halo! Salam dari kebun/dermaga. Ada spesifikasi atau potongan khusus yang dibutuhkan dapur Anda untuk panen hari ini?',
      time: 'Baru saja',
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  const producerName = target.producer?.name || target.product?.producerName || 'Mitra Produsen';
  const producerAvatar = target.producer?.avatar || target.product?.producerAvatar || '';
  const municipality = target.producer?.municipality || target.product?.originMunicipality || '';

  const quickPrompts = [
    'Apakah bisa minta dipotong fillet/loin bersih?',
    'Bisa sampai sebelum jam 10 pagi untuk persiapan lunch service?',
    'Bisa pesan kuota 30kg untuk kebutuhan banquet akhir pekan?',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const newBuyerMsg = {
      sender: 'buyer' as const,
      text,
      time: 'Baru saja',
    };

    setMessages((prev) => [...prev, newBuyerMsg]);
    if (!textToSend) setInputVal('');

    // Simulated responsive feedback from producer
    setTimeout(() => {
      let reply = 'Siap Chef! Kami pastikan spesifikasi tersebut disiapkan langsung saat pengemasan rantai dingin hari ini.';
      if (text.toLowerCase().includes('fillet') || text.toLowerCase().includes('potong')) {
        reply = 'Bisa Chef, tim kami di dermaga akan proses potong loin/fillet dan di-vacuum pack higienis dengan es bubur.';
      } else if (text.toLowerCase().includes('jam') || text.toLowerCase().includes('pagi')) {
        reply = 'Bisa! Van berpendingin rute pertama berangkat jam 06:30 WIB, estimasi tiba pukul 09:15 WIB.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'producer' as const,
          text: reply,
          time: 'Baru saja',
        },
      ]);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-organic-3 border border-[#E2EBE5] flex flex-col h-[520px] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#F7FAF8] border-b border-[#E2EBE5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {producerAvatar ? (
              <img
                src={producerAvatar}
                alt={producerName}
                className="w-10 h-10 rounded-full object-cover border border-[#2D8A4E]/30"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <User className="w-5 h-5" />
              </div>
            )}
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-[#1B2E23]">{producerName}</h3>
                <ShieldCheck className="w-3.5 h-3.5 text-[#2D8A4E]" />
              </div>
              <p className="text-[11px] text-gray-500">{municipality} • Respon Cepat (&lt; 5 mnt)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F7FAF8]/50">
          {target.product && (
            <div className="p-2.5 rounded-xl bg-white border border-[#E2EBE5] flex items-center gap-2.5 text-xs text-gray-600 mb-2">
              <img src={target.product.image} alt="prod" className="w-8 h-8 rounded-lg object-cover" />
              <div className="min-w-0 flex-1 truncate">
                <span className="text-[10px] text-gray-400 block">Menanyakan komoditas:</span>
                <span className="font-bold text-[#1B2E23] truncate">{target.product.title}</span>
              </div>
            </div>
          )}

          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'buyer' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[82%] p-3 rounded-2xl text-xs ${
                  m.sender === 'buyer'
                    ? 'bg-[#2D8A4E] text-white rounded-tr-xs'
                    : 'bg-white text-[#1B2E23] border border-[#E2EBE5] shadow-xs rounded-tl-xs'
                }`}
              >
                <p>{m.text}</p>
                <span
                  className={`text-[9px] mt-1 block text-right ${
                    m.sender === 'buyer' ? 'text-emerald-100' : 'text-gray-400'
                  }`}
                >
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Prompts */}
        <div className="p-2 bg-white border-t border-[#E2EBE5] overflow-x-auto flex gap-1.5 scrollbar-none">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] whitespace-nowrap bg-gray-100 hover:bg-emerald-50 hover:text-[#2D8A4E] px-2.5 py-1 rounded-full text-gray-700 border border-gray-200 transition-colors shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#E2EBE5] flex items-center gap-2">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Tulis pesan langsung untuk petani/nelayan..."
            className="flex-1 py-2 px-3.5 bg-[#F7FAF8] rounded-xl border border-[#E2EBE5] focus:bg-white focus:border-[#2D8A4E] text-xs outline-none"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputVal.trim()}
            className="w-9 h-9 rounded-xl bg-[#2D8A4E] text-white flex items-center justify-center hover:bg-[#246F3E] disabled:opacity-40 transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
