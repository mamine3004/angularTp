import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent {
  activeCategoryId: number = 0;
  products:any []=[];
  loggedInObj: any = {};


  constructor(private activatedRoute: ActivatedRoute, private prodSrv: ProductService) {
    this.activatedRoute.params.subscribe((res: any) => {
      this.activeCategoryId = res.id;
      this.loadProducts();
      const localData = sessionStorage.getItem('ecommerce_user');
      if (localData !== null) {
        this.loggedInObj = JSON.parse(localData);
      }
    });
  }
    loadProducts(){
      this.prodSrv.getProductsByCatgoryId(this.activeCategoryId).subscribe((res: any) => {
        this.products = res;
      });
    }
    addtoCart(productId:number){
      // debugger
      this.prodSrv.addToCart({qty:1},productId,this.loggedInObj.userName).subscribe((res)=>{
      });
    }
   
}
