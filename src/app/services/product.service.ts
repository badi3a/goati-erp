import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor( private http: HttpClient ) { }
  private  productUrl = 'http://127.0.0.1:8080/products'; 


  getProducts(){
     
    return  this.http.get(this.productUrl);

  }



  getProductsByCategoryNamePaginated(categoryName:string,page:number,size:number){
     
    return  this.http.get(this.productUrl+"/category/"+categoryName+"?page="+page+"&size="+size);

  }


  getProductsByBrandNamePaginated(brandName:string,page:number,size:number){
     
    return  this.http.get(this.productUrl+"/brand/"+brandName+"?page="+page+"&size="+size);

  }


  getProductsPaginated(page:number,size:number){
     
    return  this.http.get(this.productUrl+"?page="+page+"&size="+size);

  }


 

  addProduct(data){
return this.http.post(this.productUrl,data);
  }

  
  editProduct(data) {
    return  this.http.put(this.productUrl,data);

  }


  deleteProduct(data){
    return this.http.delete(this.productUrl+"/"+data.id);
  }

}
