import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.css']
})
export class ProductByCategoryComponent implements OnInit {
  private categoryName: string;
  private currentPage:number=0;
  private totalPages:number;
  private pages:Array<number>;
  private size:number=6;
  private products : object;
  private totalItems :number;
  constructor(private route: ActivatedRoute,private _productService: ProductService) { }

  ngOnInit() {
    this.categoryName = this.route.snapshot.paramMap.get('categoryName');

    this._productService.getProductsByCategoryNamePaginated(this.categoryName,this.currentPage,this.size).subscribe(data=>{
      this.totalPages = data["totalPages"];
      this.pages = new Array<number>(this.totalPages);
       this.products = data["products"];
       this.totalItems = data["totalItems"];

      });

  }

  private paginate(page:number,size:number){
  
    this._productService.getProductsByCategoryNamePaginated(this.categoryName,this.currentPage,this.size).subscribe(data=>{
      this.totalPages = data["totalPages"];
      this.pages = new Array<number>(this.totalPages);
       this.products = data["products"];

      });
  }
}
