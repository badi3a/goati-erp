import { Product } from './product.model';

export class RfqItem {

    public product:Product;
    public quantity:number;
    public unitPrice:number;
    public totalPrice:number;

    constructor(product:Product,quantity:number){

        this.product=product;
        this.quantity=quantity;
        this.unitPrice = product.price;
        this.totalPrice=quantity*product.price;
    }

    
}
