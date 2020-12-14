import { Component, OnInit } from '@angular/core';
import {Input } from '@angular/core';  
import { RfqItem } from './../../../../models/rfq-item.model';

@Component({
  selector: 'app-rfq-content',
  templateUrl: './rfq-content.component.html',
  styleUrls: ['./rfq-content.component.css']
})
export class RfqContentComponent implements OnInit {
  @Input() Items: RfqItem[]; 
  constructor() { }

  ngOnInit() {
  }

}
