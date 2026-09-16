import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ArrowLeft, 
  Search, 
  Eye, 
  CheckCircle, 
  Truck, 
  X, 
  FileText,
  Filter
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useNotifications } from '../context/NotificationContext';
import { useToast } from '../context/ToastContext';
import { Order, OrderStatus } from '../types/order';
import { ReceiptModal } from '../components/orders/ReceiptModal';

export const AdminOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus } = useOrders();
  const { addNotification } = useNotifications();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<Order | null>(null);

  const statuses: OrderStatus[] = [
    'Order placed',
    'Payment confirmed',
    'Processing',
    'Packed',
    'Shipped',
    'Out for delivery',
    'Delivered',
    'Cancelled'
  ];

  const filteredOrders = orders.filter(o => {
    const matchQuery = o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       o.customerPhone.includes(searchQuery);
    const matchStatus = !selectedStatus || o.orderStatus === selectedStatus;
    return matchQuery && matchStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    showToast(`Buyurtma #${orderId} holati "${newStatus}" ga o'zgartirildi!`, 'success');

    // Notify the user in real-time
    addNotification({
      userId: 'usr-101',
      title: `Buyurtma yangilandi: ${newStatus}`,
      message: `Sizning #${orderId} raqamli buyurtmangiz holati o'zgardi: ${newStatus}`,
      type: 'order',
      orderId
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Mijozlar Buyurtmalari ({orders.length})
          </h1>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#161a23] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buyurtma ID, ism yoki telefon..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <select
          value={selectedStatus}
          onChange={e => setSelectedStatus(e.target.value)}
          className="w-full sm:w-56 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
        >
          <option value="">Barcha holatlar</option>
          {statuses.map(st => (
            <option key={st} value={st}>{st}</option>
          ))}
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-[#161a23] rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#121620] border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold uppercase">
                <th className="py-3 px-4">Buyurtma ID</th>
                <th className="py-3 px-4">Xaridor</th>
                <th className="py-3 px-4">Kitoblar soni</th>
                <th className="py-3 px-4">Yetkazish</th>
                <th className="py-3 px-4">Summa</th>
                <th className="py-3 px-4">Holat</th>
                <th className="py-3 px-4 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredOrders.map(o => (
                <tr key={o.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    #{o.id}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{o.customerName}</p>
                    <p className="text-[11px] text-slate-400">{o.customerPhone}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                    {o.items.length} ta kitob
                  </td>
                  <td className="py-3 px-4">
                    <span className="capitalize font-semibold text-slate-700 dark:text-slate-300">
                      {o.deliveryMethod}
                    </span>
                    <span className="block text-[10px] text-slate-400">{o.deliveryAddress.city}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                    ${o.total.toFixed(2)}
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={o.orderStatus}
                      onChange={e => handleStatusChange(o.id, e.target.value as OrderStatus)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
                    >
                      {statuses.map(st => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedOrderDetails(o)}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                        title="Batafsil ko'rish"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedReceiptOrder(o)}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition"
                        title="Chekni ochish"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#181c24] rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-xs uppercase font-bold text-amber-500 tracking-wider">Buyurtma Tafsiloti</span>
                <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white mt-0.5">
                  #{selectedOrderDetails.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900">
                  <h4 className="font-bold text-slate-500 uppercase text-[10px] mb-2">Mijoz ma'lumotlari:</h4>
                  <p className="font-semibold text-slate-900 dark:text-white">{selectedOrderDetails.customerName}</p>
                  <p className="text-slate-500">{selectedOrderDetails.customerEmail}</p>
                  <p className="text-slate-500">{selectedOrderDetails.customerPhone}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900">
                  <h4 className="font-bold text-slate-500 uppercase text-[10px] mb-2">Yetkazish manzili:</h4>
                  <p className="text-slate-700 dark:text-slate-300">{selectedOrderDetails.deliveryAddress.city}, {selectedOrderDetails.deliveryAddress.street} {selectedOrderDetails.deliveryAddress.house}</p>
                  <p className="text-slate-500">Pochta: {selectedOrderDetails.deliveryAddress.postalCode}</p>
                  <p className="text-slate-500">Kutilayotgan vaqt: {selectedOrderDetails.estimatedDelivery}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 uppercase text-[10px] mb-2">Mahsulotlar:</h4>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {selectedOrderDetails.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src={item.book.coverImage} alt={item.book.title} className="w-8 h-12 object-cover rounded" />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{item.book.title}</p>
                          <p className="text-[10px] text-slate-400">{item.book.author}</p>
                        </div>
                      </div>
                      <span className="font-mono font-semibold">
                        {item.quantity} × ${item.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span className="font-bold text-sm text-slate-900 dark:text-white">Jami summa:</span>
                <span className="font-mono font-bold text-base text-amber-600 dark:text-amber-400">
                  ${selectedOrderDetails.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {selectedReceiptOrder && (
        <ReceiptModal
          order={selectedReceiptOrder}
          onClose={() => setSelectedReceiptOrder(null)}
        />
      )}
    </div>
  );
};
