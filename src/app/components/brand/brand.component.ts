import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../services/brand.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Brand } from './../../models/brand.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  private brands : object;
  private closeResult:any;
  private brand:Brand;
  private modalTitle:string;
  private currentPage:number=0;
  private totalPages:number;
  private pages:Array<number>;
  private size:number=6;
  private action:String;

  private brandForm: FormGroup;
  private submitted = false; 
  
  constructor(private _brandService: BrandService,private modalService: NgbModal,    private formBuilder: FormBuilder ) { }

  ngOnInit() {

    this.brandForm = this.formBuilder.group({
      id:'',   
      name: ['', Validators.required]  
  });

    this._brandService.getBrands().subscribe(data=>{
      this.totalPages = data["totalPages"];
      this.pages = new Array<number>(this.totalPages);
      this.brands = data["brands"];
     });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.action = "addAction"
    this.brand = new Brand();
    
    this.modalTitle = "Ajouter une Marque";

  }

  openWithEntity(content,brand:Brand) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.action = "editAction"
    console.log(this.brand);
    this.brandForm.patchValue(brand);
     this.modalTitle = "Editer une Marque";
  }
  

    
  openConfirm(content,brand:Brand) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.action = "deleteAction"
    this.brand = brand;
      this.modalTitle = "Supprimer une Marque";
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  

  private get f() { return this.brandForm.controls; }


  onSubmit() {
    this.submitted = true;
  
  
   
  
    if ( this.action === "addAction" ){
       // stop here if form is invalid
    if (this.brandForm.invalid) {
      console.log("error form validation");
        return;
    }
  
    // display form values on success
    this._brandService.addBrand(this.brandForm.value).subscribe( 
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
   if (this.brandForm.invalid) {
     console.log("error form validation");
       return;
   }
  
   // display form values on success
   this._brandService.editBrand(this.brandForm.value).subscribe( 
     (data) =>{ 
       console.log(data);
  
       this.ngOnInit();
       this.modalService.dismissAll();
  
  
     }),
     err => {
       console.log("Error");
     }   
    
  }else{
    this._brandService.deleteBrand(this.brand).subscribe( 
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
    this.brandForm.reset();
  }

  private paginate(page:number,size:number){
  
    this._brandService.getBrandsPaginated(this.currentPage,this.size).subscribe(data=>{
      this.totalPages = data["totalPages"];
      this.pages = new Array<number>(this.totalPages);
       this.brands = data["brands"];

      });
  }

  }
  