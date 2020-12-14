import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RfqItem } from 'src/app/models/rfq-item.model';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-rfq-input',
  templateUrl: './rfq-input.component.html',
  styleUrls: ['./rfq-input.component.css']
})
export class RfqInputComponent implements OnInit {

  private products : object;
  private selectedProduct = new Product();
  private quantity:number;
  private unitPrice:number ;
  private totalPrice:number ;
   @Output() newItemEvent = new EventEmitter<RfqItem>();


  submitNewItem( ) {
     var refqItem = new RfqItem(this.selectedProduct,this.quantity);
   this.newItemEvent.emit(refqItem);
   console.log("from input components : " + refqItem );
  }
  
  
  constructor(private _productService: ProductService) { }

  ngOnInit() {

    this._productService.getProducts().subscribe(data=>{
        this.products = data["products"];

      });


  }

  selected(){
    this.unitPrice = this.selectedProduct.price;
    this.quantity=1;
    this.totalPrice = this.unitPrice * this.quantity;
  }
calc(){
  this.totalPrice = this.unitPrice * this.quantity;
   
}


}
