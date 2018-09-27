import { SaleProducts } from "./SaleProduct";

export class Sale {
    $key : string;
    keyClient: string; 
    keyEmployee: string; 
    keyLocation: string; 
    date: Date;
    products: SaleProducts;
}