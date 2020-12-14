import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-by-brand',
  templateUrl: './product-by-brand.component.html',
  styleUrls: ['./product-by-brand.component.css']
})
export class ProductByBrandComponent implements OnInit {

  private brandName: string;
  private currentPage:number=0;
  private totalPages:number;
  private pages:Array<number>;
  private size:number=6;
  private products : object;
  private totalItems :number;

  constructor(private route: ActivatedRoute,private _productService: ProductService) { }

  ngOnInit() {

    this.brandName = this.route.snapshot.paramMap.get('brandName');

    this._productService.getProductsByBrandNamePaginated(this.brandName,this.currentPage,this.size).subscribe(data=>{
      this.totalPages = data["totalPages"];
      this.pages = new Array<number>(this.totalPages);
       this.products = data["products"];
       this.totalItems = data["totalItems"];

      });

  }

  private paginate(page:number,size:number){
  
    this._productService.getProductsByBrandNamePaginated(this.brandName,this.currentPage,this.size).subscribe(data=>{
      this.totalPages = data["totalPages"];
      this.pages = new Array<number>(this.totalPages);
       this.products = data["products"];

      });
  }
}
