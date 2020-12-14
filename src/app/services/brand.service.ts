import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Brand } from './../models/brand.module';


@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor( private http: HttpClient ) { }

  private  brandtUrl = 'http://127.0.0.1:8080/brands'; 

  getBrands(){
     
    return  this.http.get(this.brandtUrl);

  }

  getBrandsPaginated(page:number,size:number){
     
    return  this.http.get(this.brandtUrl+"?page="+page+"&size="+size);

  }

  addBrand(data:Brand) {
    return  this.http.post<Brand>(this.brandtUrl, data);

  }

  editBrand(data:Brand) {
    return  this.http.put(this.brandtUrl,data);

  }

  deleteBrand(data:Brand) {
    return  this.http.delete(this.brandtUrl+"/"+data.id);

  }


  

}
