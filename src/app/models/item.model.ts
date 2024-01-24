export interface Item {
    item_id: number;
    item_code: string;
    item_name: string;
    last_re_stock: Date;
    is_available: boolean;
    stock: number;
    price: number;
  }