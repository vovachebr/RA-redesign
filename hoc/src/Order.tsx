import { useState, useEffect } from "react";
import { OrderView } from "./OrderView";
import { Order as OrderType } from "./interfaces";
import { HOST } from "./constants";
import { withData } from "./withData";
import type { OrderListViewProps } from "./OrderListView";

interface OrderProps {
  id: number;
}

// export function Order({id}: OrderProps) {
//   const [order, setOrder] = useState<OrderType>();

//   useEffect(() => {
//     async function fetchOrder() {
//       const response = await fetch(`${HOST}/orders/${id}`);
//       const data = await response.json();
//       setOrder(data);
//     }

//     fetchOrder();
//   }, [setOrder]);

//   return <OrderView info={order} />;
// }

export const Order = withData(
 OrderView,
 (id) => `${HOST}/orders/${id}`,
 'info'
);