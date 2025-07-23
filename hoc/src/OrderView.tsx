import type { Order } from "./interfaces";

interface OrderViewProps {
  info: Order;
}

export function OrderView({ info }: OrderViewProps) {
  if(!info) {
    return null;
  }

  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 8, borderRadius: 4 }}>
      <h3>Заказ #{info.id}</h3>
      <p><strong>Клиент:</strong> {info.customerName}</p>
      <p><strong>Откуда:</strong> {info.pickupLocation}</p>
      <p><strong>Куда:</strong> {info.dropoffLocation}</p>
      <p><strong>Водитель:</strong> {info.driverName}</p>
      <p><strong>Статус:</strong> {info.status}</p>
      <p><strong>Цена:</strong> {info.price} ₽</p>
    </div>
  );
}