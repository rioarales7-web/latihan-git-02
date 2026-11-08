export type Ecosystem = 'all' | 'agriculture' | 'fisheries';

export type ScreenType = 
  | 'splash' 
  | 'marketplace' 
  | 'detail' 
  | 'producer' 
  | 'cart' 
  | 'traceability' 
  | 'inquiry';

export interface Producer {
  id: string;
  name: string;
  cooperativeName: string;
  type: 'farmer' | 'fisher';
  avatar: string;
  municipality: string;
  province: string;
  coordinates: string;
  establishedYear: number;
  membersCount: number;
  hectaresOrVessels: string;
  verifiedBadges: string[];
  bio: string;
  rating: number;
  totalHarvestKg: number;
  upcomingHarvest: {
    item: string;
    date: string;
    estimatedKg: number;
  }[];
}

export interface Product {
  id: string;
  title: string;
  category: 'agriculture' | 'fisheries';
  subCategory: string;
  pricePerUnit: number;
  unit: string; // 'kg' | 'pack' | 'keranjang'
  minimumOrder: number;
  stockAvailable: number;
  freshnessStatus: 'Panen Hari Ini' | 'Tangkapan Subuh' | 'Sisa < 20 kg' | 'Grade A Restoran' | 'Fresh Chilled';
  isFreshHarvest: boolean;
  harvestTimestamp: string;
  temperatureLogged: string;
  originMunicipality: string;
  producerId: string;
  producerName: string;
  producerType: 'farmer' | 'fisher';
  producerAvatar: string;
  lotId: string;
  image: string;
  galleryImages: string[];
  description: string;
  culinaryNotes: string;
  organicCertified: boolean;
  coldChainGuaranteed: boolean;
  wholesaleDiscounts: {
    minKg: number;
    discountPercent: number;
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number; // in unit (kg)
}

export interface OrderConfirmation {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  coldChainFee: number;
  total: number;
  shippingOption: string;
  deliveryAddress: string;
  lotCodes: string[];
  estimatedArrival: string;
}
