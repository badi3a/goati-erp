import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from './../models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http: HttpClient ) { }


  private  categorytUrl = 'http://127.0.0.1:8080/categories'; 

  getCategories(){
     
    return  this.http.get(this.categorytUrl+"/all");

  }

  getCategoriesPaginated(page:number,size:number){
     
    return  this.http.get(this.categorytUrl+"?page="+page+"&size="+size);

  }

  addCategory(data:Category) {
    return  this.http.post<Category>(this.categorytUrl, data);

  }

  editCategory(data:Category) {
    return  this.http.put(this.categorytUrl,data);

  }

  deleteCategory(data:Category) {
    return  this.http.delete(this.categorytUrl+"/"+data.id);

  }

}
