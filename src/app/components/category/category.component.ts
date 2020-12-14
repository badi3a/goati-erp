import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import {NgbModal, ModalDismissReasons,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/models/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  private categories : object;
  private closeResult:any;
  private modalReference: NgbModalRef;

  private categoryForm: FormGroup;
  private submitted = false; 

  private currentPage:number=0;
  private totalPages:number;
  private pages:Array<number>;
  private size:number=6;


  private action:String;
  private category:Category;
  private modalTitle:String;

  
  

  constructor(
    private _categoryService: CategoryService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
    ) { }


  ngOnInit() {

    this.categoryForm = this.formBuilder.group({
      id:'',   
      name: ['', Validators.required],  
      description: ['', [Validators.required, Validators.minLength(5)]],
      productsCount:0,
 
  });

    this._categoryService.getCategoriesPaginated(this.currentPage,this.size).subscribe(data=>{
      this.totalPages = data["totalPages"];
      this.currentPage = data["currentPage"];
      this.pages = new Array<number>(this.totalPages);
      this.categories = data["categories"];

     });
 }

 open(content) {
  this.modalReference = this.modalService.open(content);

  this.modalReference.result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
  this.action = "addAction"
  this.category = new Category();
  this.modalTitle = "Ajouter une categorie";



}

openWithEntity(content,category:Category) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
  this.action = "editAction"
  this.categoryForm.setValue(category); 
  console.log(category);
  this.modalTitle = "Editer une categorie ";
}

openConfirm(content,category:Category) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
   }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
  this.action = "deleteAction"
  this.category = category;  
   this.modalTitle = "Supprimer une categorie";
}



private getDismissReason(reason: any): string {
  this.onReset();

  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}


private paginate(page:number,size:number){
  
  this._categoryService.getCategoriesPaginated(page,size).subscribe(data=>{
    this.totalPages = data["totalPages"];
    this.currentPage = data["currentPage"];
    this.pages = new Array<number>(this.totalPages);
    this.categories = data["categories"];

   });
}

private get f() { return this.categoryForm.controls; }



onSubmit() {
  this.submitted = true;


 

  if ( this.action === "addAction" ){
     // stop here if form is invalid
  if (this.categoryForm.invalid) {
    console.log("error form validation");
      return;
  }

  // display form values on success
  this._categoryService.addCategory(this.categoryForm.value).subscribe( 
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
 if (this.categoryForm.invalid) {
   console.log("error form validation");
     return;
 }

 // display form values on success
 this._categoryService.editCategory(this.categoryForm.value).subscribe( 
   (data) =>{ 
     console.log(data);

     this.ngOnInit();
     this.modalService.dismissAll();


   }),
   err => {
     console.log("Error");
   }   
  
}else{
  this._categoryService.deleteCategory(this.category).subscribe( 
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
  this.categoryForm.reset();
}

}
