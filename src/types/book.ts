export type BookCategory = 
  | 'Fiction'
  | 'Romance'
  | 'Fantasy'
  | 'Thriller'
  | 'Mystery'
  | 'Self Development'
  | 'Business'
  | 'Technology'
  | 'History'
  | 'Children'
  | 'Education'
  | 'Classics';

export type BookFormat = 'Paperback' | 'Hardcover' | 'E-book' | 'Audiobook';

export interface BookReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  discount?: number; // percentage, e.g. 20 for 20%
  oldPrice?: number;
  category: BookCategory;
  genres: string[];
  language: 'UZ' | 'RU' | 'EN';
  isbn: string;
  publisher: string;
  publicationDate: string;
  pages: number;
  format: BookFormat;
  stock: number;
  coverImage: string;
  galleryImages: string[];
  rating: number;
  reviewsCount: number;
  reviews: BookReview[];
  tags: string[];
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  dimensions?: string;
  weight?: string;
  createdAt: string;
  updatedAt: string;
}
