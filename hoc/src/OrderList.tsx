import { useState, useEffect } from "react";
import { OrderListView } from "./OrderListView";
import { HOST } from "./constants";
import { withData } from "./withData";


// export function OrderList() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     async function fetchOrders() {
//       const response = await fetch(`${HOST}/orders`);
//       const data = await response.json();
//       setOrders(data);
//     }

//     fetchOrders();
//   }, [setOrders]);

//    return <OrderListView orders={orders} />;
// }

export const OrderList = withData(
 OrderListView,
 `${HOST}/orders`,
 'orders'
);