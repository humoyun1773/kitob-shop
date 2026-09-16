import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  ChevronRight, 
  BookOpen, 
  Send
} from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useLanguage } from '../context/LanguageContext';
import { BookCard } from '../components/books/BookCard';
import { SEO } from '../components/common/SEO';

export const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookById, books, addReview } = useBooks();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const book = getBookById(id || '');

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>(book?.coverImage || '');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  // 3D tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  if (!book) {
    return (
      <div className="min-h-screen pt-36 pb-20 flex flex-col items-center justify-center text-center px-4">
        <h2 className="font-serif font-bold text-2xl text-slate-900 dark:text-white">Kitob topilmadi</h2>
        <p className="text-sm text-slate-500 mt-2">Bunday identifikatorga ega kitob mavjud emas yoki o'chirilgan.</p>
        <Link
          to="/books"
          className="mt-6 px-6 py-2.5 rounded-xl bg-amber-500 text-white font-semibold text-xs shadow-md"
        >
          Katalogga qaytish
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(book.id);

  // Similar books by category or tags
  const similarBooks = books
    .filter(b => b.id !== book.id && (b.category === book.category || b.author === book.author))
    .slice(0, 4);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 15;
    const y = ((e.clientY - top) / height - 0.5) * -15;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleAddToCart = () => {
    addToCart(book, quantity);
    showToast(`${quantity}x "${book.title}" savatchaga qo'shildi!`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(book, quantity);
    navigate('/checkout');
  };

  const handleWishlist = () => {
    toggleWishlist(book);
    if (!inWishlist) {
      showToast(`"${book.title}" saralanganlarga qo'shildi`, 'success');
    } else {
      showToast(`"${book.title}" saralanganlardan olib tashlandi`, 'info');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      showToast("Iltimos, ismingiz va fikringizni yozing", 'warning');
      return;
    }
    setIsSubmittingReview(true);
    setTimeout(() => {
      addReview(book.id, {
        userName: reviewName.trim(),
        rating: reviewRating,
        comment: reviewComment.trim()
      });
      setIsSubmittingReview(false);
      setReviewName('');
      setReviewComment('');
      showToast("Sharhingiz muvaffaqiyatli qoldirildi!", 'success');
    }, 400);
  };

  return (
    <div className="min-h-screen pt-24 pb-32 lg:pb-20">
      <SEO
        title={`${book.title} — ${book.author} | KitobShop`}
        description={book.description.slice(0, 160)}
        keywords={`${book.title}, ${book.author}, ${book.category}, sotib olish, narxi, sharhlar`}
        image={book.coverImage}
        type="book"
        schema={{
          "@context": "https://schema.org",
          "@type": "Book",
          "name": book.title,
          "author": {
            "@type": "Person",
            "name": book.author
          },
          "isbn": book.isbn,
          "image": book.coverImage,
          "description": book.description,
          "numberOfPages": book.pages,
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": book.rating,
            "reviewCount": book.reviewsCount
          },
          "offers": {
            "@type": "Offer",
            "price": book.price,
            "priceCurrency": "USD",
            "availability": book.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "seller": {
              "@type": "Organization",
              "name": "KitobShop"
            }
          }
        }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-4 border-b border-slate-200/60 dark:border-slate-800/60">
        <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-amber-500 transition">Bosh sahifa</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/books" className="hover:text-amber-500 transition">Kitoblar</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to={`/books?category=${encodeURIComponent(book.category)}`} className="hover:text-amber-500 transition">{book.category}</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-white font-medium truncate max-w-xs">{book.title}</span>
        </nav>
      </div>

      {/* Main Product Layout */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Cover with 3D Tilt & Gallery */}
          <div className="lg:col-span-5 space-y-4">
            <div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: 'transform 0.1s ease-out'
              }}
              className="relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 dark:bg-[#1E293B] shadow-2xl border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center p-4 sm:p-8 group cursor-zoom-in"
            >
              <img
                src={activeImage || book.coverImage}
                alt={book.title}
                className="max-h-[480px] w-auto object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800';
                }}
              />

              {book.discount && book.discount > 0 ? (
                <span className="absolute top-6 left-6 px-3.5 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-md">
                  -{book.discount}% Chegirma
                </span>
              ) : null}
            </div>

            {/* Thumbnail Gallery */}
            {book.galleryImages && book.galleryImages.length > 1 && (
              <div className="flex gap-3 justify-center pt-2">
                {book.galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition ${
                      (activeImage || book.coverImage) === img
                        ? 'border-amber-500 scale-105 shadow-md'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Book Details & Purchase CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  {book.category}
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {book.format}
                </span>
                {book.isBestseller && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white uppercase">
                    Bestseller
                  </span>
                )}
              </div>

              <h1 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white leading-tight">
                {book.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
                Muallif: <span className="font-semibold text-slate-900 dark:text-slate-200">{book.author}</span>
              </p>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(book.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-sm text-slate-900 dark:text-white">{book.rating}</span>
                <span className="text-xs text-slate-400">({book.reviewsCount} ta kitobxon sharhi)</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#1E293B] border border-slate-200/70 dark:border-slate-700/70 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block mb-1">
                  Xarid narxi:
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif font-bold text-3xl text-slate-900 dark:text-white">
                    ${book.price.toFixed(2)}
                  </span>
                  {book.oldPrice && (
                    <span className="text-base text-slate-400 line-through">
                      ${book.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                {book.stock > 0 ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50">
                    <Check className="w-3.5 h-3.5" />
                    Omborda mavjud ({book.stock} dona)
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">
                    Sotuvda qolmagan
                  </span>
                )}
              </div>
            </div>

            {/* Quantity & CTAs */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center justify-between border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-900 p-1.5 w-full sm:w-36">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(book.stock, quantity + 1))}
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={book.stock <= 0}
                  className="flex-1 py-4 px-6 rounded-2xl bg-[#0F172A] text-white hover:bg-[#F59E0B] hover:text-[#0F172A] dark:bg-[#F59E0B] dark:text-[#0F172A] dark:hover:bg-amber-400 font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Savatga qo'shish</span>
                </button>

                {/* Wishlist button */}
                <button
                  onClick={handleWishlist}
                  className={`p-4 rounded-2xl border transition shadow-sm ${
                    inWishlist
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/30 text-rose-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  title="Saralanganlarga"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                disabled={book.stock <= 0}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F59E0B] via-amber-500 to-[#d97706] hover:from-[#d97706] hover:to-[#F59E0B] text-[#0F172A] font-bold text-sm shadow-xl shadow-[#F59E0B]/20 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{t.detail.buyNow}</span>
              </button>
            </div>

            {/* Delivery Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Truck className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>Tez yetkazish</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>100% Asl nashr</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <RotateCcw className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>14 kun qaytarish</span>
              </div>
            </div>

          </div>
        </div>

        {/* Description & Specification Tabs */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-slate-200/60 dark:border-slate-800/60 pt-12">
          
          {/* Description */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif font-bold text-2xl text-slate-900 dark:text-white">
              {t.detail.description}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {book.description}
            </p>

            {/* Genres / Tags */}
            <div className="pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Teglar & Janrlar:
              </h4>
              <div className="flex flex-wrap gap-2">
                {book.genres.concat(book.tags).map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="lg:col-span-5 bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
            <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-4">
              {t.detail.specifications}
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">{t.detail.publisher}</span>
                <span className="font-medium text-slate-900 dark:text-white">{book.publisher}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">{t.detail.publishDate}</span>
                <span className="font-medium text-slate-900 dark:text-white">{book.publicationDate}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">{t.detail.pages}</span>
                <span className="font-medium text-slate-900 dark:text-white">{book.pages} bet</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">{t.detail.isbn}</span>
                <span className="font-mono text-slate-900 dark:text-white">{book.isbn}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">{t.detail.language}</span>
                <span className="font-medium text-slate-900 dark:text-white">{book.language}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-slate-500">{t.detail.format}</span>
                <span className="font-medium text-slate-900 dark:text-white">{book.format}</span>
              </div>
              {book.dimensions && (
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">{t.detail.dimensions}</span>
                  <span className="font-medium text-slate-900 dark:text-white">{book.dimensions}</span>
                </div>
              )}
              {book.weight && (
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">{t.detail.weight}</span>
                  <span className="font-medium text-slate-900 dark:text-white">{book.weight}</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Customer Reviews Section */}
        <div className="mt-16 border-t border-slate-200/60 dark:border-slate-800/60 pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Reviews List */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="font-serif font-bold text-2xl text-slate-900 dark:text-white">
                {t.detail.reviews} ({book.reviews.length})
              </h3>

              {book.reviews.length === 0 ? (
                <p className="text-xs text-slate-500">Hozircha sharhlar yo'q. Birinchi bo'lib fikr qoldiring!</p>
              ) : (
                <div className="space-y-4">
                  {book.reviews.map(rev => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-white dark:bg-[#1E293B] border border-slate-200/70 dark:border-slate-700/70 space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-slate-900 dark:text-white">
                          {rev.userName}
                        </span>
                        <span className="text-[11px] text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Write a Review Form */}
            <div className="lg:col-span-5 bg-white dark:bg-[#1E293B] p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
              <h4 className="font-serif font-bold text-lg text-slate-900 dark:text-white mb-4">
                {t.detail.writeReview}
              </h4>
              <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    {t.detail.yourRating}
                  </label>
                  <div className="flex items-center gap-1.5 text-amber-400 cursor-pointer">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className="p-1 hover:scale-110 transition"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= reviewRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300 dark:text-slate-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Ismingiz
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewName}
                    onChange={e => setReviewName(e.target.value)}
                    placeholder="Masalan: Humoyun"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Fikringiz
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={reviewComment}
                    onChange={e => setReviewComment(e.target.value)}
                    placeholder={t.detail.yourComment}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:bg-amber-600 dark:hover:bg-amber-400 transition flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmittingReview ? 'Yuborilmoqda...' : t.detail.submitReview}</span>
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Similar Books */}
        {similarBooks.length > 0 && (
          <div className="mt-20 border-t border-slate-200/60 dark:border-slate-800/60 pt-12">
            <h3 className="font-serif font-bold text-2xl text-slate-900 dark:text-white mb-8">
              {t.detail.similarBooks}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
              {similarBooks.map(b => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
