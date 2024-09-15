import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public cartUpdated$: Subject<boolean> = new Subject();

  constructor(private http:HttpClient ) { }

  getCategories(){
    return this.http.get(constant.END_POINT_URL+constant.METHODS.category)
  }
  getProducts(){
    return this.http.get(constant.END_POINT_URL+constant.METHODS.product)
  }
  getProductsByCatgoryId(CategoryId:number){
    return this.http.get(constant.END_POINT_URL+constant.METHODS.product+"?CategoryId="+CategoryId)
  }

  createProduct(obj:any,categoryId:number){
    return this.http.post(constant.END_POINT_URL+constant.METHODS.product+"/"+categoryId,obj)
  }

  updateProduct(obj:any,productId:number){
    return this.http.put(constant.END_POINT_URL+constant.METHODS.product+"/"+productId,obj)
  }
  deleteProduct(productId:number){
    return this.http.delete(constant.END_POINT_URL+constant.METHODS.product+"/"+productId)
  }

  getCartsByUserName(UserName:string){
    return this.http.get(constant.END_POINT_URL+constant.METHODS.cart+"?username="+UserName)
  }

  addToCart(obj:any,ProductId:number,userId:string){
    return this.http.post(constant.END_POINT_URL+constant.METHODS.cart+"/"+ProductId+"/"+userId,obj)
  }

  updateCart(obj:any,cartId:number){
    return this.http.put(constant.END_POINT_URL+constant.METHODS.cart+"/"+cartId,obj)
  }
  deleteCartId(cartId:number){
    return this.http.delete(constant.END_POINT_URL+constant.METHODS.cart+"/"+cartId)
  }


}
