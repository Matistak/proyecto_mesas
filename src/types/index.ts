export interface Product {
  id: string;
  name: string;
  quantity: number;
}

export interface Client {
  id: string;
  name: string;
  products: Product[];
}

export interface Table {
  id: string;
  number: number;
  clients: Client[];
}
