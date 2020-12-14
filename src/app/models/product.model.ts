import { Providor } from './providor.model';
import { Brand } from './brand.module';
import { Category } from './category.model';

export class Product{

public id:number;
public ref:string;
public label:string;
public description:Text;
public brand:Brand;
public providor:Providor;
public category:Category;
public price:number;
public margin:number;
public quantity:number;

constructor( ) {
    this.brand = new Brand();
    this.providor = new Providor();
  }

}