import type { Order } from "./interfaces";
import { OrderView } from "./OrderView";

export interface OrderListViewProps {
  orders: Order[];
}

export function OrderListView({ orders = [] }: OrderListViewProps) {
  return orders.map(order => (<OrderView key={order.id} info={order} />));
}