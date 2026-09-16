import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  Box, 
  PackageCheck, 
  Truck, 
  Home, 
  AlertCircle 
} from 'lucide-react';
import { Order, OrderStatus } from '../../types/order';

interface OrderTrackingTimelineProps {
  order: Order;
}

export const OrderTrackingTimeline: React.FC<OrderTrackingTimelineProps> = ({ order }) => {
  const allStages: { status: OrderStatus; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { status: 'Order placed', label: 'Buyurtma berildi', icon: Clock },
    { status: 'Payment confirmed', label: "To'lov tasdiqlandi", icon: CreditCard },
    { status: 'Processing', label: 'Ombordan terilmoqda', icon: Box },
    { status: 'Packed', label: 'Qadoqlandi', icon: PackageCheck },
    { status: 'Shipped', label: "Yo'lga chiqdi", icon: Truck },
    { status: 'Out for delivery', label: 'Kuryer yetkazmoqda', icon: Truck },
    { status: 'Delivered', label: 'Yetkazib berildi', icon: Home }
  ];

  const currentIdx = allStages.findIndex(s => s.status === order.orderStatus);

  return (
    <div className="bg-white dark:bg-[#161a23] p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400">
            Jonli yetkazuv holati
          </span>
          <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white mt-0.5">
            Buyurtma #{order.id}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Kuzatuv kodi: <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">{order.trackingNumber}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
          <div className="text-xs font-semibold text-amber-900 dark:text-amber-200">
            Hozirgi bosqich: <span className="underline">{order.orderStatus}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar (Desktop & Tablet) */}
      <div className="hidden md:block py-8">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-100 dark:bg-slate-800 z-0">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-700"
              style={{
                width: `${Math.min(100, Math.max(0, (currentIdx / (allStages.length - 1)) * 100))}%`
              }}
            />
          </div>

          {allStages.map((stage, i) => {
            const isCompleted = i <= currentIdx;
            const isCurrent = i === currentIdx;
            const Icon = stage.icon;

            return (
              <div key={stage.status} className="relative z-10 flex flex-col items-center group">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${
                    isCurrent
                      ? 'bg-amber-500 text-white ring-4 ring-amber-100 dark:ring-amber-950 scale-110'
                      : isCompleted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-400 border-2 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {isCompleted && !isCurrent ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <span className={`text-[11px] font-semibold mt-2 text-center max-w-[80px] ${
                  isCurrent ? 'text-amber-600 dark:text-amber-400 font-bold' : isCompleted ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'
                }`}>
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vertical Timeline Events History */}
      <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
        <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
          Batafsil bosqichlar tarixi
        </h4>
        <div className="space-y-4">
          {order.timeline.map((event, idx) => {
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  event.completed
                    ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}>
                  {event.completed ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${event.completed ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                      {event.status}
                    </span>
                    {event.date && (
                      <span className="text-xs text-slate-400 font-mono">
                        {event.date} {event.time}
                      </span>
                    )}
                  </div>
                  {event.notes && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {event.notes}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Estimated delivery banner */}
      <div className="mt-8 p-4 rounded-2xl bg-slate-50 dark:bg-[#1f2430] border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-amber-500" />
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Yetkazish usuli: <strong className="text-slate-800 dark:text-slate-200 capitalize">{order.deliveryMethod} delivery</strong></p>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Taxminiy yetkazib berish sanasi: <span className="text-emerald-600 dark:text-emerald-400">{order.estimatedDelivery}</span>
            </p>
          </div>
        </div>
        <div className="text-xs text-slate-500 text-right">
          Manzil: {order.deliveryAddress.city}, {order.deliveryAddress.street}
        </div>
      </div>
    </div>
  );
};
