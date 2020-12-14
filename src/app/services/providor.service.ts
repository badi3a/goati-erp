import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Providor } from './../models/providor.model';

@Injectable({
  providedIn: 'root'
})
export class ProvidorService {

  constructor( private http: HttpClient ) { }

  private providorUrl = "http://127.0.0.1:8080/providors";
  
  getProvidors(){

    return this.http.get(this.providorUrl);
  }

  getProvidorsPaginated(page:number,size:number){
     
    return  this.http.get(this.providorUrl+"?page="+page+"&size="+size);

  }

  addProvidor(data:Providor){
     
    return  this.http.post(this.providorUrl,data);

  }


  editProvidor(data:Providor){
     
    return  this.http.put(this.providorUrl,data);

  }

  deleteProvidor(data:Providor){
     
    return  this.http.delete(this.providorUrl+"/"+data.id);

  }
}
