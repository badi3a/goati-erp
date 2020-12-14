import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { ProvidorService } from '../../services/providor.service';
import { BrandService } from '../../services/brand.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from './../../models/product.model';
declare var $: any;
import { Select2OptionData } from 'ng-select2';
import { Select2Options  } from 'select2';
import { Category } from './../../models/category.model';

 
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

 private products : object;
 private categories : any;
 private providors : object;
 private brands : object;
 private closeResult: string;
 
 private productForm: FormGroup;
 private submitted = false; 
 
 private product: Product;
 private modalTitle:string;
 private currentPage:number=0;
 private totalPages:number;
 private pages:Array<number>;
 private size:number=6;
 private action:String;
  public exampleData: Array<Select2OptionData>;
  public options: Select2Options;


  constructor(private _productService: ProductService,
    private modalService: NgbModal, 
    private _categoryService: CategoryService, 
    private _providorService: ProvidorService,
    private _brandsService: BrandService,
    private formBuilder: FormBuilder
    ) { }
 


  
  ngOnInit() {
 
    
    this.productForm = this.formBuilder.group({
      id:'',   
      ref: ['', Validators.required],  
      label: ['', Validators.required],  
      description: ['', [Validators.required, Validators.minLength(5)]],
      brand: ['', Validators.required],
      providor: ['', Validators.required],
      categories: ['', Validators.required],
      price: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
      margin:  ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
      quantity:  ['', [Validators.required,Validators.pattern("^[0-9]*$")]] 
 
  });
     this._productService.getProductsPaginated(this.currentPage,this.size).subscribe(data=>{
      this.totalPages = data["totalPages"];
      this.pages = new Array<number>(this.totalPages);
       this.products = data["products"];

      });


        
     this._categoryService.getCategories().subscribe(data=>{
      this.categories = data;
     });
    
     

      this._providorService.getProvidors().subscribe(data=>{
       this.providors = data["providors"];

     });
    
   
      this._brandsService.getBrands().subscribe(data=>{
        this.brands = data["brands"];
        console.log(this.brands);

      });
     
   
      this.exampleData = [
      {
        id: 'basic1',
        text: 'Basic 1'
      },
      {
        id: 'basic2',
         text: 'Basic 2'
      },
      {
        id: 'basic3',
        text: 'Basic 3'
      },
      {
        id: 'basic4',
        text: 'Basic 4'
      }
    ];


    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: false
    }
    
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.modalTitle = "Ajouter un produit";
    this.action = "addAction"
    this.product = new Product();
 
 
  }

  openWithEntity(content,p:Product) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.action = "editAction"
    this.productForm.patchValue(p) ;
    console.log(this.productForm.value);
    console.log(p);
    this.modalTitle = "Editer un produit";
    console.log(this.modalTitle);

  }
  
  openConfirm(content,p:Product) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.action = "deleteAction"
    this.product=p ;
     this.modalTitle = "Supprimer un produit";
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }

    this.onReset();
  }
 
  private get f() { return this.productForm.controls; }


  onSubmit() {
    this.submitted = true;
    console.log(this.productForm.value);

    if ( this.action === "addAction" ){
    // stop here if form is invalid
    if (this.productForm.invalid) {
      console.log("error form validation");
        return;
    }
  
    console.log(this.productForm.value);
    // display form values on success
    this._productService.addProduct(this.productForm.value).subscribe( 
      (data) =>{ 
        console.log(data);
  
        this.ngOnInit();
        this.modalService.dismissAll();
  
  
      }),
      err => {
        console.log("Error");
      }  
     }
     else if(this.action === "editAction"){
   
      // stop here if form is invalid
   if (this.productForm.invalid) {
     console.log("error form validation");
       return;
   }
  
   // display form values on success
   this._productService.editProduct(this.productForm.value).subscribe( 
     (data) =>{ 
       console.log(data);
  
       this.ngOnInit();
       this.modalService.dismissAll();
  
  
     }),
     err => {
       console.log("Error");
     }   

}else{
  this._productService.deleteProduct(this.product).subscribe( 
    (data) =>{ 
      console.log(data);

      this.ngOnInit();
      this.modalService.dismissAll();


    }),
    err => {
      console.log("Error");
    }   

}
   
  this.onReset();
  }

  
  
  onReset() {
    this.submitted = false;
    this.productForm.reset();
  }

   getCurrentModel() { 
    return JSON.stringify(this.product); 
  }

  toArray(categories: object) {
    return Object.keys(categories).map(key => categories[key])
  }

  private paginate(page:number,size:number){
  
    this._productService.getProductsPaginated(this.currentPage,this.size).subscribe(data=>{
      this.totalPages = data["totalPages"];
      this.pages = new Array<number>(this.totalPages);
       this.products = data["products"];

      });
  }
}
 