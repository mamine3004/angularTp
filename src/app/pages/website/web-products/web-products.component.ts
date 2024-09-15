import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'web-app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-products.component.html',
  styleUrl: './web-products.component.css'
})
export class WebProductsComponent implements OnInit{

  productsListCat:any []=[];
  productsList:any []=[];
  categoriesList:any []=[];
  loggedInObj: any = {};

  constructor(private productSev:ProductService){
    const localData = sessionStorage.getItem('ecommerce_user');
    if (localData !== null) {
      this.loggedInObj = JSON.parse(localData);
    }
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCategory();
  }

  getAllProduct(){
    this.productSev.getProducts().subscribe((res:any)=>{
      // debugger
      this.productsList = res;
      this.productsListCat = res;
    })
  }
  getAllCategory(){
    this.productSev.getCategories().subscribe((res:any)=>{
      // debugger
      this.categoriesList = res;
    })
  }
  getProductsByCatgoryId(categoryId:number){
    this.productSev.getProductsByCatgoryId(categoryId).subscribe((res:any)=>{
      // debugger
      this.productsListCat = res;
    })
 }
 addtoCart(productId:number){
   this.productSev.addToCart({'qty':1},productId,this.loggedInObj.username).subscribe((res)=>{
// debugger
   });
 }
}
