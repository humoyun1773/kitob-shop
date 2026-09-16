import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { NotificationProvider } from './context/NotificationContext';
import { ToastProvider } from './context/ToastContext';

// Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { ScrollToTop } from './components/common/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { BooksPage } from './pages/BooksPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { OrdersPage } from './pages/OrdersPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminBooksPage } from './pages/AdminBooksPage';
import { AdminOrdersPage } from './pages/AdminOrdersPage';
import { AdminUsersPage } from './pages/AdminUsersPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <BookProvider>
              <CartProvider>
                <WishlistProvider>
                  <OrderProvider>
                    <NotificationProvider>
                      <ToastProvider>
                        <BrowserRouter>
                          <ScrollToTop />
                          <div className="flex flex-col min-h-screen">
                            <Navbar />
                            <main className="flex-grow">
                              <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/books" element={<BooksPage />} />
                                <Route path="/books/:id" element={<BookDetailPage />} />
                                <Route path="/wishlist" element={<WishlistPage />} />
                                <Route path="/cart" element={<CartPage />} />
                                <Route path="/checkout" element={<CheckoutPage />} />
                                <Route path="/order-confirmed/:id" element={<OrderConfirmationPage />} />
                                <Route path="/order/:id" element={<OrderTrackingPage />} />
                                <Route path="/orders" element={<OrdersPage />} />
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                
                                {/* Admin Protected Routes */}
                                <Route path="/admin" element={<AdminDashboardPage />} />
                                <Route path="/admin/books" element={<AdminBooksPage />} />
                                <Route path="/admin/orders" element={<AdminOrdersPage />} />
                                <Route path="/admin/users" element={<AdminUsersPage />} />

                                {/* 404 Fallback */}
                                <Route path="*" element={<NotFoundPage />} />
                              </Routes>
                            </main>
                            <CartDrawer />
                            <Footer />
                          </div>
                        </BrowserRouter>
                      </ToastProvider>
                    </NotificationProvider>
                  </OrderProvider>
                </WishlistProvider>
              </CartProvider>
            </BookProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
