// Form , body , param
export type CreateOrderForm = {
  pricePerUnit: number;
  customerName: string;
  orderItems: number[];
  employer?: number;
  employee?: number;
};
