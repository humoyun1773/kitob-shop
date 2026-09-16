import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ArrowLeft, 
  X, 
  Check, 
  BookOpen, 
  Star 
} from 'lucide-react';
import { useBooks } from '../context/BookContext';
import { useToast } from '../context/ToastContext';
import { Book, BookCategory, BookFormat } from '../types/book';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

export const AdminBooksPage: React.FC = () => {
  const { books, addBook, updateBook, deleteBook } = useBooks();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookId, setEditingBookId] = useState<string | null>(null);

  useBodyScrollLock(isModalOpen);

  // Form State
  const initialFormData = {
    title: '',
    author: '',
    description: '',
    price: 15.00,
    discount: 0,
    category: 'Fiction' as BookCategory,
    genres: 'Badiiy',
    language: 'UZ' as 'UZ' | 'RU' | 'EN',
    isbn: '978-0000000000',
    publisher: 'Yangi Nashr',
    publicationDate: '2026-01-01',
    pages: 300,
    format: 'Paperback' as BookFormat,
    stock: 20,
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    tags: "Bestseller, O'qish"
  };

  const [formData, setFormData] = useState(initialFormData);

  const categories: BookCategory[] = [
    'Fiction', 'Romance', 'Fantasy', 'Thriller', 'Mystery', 
    'Self Development', 'Business', 'Technology', 'History', 
    'Children', 'Education', 'Classics'
  ];

  const formats: BookFormat[] = ['Paperback', 'Hardcover', 'E-book', 'Audiobook'];

  const filteredBooks = books.filter(b => {
    const matchQuery = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       b.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = !selectedCategory || b.category === selectedCategory;
    return matchQuery && matchCategory;
  });

  const handleOpenAddModal = () => {
    setEditingBookId(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (book: Book) => {
    setEditingBookId(book.id);
    setFormData({
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      discount: book.discount || 0,
      category: book.category,
      genres: book.genres.join(', '),
      language: book.language,
      isbn: book.isbn,
      publisher: book.publisher,
      publicationDate: book.publicationDate,
      pages: book.pages,
      format: book.format,
      stock: book.stock,
      coverImage: book.coverImage,
      tags: book.tags.join(', ')
    });
    setIsModalOpen(true);
  };

  const handleDeleteBook = (id: string, title: string) => {
    if (window.confirm(`"${title}" kitobini o'chirishni tasdiqlaysizmi?`)) {
      deleteBook(id);
      showToast(`"${title}" kitobi o'chirildi!`, 'info');
    }
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.coverImage) {
      showToast('Sarlavha, muallif va muqova rasmini kiriting', 'warning');
      return;
    }

    const payload = {
      title: formData.title,
      author: formData.author,
      description: formData.description,
      price: Number(formData.price),
      discount: Number(formData.discount),
      oldPrice: Number(formData.discount) > 0 ? Number((formData.price * (1 + formData.discount / 100)).toFixed(2)) : undefined,
      category: formData.category,
      genres: formData.genres.split(',').map(s => s.trim()).filter(Boolean),
      language: formData.language,
      isbn: formData.isbn,
      publisher: formData.publisher,
      publicationDate: formData.publicationDate,
      pages: Number(formData.pages),
      format: formData.format,
      stock: Number(formData.stock),
      coverImage: formData.coverImage,
      galleryImages: [formData.coverImage],
      rating: 4.8,
      tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean)
    };

    if (editingBookId) {
      updateBook(editingBookId, payload);
      showToast(`"${formData.title}" muvaffaqiyatli yangilandi!`, 'success');
    } else {
      addBook(payload);
      showToast(`"${formData.title}" yangi kitob sifatida qo'shildi!`, 'success');
    }

    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-200/60 dark:border-slate-800/60 gap-4">
        <div>
          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-amber-500 transition mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboardga qaytish</span>
          </Link>
          <h1 className="font-serif font-bold text-3xl text-slate-900 dark:text-white">
            Kitoblar Boshqaruvi ({books.length})
          </h1>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi kitob qo'shish</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#1E293B] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Kitob yoki muallif nomi..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="w-full sm:w-56 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
        >
          <option value="">Barcha kategoriyalar</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Books Table */}
      <div className="bg-white dark:bg-[#1E293B] rounded-3xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-700 text-slate-500 font-semibold uppercase">
                <th className="py-3 px-4">Kitob</th>
                <th className="py-3 px-4">Kategoriya</th>
                <th className="py-3 px-4">Narx</th>
                <th className="py-3 px-4">Qoldiq</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredBooks.map(b => (
                <tr key={b.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={b.coverImage}
                        alt={b.title}
                        className="w-10 h-14 object-cover rounded-lg shadow-sm flex-shrink-0"
                      />
                      <div className="min-w-0 max-w-xs sm:max-w-md">
                        <Link to={`/books/${b.id}`} className="font-serif font-semibold text-xs text-slate-900 dark:text-white hover:text-amber-500 transition line-clamp-1">
                          {b.title}
                        </Link>
                        <p className="text-[11px] text-slate-400 truncate">{b.author}</p>
                        <span className="text-[10px] font-mono text-slate-400">ISBN: {b.isbn}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                      {b.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    ${b.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-semibold ${b.stock > 10 ? 'text-emerald-500' : b.stock > 0 ? 'text-amber-500' : 'text-rose-500'}`}>
                      {b.stock} dona
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{b.format}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditModal(b)}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                        title="Tahrirlash"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBook(b.id, b.title)}
                        className="p-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-500 transition"
                        title="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Book Modal */}
      {isModalOpen && (
        <div 
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in overflow-y-auto"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-white dark:bg-[#1E293B] rounded-3xl p-6 sm:p-8 shadow-2xl my-8 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white">
                {editingBookId ? 'Kitobni tahrirlash' : "Yangi kitob qo'shish"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Sarlavha *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Muallif *</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Kitob tavsifi</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Narx ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Chegirma (%)</label>
                  <input
                    type="number"
                    value={formData.discount}
                    onChange={e => setFormData({ ...formData, discount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Omborda (dona)</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Sahifalar</label>
                  <input
                    type="number"
                    value={formData.pages}
                    onChange={e => setFormData({ ...formData, pages: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Kategoriya</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as BookCategory })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Format</label>
                  <select
                    value={formData.format}
                    onChange={e => setFormData({ ...formData, format: e.target.value as BookFormat })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  >
                    {formats.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Til</label>
                  <select
                    value={formData.language}
                    onChange={e => setFormData({ ...formData, language: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  >
                    <option value="UZ">O'zbekcha (UZ)</option>
                    <option value="RU">Русский (RU)</option>
                    <option value="EN">English (EN)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Muqova rasmi (URL) *</label>
                <input
                  type="url"
                  required
                  value={formData.coverImage}
                  onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">ISBN</label>
                  <input
                    type="text"
                    value={formData.isbn}
                    onChange={e => setFormData({ ...formData, isbn: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Nashriyot</label>
                  <input
                    type="text"
                    value={formData.publisher}
                    onChange={e => setFormData({ ...formData, publisher: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-700 font-semibold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-md"
                >
                  {editingBookId ? 'Yangilash' : 'Saqlash'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
