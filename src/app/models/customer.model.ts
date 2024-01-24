export interface Customer {
    customer_id: number;
    customer_code: string;
    customer_name: string;
    customer_address: string;
    customer_phone: string;
    is_active: boolean;
    last_order_date: Date;
    pic: string;
  }