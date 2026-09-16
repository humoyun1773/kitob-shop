import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Truck, 
  CreditCard, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  ShoppingBag,
  ChevronDown,
  Building2,
  Clock,
  BookmarkCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import { DeliveryAddress, DeliveryMethodType } from '../types/order';

const COUNTRIES_LIST = [
  "O'zbekiston",
  "Qozog'iston",
  "Qirg'iziston",
  "Tojikiston",
  "Rossiya",
  "Turkiya",
  "Birlashgan Arab Amirliklari",
  "AQSh",
  "Boshqa davlat"
];

interface RegionData {
  name: string;
  postalCode: string;
  districts: string[];
}

const REGIONS_DATA: Record<string, RegionData> = {
  'Toshkent shahri': {
    name: 'Toshkent shahri',
    postalCode: '100000',
    districts: [
      'Toshkent (Markaz)',
      'Yunusobod tumani',
      'Mirzo Ulug‘bek tumani',
      'Chilonzor tumani',
      'Yakkasaroy tumani',
      'Mirobod tumani',
      'Shayxontohur tumani',
      'Olmazor tumani',
      'Uchtepa tumani',
      'Sergeli tumani',
      'Yangihayot tumani',
      'Yashnobod tumani',
      'Bektemir tumani'
    ]
  },
  'Toshkent viloyati': {
    name: 'Toshkent viloyati',
    postalCode: '110000',
    districts: [
      'Chirchiq shahri',
      'Olmaliq shahri',
      'Angren shahri',
      'Bekobod shahri',
      'Nurafshon shahri',
      'Yangiyo‘l shahri',
      'Bo‘stonliq tumani',
      'Qibray tumani',
      'Zangiota tumani',
      'Yangiyo‘l tumani',
      'Toshkent tumani',
      'Parkent tumani',
      'O‘rtachirchiq tumani',
      'Chinoz tumani'
    ]
  },
  'Samarqand viloyati': {
    name: 'Samarqand viloyati',
    postalCode: '140100',
    districts: [
      'Samarqand shahri',
      'Kattaqo‘rg‘on shahri',
      'Urgut tumani',
      'Pastdarg‘om tumani',
      'Samarqand tumani',
      'Bulung‘ur tumani',
      'Jomboy tumani',
      'Ishtixon tumani',
      'Toyloq tumani'
    ]
  },
  'Buxoro viloyati': {
    name: 'Buxoro viloyati',
    postalCode: '200100',
    districts: [
      'Buxoro shahri',
      'Kogon shahri',
      'G‘ijduvon tumani',
      'Vobkent tumani',
      'Jondor tumani',
      'Romitan tumani',
      'Shofirkon tumani',
      'Qorako‘l tumani'
    ]
  },
  'Andijon viloyati': {
    name: 'Andijon viloyati',
    postalCode: '170100',
    districts: [
      'Andijon shahri',
      'Asaka shahri',
      'Xonobod shahri',
      'Shahrixon tumani',
      'Andijon tumani',
      'Baliqchi tumani',
      'Buloqboshi tumani',
      'Marhamat tumani'
    ]
  },
  'Farg‘ona viloyati': {
    name: 'Farg‘ona viloyati',
    postalCode: '150100',
    districts: [
      'Farg‘ona shahri',
      'Marg‘ilon shahri',
      'Qo‘qon shahri',
      'Quvasoy shahri',
      'Oltiariq tumani',
      'Rishton tumani',
      'Bog‘dod tumani',
      'Quva tumani'
    ]
  },
  'Namangan viloyati': {
    name: 'Namangan viloyati',
    postalCode: '160100',
    districts: [
      'Namangan shahri',
      'Chortoq tumani',
      'Chust tumani',
      'Kosonsoy tumani',
      'Pop tumani',
      'To‘raqo‘rg‘on tumani',
      'Uchqo‘rg‘on tumani'
    ]
  },
  'Qashqadaryo viloyati': {
    name: 'Qashqadaryo viloyati',
    postalCode: '180100',
    districts: [
      'Qarshi shahri',
      'Shahrisabz shahri',
      'Kitob tumani',
      'Koson tumani',
      'Muborak tumani',
      'Chiroqchi tumani',
      'G‘uzor tumani',
      'Yakkabog‘ tumani'
    ]
  },
  'Surxondaryo viloyati': {
    name: 'Surxondaryo viloyati',
    postalCode: '190100',
    districts: [
      'Termiz shahri',
      'Denov tumani',
      'Boysun tumani',
      'Sherobod tumani',
      'Jarqo‘rg‘on tumani',
      'Sho‘rchi tumani',
      'Qumqo‘rg‘on tumani'
    ]
  },
  'Xorazm viloyati': {
    name: 'Xorazm viloyati',
    postalCode: '220100',
    districts: [
      'Urganch shahri',
      'Xiva shahri',
      'Xonqa tumani',
      'Gurlan tumani',
      'Shovot tumani',
      'Hazorasp tumani',
      'Qo‘shko‘pir tumani'
    ]
  },
  'Navoiy viloyati': {
    name: 'Navoiy viloyati',
    postalCode: '210100',
    districts: [
      'Navoiy shahri',
      'Zarafshon shahri',
      'Karmana tumani',
      'Qiziltepa tumani',
      'Xatirchi tumani',
      'Nurota tumani',
      'Uchquduq tumani'
    ]
  },
  'Jizzax viloyati': {
    name: 'Jizzax viloyati',
    postalCode: '130100',
    districts: [
      'Jizzax shahri',
      'Zomin tumani',
      'G‘allaorol tumani',
      'Baxmal tumani',
      'Do‘stlik tumani',
      'Sharof Rashidov tumani'
    ]
  },
  'Sirdaryo viloyati': {
    name: 'Sirdaryo viloyati',
    postalCode: '120100',
    districts: [
      'Guliston shahri',
      'Yangiyer shahri',
      'Shirin shahri',
      'Boyovut tumani',
      'Sirdaryo tumani',
      'Xovos tumani'
    ]
  },
  'Qoraqalpog‘iston Respublikasi': {
    name: 'Qoraqalpog‘iston Respublikasi',
    postalCode: '230100',
    districts: [
      'Nukus shahri',
      'Beruniy tumani',
      'To‘rtko‘l tumani',
      'Xo‘jayli tumani',
      'Qo‘ng‘irot tumani',
      'Chimboy tumani',
      'Mo‘ynoq tumani'
    ]
  }
};

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, discountAmount, deliveryFee, tax, total, appliedCoupon, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const { showToast } = useToast();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [contact, setContact] = useState({
    name: user?.name || 'Humoyun Mirzo',
    email: user?.email || 'humoyun@kitobshop.uz',
    phone: user?.phone || '+998 90 123 45 67'
  });

  const defaultAddr = user?.savedAddresses[0];
  const [address, setAddress] = useState<DeliveryAddress>({
    country: defaultAddr?.country || "O'zbekiston",
    region: defaultAddr?.region || 'Toshkent shahri',
    city: defaultAddr?.city || 'Toshkent (Markaz)',
    district: defaultAddr?.district || 'Yunusobod tumani',
    street: defaultAddr?.street || "Amir Temur ko'chasi",
    house: defaultAddr?.house || '42-uy',
    apartment: defaultAddr?.apartment || '15-xonadon',
    postalCode: defaultAddr?.postalCode || '100084',
    recipientName: defaultAddr?.recipientName || user?.name || 'Humoyun Mirzo',
    recipientPhone: defaultAddr?.recipientPhone || user?.phone || '+998 90 123 45 67'
  });

  const [housingType, setHousingType] = useState<'apartment' | 'house' | 'office'>('apartment');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState<'any' | 'morning' | 'afternoon' | 'evening'>('any');
  const [isCustomCity, setIsCustomCity] = useState(false);

  const handleCountryChange = (newCountry: string) => {
    if (newCountry === "O'zbekiston") {
      setAddress(prev => ({
        ...prev,
        country: newCountry,
        region: 'Toshkent shahri',
        city: 'Toshkent (Markaz)',
        district: 'Yunusobod tumani',
        postalCode: '100000'
      }));
      setIsCustomCity(false);
    } else {
      setAddress(prev => ({
        ...prev,
        country: newCountry,
        region: '',
        city: '',
        district: '',
        postalCode: ''
      }));
      setIsCustomCity(true);
    }
  };

  const handleRegionChange = (newRegion: string) => {
    const regionInfo = REGIONS_DATA[newRegion];
    const defaultDistrict = regionInfo?.districts[0] || '';
    const newPostal = regionInfo?.postalCode || address.postalCode;
    setAddress(prev => ({
      ...prev,
      region: newRegion,
      city: defaultDistrict,
      district: defaultDistrict,
      postalCode: newPostal
    }));
    setIsCustomCity(false);
  };

  const handleDistrictChange = (value: string) => {
    if (value === 'Boshqa') {
      setIsCustomCity(true);
      setAddress(prev => ({ ...prev, city: '', district: '' }));
    } else {
      setIsCustomCity(false);
      setAddress(prev => ({ ...prev, city: value, district: value }));
    }
  };

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethodType>('express');

  const [card, setCard] = useState({
    number: '8600 4512 8990 4242',
    expiry: '09/28',
    cvv: '381',
    holder: 'HUMOYUN MIRZO'
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-36 pb-20 max-w-md mx-auto text-center px-4">
        <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 opacity-70" />
        </div>
        <h2 className="font-serif font-bold text-2xl text-slate-900 dark:text-white">Savatchangiz bo'sh</h2>
        <p className="text-xs text-slate-500 mt-2">Buyurtma berish uchun avval kitoblarni savatga qo'shing.</p>
        <Link
          to="/books"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-white font-semibold text-xs shadow-md"
        >
          Katalogga o'tish
        </Link>
      </div>
    );
  }

  // Format card number with spaces
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})/g, '$1 ').trim();
    setCard({ ...card, number: formatted });
  };

  // Format expiry
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCard({ ...card, expiry: `${raw.slice(0, 2)}/${raw.slice(2)}` });
    } else {
      setCard({ ...card, expiry: raw });
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!contact.name || !contact.email || !contact.phone) {
        showToast("Iltimos, barcha aloqa ma'lumotlarini to'ldiring", 'warning');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!address.city || !address.street || !address.house) {
        showToast("Iltimos, yetkazish manzilini to'liq kiriting", 'warning');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    }
  };

  const handlePlaceOrder = () => {
    if (!card.number || card.number.replace(/\s/g, '').length < 16) {
      showToast("Karta raqamini to'liq kiriting (16 raqam)", 'warning');
      return;
    }
    if (!card.expiry || !card.cvv || !card.holder) {
      showToast("Karta ma'lumotlarini to'liq kiriting", 'warning');
      return;
    }

    setIsProcessing(true);

    // Simulate real-time payment gateway
    setTimeout(() => {
      const estimatedDelivery = 
        deliveryMethod === 'express' ? 'Ertaga (24 soat ichida)' : 
        deliveryMethod === 'pickup' ? "Bugun (Do'kondan)" : '2-3 ish kuni ichida';

      const last4 = card.number.replace(/\s/g, '').slice(-4);

      const created = createOrder({
        userId: user?.id || 'guest',
        customerName: contact.name,
        customerEmail: contact.email,
        customerPhone: contact.phone,
        items,
        subtotal,
        discount: discountAmount,
        couponCode: appliedCoupon?.code,
        deliveryFee: deliveryMethod === 'pickup' ? 0 : deliveryFee,
        tax,
        total,
        paymentMethod: 'Bank Card',
        paymentCardLast4: last4,
        paymentStatus: 'completed',
        orderStatus: 'Payment confirmed',
        deliveryAddress: address,
        deliveryMethod,
        estimatedDelivery
      });

      clearCart();
      setIsProcessing(false);
      showToast("Buyurtma va to'lov muvaffaqiyatli qabul qilindi!", 'success');
      navigate(`/order-confirmed/${created.id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="mb-8">
        <h1 className="font-serif font-bold text-3xl text-slate-900 dark:text-white">
          {t.checkout.title}
        </h1>
        <p className="text-xs text-slate-500 mt-1">Xavfsiz va tezkor buyurtma rasmiylashtirish</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Step Form */}
        <div className="lg:col-span-8 bg-white dark:bg-[#1E293B] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
          
          {/* Step indicators */}
          <div className="flex items-center justify-between pb-8 mb-8 border-b border-slate-100 dark:border-slate-800 overflow-x-auto text-xs">
            <div className={`flex items-center gap-2 font-semibold ${currentStep >= 1 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${currentStep > 1 ? 'bg-emerald-500 text-white' : currentStep === 1 ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <span className="hidden sm:inline">Aloqa</span>
            </div>

            <div className="w-8 h-0.5 bg-slate-200 dark:bg-slate-700" />

            <div className={`flex items-center gap-2 font-semibold ${currentStep >= 2 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${currentStep > 2 ? 'bg-emerald-500 text-white' : currentStep === 2 ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                {currentStep > 2 ? <Check className="w-4 h-4" /> : '2'}
              </div>
              <span className="hidden sm:inline">Manzil</span>
            </div>

            <div className="w-8 h-0.5 bg-slate-200 dark:bg-slate-700" />

            <div className={`flex items-center gap-2 font-semibold ${currentStep >= 3 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${currentStep > 3 ? 'bg-emerald-500 text-white' : currentStep === 3 ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                {currentStep > 3 ? <Check className="w-4 h-4" /> : '3'}
              </div>
              <span className="hidden sm:inline">Yetkazish</span>
            </div>

            <div className="w-8 h-0.5 bg-slate-200 dark:bg-slate-700" />

            <div className={`flex items-center gap-2 font-semibold ${currentStep === 4 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${currentStep === 4 ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800'}`}>
                4
              </div>
              <span className="hidden sm:inline">To'lov</span>
            </div>
          </div>

          {/* STEP 1: CONTACT */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-2">
                1. Qabul qiluvchi shaxs ma'lumotlari
              </h3>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t.checkout.fullName}
                </label>
                <input
                  type="text"
                  value={contact.name}
                  onChange={e => setContact({ ...contact, name: e.target.value })}
                  placeholder="Masalan: Humoyun Mirzo"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.checkout.phone}
                  </label>
                  <input
                    type="text"
                    value={contact.phone}
                    onChange={e => setContact({ ...contact, phone: e.target.value })}
                    placeholder="+998 90 123 45 67"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.checkout.email}
                  </label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={e => setContact({ ...contact, email: e.target.value })}
                    placeholder="humoyun@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs flex items-center gap-2 shadow-md transition"
                >
                  <span>Keyingi: Manzil kiritish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ADDRESS */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                  2. Yetkazib berish manzili
                </h3>
              </div>

              {/* Quick Select from Saved Addresses if available */}
              {user?.savedAddresses && user.savedAddresses.length > 0 && (
                <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                    <BookmarkCheck className="w-4 h-4 text-amber-500" />
                    <span>Saqlangan manzillardan tanlash:</span>
                  </div>
                  <div className="relative min-w-[260px]">
                    <select
                      onChange={e => {
                        const idx = parseInt(e.target.value);
                        if (!isNaN(idx) && user.savedAddresses[idx]) {
                          setAddress(user.savedAddresses[idx]);
                          setIsCustomCity(false);
                        }
                      }}
                      className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500 appearance-none pr-9 cursor-pointer shadow-sm font-medium"
                    >
                      <option value="">-- Saqlangan manzilni tanlang --</option>
                      {user.savedAddresses.map((addr, idx) => (
                        <option key={idx} value={idx}>
                          {addr.city}, {addr.street} ({addr.recipientName})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                  </div>
                </div>
              )}
              
              {/* Row 1: Mamlakat & Viloyat/Hudud Selects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.checkout.country}
                  </label>
                  <div className="relative">
                    <select
                      value={address.country}
                      onChange={e => handleCountryChange(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500 appearance-none pr-10 cursor-pointer transition font-medium"
                    >
                      {COUNTRIES_LIST.map(c => (
                        <option key={c} value={c}>
                          {c === "O'zbekiston" ? "🇺🇿 O'zbekiston" : c === "Qozog'iston" ? "🇰🇿 Qozog'iston" : c === "Qirg'iziston" ? "🇰🇬 Qirg'iziston" : c === "Tojikiston" ? "🇹🇯 Tojikiston" : c === "Rossiya" ? "🇷🇺 Rossiya" : c === "Turkiya" ? "🇹🇷 Turkiya" : c === "Birlashgan Arab Amirliklari" ? "🇦🇪 BAA (Dubay)" : c === "AQSh" ? "🇺🇸 AQSh" : c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.checkout.region}
                  </label>
                  {address.country === "O'zbekiston" ? (
                    <div className="relative">
                      <select
                        value={address.region}
                        onChange={e => handleRegionChange(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500 appearance-none pr-10 cursor-pointer transition font-medium"
                      >
                        {Object.keys(REGIONS_DATA).map(reg => (
                          <option key={reg} value={reg}>{reg}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={address.region}
                      onChange={e => setAddress({ ...address, region: e.target.value })}
                      placeholder="Viloyat / Shtat"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  )}
                </div>
              </div>

              {/* Row 2: Shahar / Tuman Select & Postal Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.checkout.city}
                  </label>
                  {address.country === "O'zbekiston" && REGIONS_DATA[address.region] && !isCustomCity ? (
                    <div className="relative">
                      <select
                        value={address.city}
                        onChange={e => handleDistrictChange(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500 appearance-none pr-10 cursor-pointer transition font-medium"
                      >
                        {REGIONS_DATA[address.region]?.districts.map(dist => (
                          <option key={dist} value={dist}>{dist}</option>
                        ))}
                        <option value="Boshqa">Boshqa tuman / shahar (qo'lda kiritish)...</option>
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type="text"
                        value={address.city}
                        onChange={e => setAddress({ ...address, city: e.target.value, district: e.target.value })}
                        placeholder="Toshkent yoki tuman nomi"
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                      />
                      {address.country === "O'zbekiston" && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsCustomCity(false);
                            handleRegionChange(address.region || 'Toshkent shahri');
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-amber-600 dark:text-amber-400 hover:underline"
                        >
                          Ro'yxatdan tanlash
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.checkout.postalCode}
                  </label>
                  <input
                    type="text"
                    value={address.postalCode}
                    onChange={e => setAddress({ ...address, postalCode: e.target.value })}
                    placeholder="100084"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                  />
                </div>
              </div>

              {/* Row 3: Ko'cha va Uy raqami */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.checkout.street}
                  </label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={e => setAddress({ ...address, street: e.target.value })}
                    placeholder="Amir Temur shoh ko'chasi"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.checkout.house}
                  </label>
                  <input
                    type="text"
                    value={address.house}
                    onChange={e => setAddress({ ...address, house: e.target.value })}
                    placeholder="42-uy"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Row 4: Kvartira & Turar-joy turi Select */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.checkout.apartment}
                  </label>
                  <input
                    type="text"
                    value={address.apartment || ''}
                    onChange={e => setAddress({ ...address, apartment: e.target.value })}
                    placeholder="15-kvartira / xonadon"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Bino / Turar-joy turi
                  </label>
                  <div className="relative">
                    <select
                      value={housingType}
                      onChange={e => setHousingType(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500 appearance-none pr-10 cursor-pointer transition font-medium"
                    >
                      <option value="apartment">🏢 Ko'p qavatli bino (Kvartira)</option>
                      <option value="house">🏡 Xususiy hovli / Yer uy</option>
                      <option value="office">🏢 Ofis / Biznes markaz</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Row 5: Qulay yetkazish vaqti Select */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Yetkazib berish uchun qulay vaqt
                </label>
                <div className="relative">
                  <select
                    value={deliveryTimeSlot}
                    onChange={e => setDeliveryTimeSlot(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500 appearance-none pr-10 cursor-pointer transition font-medium"
                  >
                    <option value="any">🕒 Istalgan vaqtda (09:00 - 21:00)</option>
                    <option value="morning">🌅 Ertalab (09:00 - 13:00)</option>
                    <option value="afternoon">☀️ Tushdan keyin (13:00 - 18:00)</option>
                    <option value="evening">🌙 Kechki payt (18:00 - 21:00)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                </div>
              </div>

              <div className="pt-6 flex justify-between items-center">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Ortga</span>
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs flex items-center gap-2 shadow-md transition"
                >
                  <span>Keyingi: Yetkazish usuli</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DELIVERY METHOD */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-2">
                3. Yetkazib berish xizmatini tanlang
              </h3>

              <div className="space-y-3">
                <label
                  onClick={() => setDeliveryMethod('express')}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition ${
                    deliveryMethod === 'express'
                      ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-slate-900 dark:text-white">
                        {t.checkout.deliveryExpress}
                      </p>
                      <p className="text-[11px] text-slate-500">Kutilayotgan yetkazish: Ertaga (24 soat)</p>
                    </div>
                  </div>
                  <span className="font-bold text-xs text-slate-900 dark:text-white">$4.99 (yoki bepul)</span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('standard')}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition ${
                    deliveryMethod === 'standard'
                      ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-slate-900 dark:text-white">
                        {t.checkout.deliveryStandard}
                      </p>
                      <p className="text-[11px] text-slate-500">Kutilayotgan yetkazish: 2-3 ish kuni</p>
                    </div>
                  </div>
                  <span className="font-bold text-xs text-slate-900 dark:text-white">$2.99</span>
                </label>

                <label
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition ${
                    deliveryMethod === 'pickup'
                      ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs text-slate-900 dark:text-white">
                        {t.checkout.deliveryPickup}
                      </p>
                      <p className="text-[11px] text-slate-500">Markaziy filialimizdan bugunoq olib ketishingiz mumkin</p>
                    </div>
                  </div>
                  <span className="font-bold text-xs text-emerald-600">Bepul</span>
                </label>
              </div>

              <div className="pt-6 flex justify-between items-center">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Ortga</span>
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs flex items-center gap-2 shadow-md transition"
                >
                  <span>Keyingi: To'lovga o'tish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: PAYMENT */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">
                  4. Xavfsiz Bank Kartasi orqali to'lov
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Humo, Uzcard, Visa va Mastercard xalqaro tizimlari qo'llab-quvvatlanadi
                </p>
              </div>

              {/* Simulated Card Preview */}
              <div className="p-6 rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-800 to-amber-950 text-white shadow-2xl relative overflow-hidden border border-slate-700 max-w-sm">
                <div className="flex justify-between items-center mb-8">
                  <span className="font-serif font-bold tracking-widest text-amber-400">KitobShop Card</span>
                  <CreditCard className="w-6 h-6 text-slate-400" />
                </div>
                <div className="font-mono text-lg tracking-widest mb-4">
                  {card.number || '•••• •••• •••• ••••'}
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Karta egasi</span>
                    <span className="font-semibold uppercase">{card.holder || 'ISM FAMILIYA'}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Amal qilish</span>
                    <span className="font-semibold">{card.expiry || 'MM/YY'}</span>
                  </div>
                </div>
              </div>

              {/* Card input fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.checkout.cardNumber}
                  </label>
                  <input
                    type="text"
                    value={card.number}
                    onChange={handleCardNumberChange}
                    placeholder="8600 0000 0000 0000"
                    maxLength={19}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.checkout.cardExpiry}
                    </label>
                    <input
                      type="text"
                      value={card.expiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t.checkout.cardCvv}
                    </label>
                    <input
                      type="password"
                      value={card.cvv}
                      onChange={e => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                      placeholder="•••"
                      maxLength={4}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t.checkout.cardHolder}
                  </label>
                  <input
                    type="text"
                    value={card.holder}
                    onChange={e => setCard({ ...card, holder: e.target.value.toUpperCase() })}
                    placeholder="HUMOYUN MIRZO"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 uppercase text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                <span>To'lov ma'lumotlari 256-bit SSL shifrlash bilan himoyalangan.</span>
              </div>

              <div className="pt-6 flex justify-between items-center">
                <button
                  onClick={() => setCurrentStep(3)}
                  disabled={isProcessing}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Ortga</span>
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-semibold text-sm shadow-xl flex items-center gap-2 transition disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>{t.checkout.processingPayment}</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>{t.checkout.payNow} (${total.toFixed(2)})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-4">
          <h3 className="font-serif font-bold text-base text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
            {t.checkout.orderSummary} ({items.length})
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-64 overflow-y-auto pr-1">
            {items.map(item => (
              <div key={item.bookId} className="py-3 flex items-center gap-3">
                <img
                  src={item.book.coverImage}
                  alt={item.book.title}
                  className="w-12 h-16 object-cover rounded-lg shadow-sm flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-semibold text-xs text-slate-900 dark:text-white truncate">
                    {item.book.title}
                  </p>
                  <p className="text-[11px] text-slate-500">{item.quantity} dona × ${item.price.toFixed(2)}</p>
                </div>
                <span className="font-bold text-xs text-slate-900 dark:text-white font-mono">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span>{t.cart.subtotal}</span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span>{t.cart.discount} ({appliedCoupon?.code})</span>
                <span className="font-semibold font-mono">-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>{t.cart.deliveryFee}</span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">
                {deliveryFee === 0 ? <span className="text-emerald-500 font-bold">Bepul</span> : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>{t.cart.tax}</span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">${tax.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-sm font-bold text-slate-900 dark:text-white">
              <span>{t.cart.total}</span>
              <span className="text-base text-amber-600 dark:text-amber-400 font-mono">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
