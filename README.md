# 📚 KitobShop — Premium & Zamonaviy Online Kitob Do'koni

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646cff.svg)](https://vitejs.dev/)

**KitobShop** — zamonaviy, premium, estetik va to'liq interaktiv online kitob do'koni va ecommerce platformasi. Foydalanuvchi saytga kirgan zahoti haqiqiy adabiyot muhitini his qilishi uchun cinematic hero, suzuvchi 3D kitob kartalari, jonli buyurtma kuzatuvi va to'liq ma'muriyat (admin) tizimi bilan jihozlangan.

---

## ✨ Asosiy Xususiyatlar (Features)

### 1. 🎨 Premium & Cinematic Dizayn
- **Hero Section:** Jozibador katta tipografiya, animatsiyali suzuvchi 3D kitob muqovalari, nozik zarralar (particles) va gradient yoritish effektlari.
- **Micro Interactions:** Tugmalar bosilishi, kartalar siljishi (card lift, image zoom), saralanganlar (wishlist heart) animatsiyasi.
- **Responsive Layout:** Desktop, noutbuk, planshet va mobil qurilmalar uchun maxsus moslashuvchan interfeys (jumladan, mobil qurilmalarda **Bottom Navigation Bar**).

### 2. 🔍 Real-vaqt Qidiruv & Aqlli Filtrlar
- **Real-time Search:** Sarlavha, muallif, janr, ISBN va kitob tavsifi bo'yicha qidiruv, avtomatik takliflar (autocomplete) va ommabop qidiruvlar.
- **Kuchli Filtrlar:**
  - Kategoriya (Badiiy, Biznes, Psixologiya, Klassika, Tarix, IT, Bolalar va h.k.)
  - Narx oralig'i slayderi ($0 — $100+)
  - Reyting (⭐ 4+, 3+)
  - Format (Paperback, Hardcover, E-book, Audiobook)
  - Til (UZ, RU, EN)
  - Omborda mavjudligi (In stock)
  - Saralash (Eng yangilar, Ommabop, Narx: arzondan qimmatga, qimmatdan arzonga, reyting).

### 3. 📖 Kitob Tafsilotlari & 3D Tilt Effekt
- Kursorni kuzatuvchi nozik 3D egilish (tilt) effekti bilan kitob muqovasi.
- Rasm galereyasi va tezkor ko'rish (Quick View Modal).
- Nashriyot, sahifalar soni, ISBN, o'lchami va og'irligi ko'rsatilgan xususiyatlar jadvali.
- Haqiqiy mijozlar sharhlari va yulduzchali baholash orqali yangi sharh qoldirish tizimi.
- Janr va muallifga mos tavsiya etilgan o'xshash kitoblar (Similar Books).

### 4. 🛒 Savatcha & Ko'p Bosqichli Checkout
- **Cart Drawer & Page:** Savatchadagi kitoblar sonini o'zgartirish, o'chirish va hisob-kitob.
- **Kupon Tizimi (Coupon System):** Promo-kodlar (masalan: `SAVE20`, `KITOB10`, `WELCOME5`) kiritilganda darhol avtomatik chegirma hisoblanadi.
- **4 Bosqichli Xarid:**
  1. Aloqa ma'lumotlari (Ism, Telefon, Email)
  2. Yetkazib berish manzili (Shahar, tuman, ko'cha, uy, kvartira, pochta)
  3. Yetkazish xizmatlari (Standart, Express 24h, Olib ketish)
  4. Bank kartasi bilan xavfsiz to'lov (`**** **** **** 1234`, amal qilish muddati, CVV, Karta egasi ismi).

### 5. 🚚 Jonli Buyurtma Kuzatuvi (Real-time Tracking)
- Bosqichma-bosqich kuzatuv vaqti va holati:
  `Order placed` ➔ `Payment confirmed` ➔ `Processing` ➔ `Packed` ➔ `Shipped` ➔ `Out for delivery` ➔ `Delivered`.
- Har bir bosqichning sana, vaqt va izohlari.
- Admin tomondan status o'zgartirilganda xaridorning kuzatuv sahifasida darhol aks etadi!

### 6. 🧾 Rasmiy Xarid Cheki (Receipt)
- Buyurtma ID, sana, mijoz ma'lumotlari, mahsulotlar jadvali, yetkazish manzili va to'lov rekvizitlari.
- **Chop etish va PDF formatida yuklab olish** imkoniyati (@media print stilizatsiyasi bilan).

### 7. 🔔 Bildirishnomalar Tizimi (Notifications)
- Navbar ichidagi popover va o'qilmagan xabarlar soni nishoni (`🔔 3`).
- Buyurtma holati o'zgarganda xaridorga avtomatik bildirishnoma jo'natiladi.

### 8. 🛡️ Administrator Paneli (Admin Dashboard)
- **Dashboard:** Jami savdo summasi, buyurtmalar, kitoblar va mijozlar soni, 7 kunlik savdo diagrammasi va kategoriyalar ulushi.
- **Kitoblar Boshqaruvi:** Yangi kitob qo'shish (modal orqali barcha maydonlar bilan), mavjud kitoblarni tahrirlash, o'chirish va qidirish.
- **Buyurtmalar Boshqaruvi:** Barcha buyurtmalarni ko'rish, holat bo'yicha filtrlash, buyurtma holatini (Status) bir bosishda yangilash.
- **Foydalanuvchilar Boshqaruvi:** Mijozlar ro'yxati, aloqa ma'lumotlari va jami xaridlari.

### 9. 🌐 Ko'p Tilli Tizim (i18n) & 🌙 Dark / Light Rejim
- **Tillar:** O'zbekcha (UZ 🇺🇿), Ruscha (RU 🇷🇺), Inglizcha (EN 🇺🇸).
- **Mavzu:** Yorug' (Light) va Qorong'i (Dark) rejimlar, tizim sozlamasiga moslashuv va brauzer xotirasida saqlanishi.

---

## 🚀 O'rnatish va Ishga Tushirish (Quick Start)

### Talablar
- Node.js (v18 yoki undan yuqori)
- npm yoki yarn

### Qadamlar:

```bash
# 1. Repozitoriyani klonlash
git clone https://github.com/humoyun1773/kitob-shop.git
cd kitob-shop

# 2. Bog'liqliklarni o'rnatish
npm install

# 3. Loyihani ishlab chiqish rejimida ishga tushirish
npm run dev
```

Brauzerda oching: `http://localhost:5173`

### Production uchun Build qilish:
```bash
npm run build
npm run preview
```

---

## 📂 Loyiha Tuzilmasi (Folder Structure)

```
kitob-shop/
├── index.html
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types/               # TypeScript modellari (Book, Order, User, Notification)
│   ├── data/                # Mock ma'lumotlar (20+ haqiqiy kitoblar, kuponlar)
│   ├── i18n/                # UZ, RU, EN tarjimalar
│   ├── context/             # Global holat (Auth, Cart, Wishlist, Orders, Books, Notifications, Theme, Lang)
│   ├── components/
│   │   ├── common/          # Navbar, Footer, QuickViewModal, Toast
│   │   ├── books/           # BookCard, FilterSidebar, SearchBar
│   │   ├── cart/            # CartDrawer
│   │   └── orders/          # OrderTrackingTimeline, ReceiptModal
│   └── pages/               # Barcha sahifalar (Home, Books, Details, Checkout, Tracking, Orders, Profile, Admin)
```

---

## 🔑 Sinov Uchun Foydalanuvchilar (Demo Accounts)

- **Admin hisobi:** Profil menyusidagi "Rolni almashtirish" tugmasini bosing yoki `admin@kitobshop.uz` orqali kiring.
- **Xaridor hisobi:** Istalgan yangi hisob yaratishingiz yoki xaridor roliga o'tishingiz mumkin.
- **Mavjud Kupon kodlari:** `SAVE20` (20% chegirma), `KITOB10` (10% chegirma), `WELCOME5` ($5 chegirma).

---

## 📄 Litsenziya

MIT License © 2026 KitobShop. Barcha huquqlar himoyalangan.
