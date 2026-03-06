export interface Customer {
  customer_ref: number;
  first_name: string;
  last_name: string;
  other_name?: string;
  branch?: number;
  registerd_date: string;
  active: boolean;
}

export interface Transaction {
  transaction_id: number;
  transaction_date: string;
  transaction_type: 'Deposit' | 'Withdrawal';
  amount: number;
  customer_ref: number;
  user_name: string;
  branch_id?: number;
  confirm: boolean;
  transfer: boolean;
  paid_by?: number;
  
  // Properties joined from customer table
  first_name?: string;
  last_name?: string;
}
