export interface Order {
  id: number;
  customerName: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: string;
  driverName: string;
  price: number;
}