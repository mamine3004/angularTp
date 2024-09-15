import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../services/login/login.service';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-customer-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-cart.component.html',
  styleUrl: './customer-cart.component.css'
})
export class CustomerCartComponent implements OnInit{

  cartListTotal:number = 0.0;
  cartList:any []=[];
  loggedInObj: any = {};
  constructor(private productSev:ProductService,private router:Router, public loginSrv: LoginService, private http: HttpClient, private toastr: ToastrService){
    const localData = sessionStorage.getItem('ecommerce_user');
    if (localData !== null) {
      this.loggedInObj = JSON.parse(localData);
      this.getCartByCustomerId(this.loggedInObj.username);
    }
    this.productSev.cartUpdated$.subscribe((res: any) => {
      if (res) {
        this.getCartByCustomerId(this.loggedInObj.username);
      }
      debugger
    });
    


  }
  ngOnInit(): void {
    const localData = sessionStorage.getItem('ecommerce_user');
    if (localData !== null) {
      this.loggedInObj = JSON.parse(localData);
      this.getCartByCustomerId(this.loggedInObj.username);
    }
  }
 
async remove(cartId: number) {
  await this.productSev.deleteCartId(cartId).subscribe((res: any) => {
  //  debugger
//    this.productSev.cartUpdated$.next(true);
//    this.toastr.error(res.message);
  });
  //debugger
  this.getCartByCustomerId(this.loggedInObj.username);
}

getCartByCustomerId(username: string) {
  this.productSev.getCartsByUserName(username).subscribe((res: any) => {
    if (res) {
      // debugger
      this.cartList = res;
      this.cartListTotal = this.calculateTotalSubtotal();
    }
  });
}



calculateTotalSubtotal() {
  let totalSubtotal = 0;
  for (const item of this.cartList) {
    totalSubtotal += (item.product.price * item.qty);
  }
  return totalSubtotal;
}


}
