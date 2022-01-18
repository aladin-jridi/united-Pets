import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage}from '@angular/fire/compat/storage'

@Component({
  selector: 'app-store-manger',
  templateUrl: './store-manger.component.html',
  styleUrls: ['./store-manger.component.css']
})
export class StoreMangerComponent implements OnInit {
 
  itemName ='';
  itemImage = '';
  itemPrice = '';
  itemDescription='';
  itemCategory='';
  itemQuantity = '';
  pathLogoStore: String = '';
  patheImageItem : String = ''
  

  constructor(
    private router : Router,
     private http : HttpClient,
     private af: AngularFireStorage
  ) { 
    this.state = this.router.getCurrentNavigation()?.extras.state
    console.log(this.state);
  }
  state: any = {}

  ngOnInit(): void {
    // this.getItems()
    this.state= JSON.parse(localStorage.getItem('session')||'');
  }

  //add item
onChangeName(event:any){
  this.itemName = event.target.value;
}
onChangeImage(event:any){
  this.itemImage = event.target.file;
}
onChangePrice(event:any){
  this.itemPrice = event.target.value;
}
onChangeDescription(event:any){
  this.itemDescription = event.target.value;
}
onChangeCategory(event:any){
  this.itemCategory = event.target.value;
}
onChangeQuantity(event:any){
  this.itemQuantity = event.target.value;
}

// send post request for adding Item to the db store 
postAddItem(){
  let y = localStorage.getItem('store') as string
  let item = {
    itemName :this.itemName,
    itemImage :this.itemImage,
    itemPrice :this.itemPrice,
    itemDescription: this.itemDescription,
    itemCategory: this.itemCategory,
    itemQuantity: this.itemQuantity,
    Store_idStore: JSON.parse(y)[0].idStore,
  }
  this.http.post('http://localhost:3000/add-items-to-store',item )
  .subscribe({next:((Response:any)=>{
       console.log(Response)
  }),
  error:error=>{
    console.error(error)
  }})
   }
   //get Items
   getItems(){
    let y = localStorage.getItem('store') as string
   
      let Store_idStore = JSON.parse(y)[0].idStore
   
    this.http.get(`http://localhost:3000/storeItem`, Store_idStore)
  .subscribe({next:((Response:any)=>{
       console.log(Response)
  }),
  error:error=>{
    console.error(error)
  }})
  }
 //////
 upload(event: any) {
  this.pathLogoStore = event.target.files[0];
  console.log(this.pathLogoStore)
}
uploadImage2() {
  console.log('patheImageItem ===>',this.patheImageItem);
  
  this.af
    .upload('path' + Math.random() + this.patheImageItem, this.patheImageItem)
    .then((response : any) => {
      console.log('response1 :', response);
      response.ref.getDownloadURL().then((res : any) => {
        console.log(res);
        this.patheImageItem = res;
        this.itemImage=res
        console.log('hhhhh',this.itemImage)
      });
    });
}
image2(event: any){
  console.log('ImageItem ===>',event.target.value);
  this.itemImage = event.target.value;
}

}
