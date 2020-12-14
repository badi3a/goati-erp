import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ProvidorService} from '../../services/providor.service'
import { Providor } from './../../models/providor.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-providor',
  templateUrl: './providor.component.html',
  styleUrls: ['./providor.component.css']
})
export class ProvidorComponent implements OnInit {

  constructor(
    private _providorService: ProvidorService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder
    ) { }

  private providors : object;

  private closeResult: string;


  private providorForm: FormGroup;
  private submitted = false; 



  private currentPage:number=0;
  private totalPages:number;
  private pages:Array<number>;
  private size:number=6;



  private providor : Providor;
  private modalTitle:String;
  private   action:String;

  ngOnInit() {


    this.providorForm = this.formBuilder.group({
      id:'',   
      firstName: ['', Validators.required],  
      lastName: ['', Validators.required],  
      email: ['',  Validators.email],
      address: ['', Validators.required],
      phone: ['', [Validators.required,Validators.pattern("[-\s\./0-9]{8}$")]]
 
  });

    this._providorService.getProvidorsPaginated(this.currentPage,this.size).subscribe(data=>{
 
      this.providors = data["providors"];
      this.totalPages = data["totalPages"];
      this.currentPage = data["currentPage"];
      this.pages = new Array<number>(this.totalPages);
      console.log(this.providors);

    });
  }


  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.action = "addAction"
    this.providor = new Providor();
    this.modalTitle = "Ajouter un fournisseur";
  
  
  
  }
  
  openWithEntity(content,providor:Providor) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.action = "editAction"
    this.providorForm.patchValue(providor) ;
    this.modalTitle = "Editer un fournisseur";
  }
  
  openConfirm(content,providor:Providor) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
     }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.action = "deleteAction"
    this.providor = providor ;
     this.modalTitle = "Supprimer un fournisseur";
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

  
private paginate(page:number,size:number){
  
  this._providorService.getProvidorsPaginated(page,size).subscribe(data=>{
    this.totalPages = data["totalPages"];
    this.currentPage = data["currentPage"];
    this.pages = new Array<number>(this.totalPages);
    this.providors = data["categories"];

   });
}

private get f() { return this.providorForm.controls; }



onSubmit() {
  this.submitted = true;


 

  if ( this.action === "addAction" ){
     // stop here if form is invalid
  if (this.providorForm.invalid) {
    console.log("error form validation");
      return;
  }

  // display form values on success
  this._providorService.addProvidor(this.providorForm.value).subscribe( 
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
 if (this.providorForm.invalid) {
   console.log("error form validation");
     return;
 }

 // display form values on success
 this._providorService.editProvidor(this.providorForm.value).subscribe( 
   (data) =>{ 
     console.log(data);

     this.ngOnInit();
     this.modalService.dismissAll();


   }),
   err => {
     console.log("Error");
   }   
  
}else{
  this._providorService.deleteProvidor(this.providor).subscribe( 
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
  this.providorForm.reset();
}

}
