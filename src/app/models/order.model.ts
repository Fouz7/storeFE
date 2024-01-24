export interface Order {
    order_id: number;
    order_code: string;
    order_date: Date;
    customer_code: string;
    item_code: string;
    quantity: number;
    total_price: number;
}