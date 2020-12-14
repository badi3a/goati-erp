import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RfqItem } from 'src/app/models/rfq-item.model';
 
 
@Component({
  selector: 'app-add-rfq',
  templateUrl: './add-rfq.component.html',
  styleUrls: ['./add-rfq.component.css']
})
export class AddRFQComponent implements OnInit {

   private rfqItems: RfqItem[]= [];
   private total:number = 0;


   addItem(refqItem: RfqItem) {
    this.rfqItems.push(refqItem);
    this.total+=refqItem.totalPrice;
  }
  
  
  constructor( ) { }

  ngOnInit() { 
  }
 
}
