import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
isSidePanelVisisble:boolean =false;
productObj:any = {
  "name": "",
  "description": "",
  "imageProduct": "",
  "price": 1,
  "qty": 1
};
isupdate:boolean = false;
categoryId:number = 0;
productId:number = 0;
categoryList:any [] =[]; 
productsList:any [] =[]; 
constructor(private productServ:ProductService){

}
ngOnInit(): void {
  this.getAllCategory();
  this.getAllProduct();
}
getAllCategory(){
  this.productServ.getCategories().subscribe((res:any)=>{
    this.categoryList = res
  })
}
getAllProduct(){
  this.productServ.getProducts().subscribe((res:any)=>{
    this.productsList = res
  })
}

onSave(){
  debugger
  if(this.categoryId==0)
    alert("you have to select a category for product")
  else
    this.productServ.createProduct(this.productObj,this.categoryId).subscribe((res:any)=>{
      debugger
      if(res){
        alert("Product Created")
        this.getAllProduct()
      }else{
        alert("No.......!")
      }
    })
}
onDelete(productId:number){
  debugger
  const isDelete = confirm("Are you sure You want to delete this product ?")
  if(isDelete)
    this.productServ.deleteProduct(productId).subscribe((res:any)=>{
      debugger
      if(res){
        alert("Product deleted")
        this.productObj.name=res.name;
        this.productObj.description=res.description;
        this.productObj.imageProduct=res.imageProduct;
        this.productObj.price=res.price;
        this.productObj.qty=res.qty;
        this.categoryId = res.categoryId;    
        this.openSidePanel()  
        this.getAllProduct()
      }else{
        alert("No.......!")
      }
    })
}
onUpdate(){
  debugger
  if(this.categoryId==0)
    alert("you have to select a category for product")
  else
    this.productServ.updateProduct(this.productObj,this.productId).subscribe((res:any)=>{
      debugger
      if(res){
        alert("Product Updated")
        this.getAllProduct()

      }else{
        alert("No.......!")
      }
    })
}
openSidePanel(){
  this.isSidePanelVisisble= true;
  this.isupdate = false;  
}
closeSidePanel(){
  this.isSidePanelVisisble= !this.isSidePanelVisisble;
  this.isupdate = false;
}
onupdateProduct(prod:any){
  this.isSidePanelVisisble= true;
  this.isupdate = true;
  this.productObj.name=prod.name;
  this.productObj.description=prod.description;
  this.productObj.imageProduct=prod.imageProduct;
  this.productObj.price=prod.price;
  this.productObj.qty=prod.qty;
  this.categoryId = prod.categoryId;
  this.productId = prod.id;
}

}
