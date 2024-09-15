import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../services/login/login.service';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit{

  categoriesList:any []=[];
  cartListTotal:number = 0.0;
  cartList:any []=[];
  loggedInObj: any = {};
  constructor(private productSev:ProductService,private router:Router, public loginSrv: LoginService, private http: HttpClient, private toastr: ToastrService){
    const localData = sessionStorage.getItem('ecommerce_user');
    if (localData !== null) {
      this.loggedInObj = JSON.parse(localData);
      this.getCartByCustomerId(this.loggedInObj.custId);
    }
    this.productSev.cartUpdated$.subscribe((res: any) => {
      if (res) {
        this.getCartByCustomerId(this.loggedInObj.username);
      }
    });
    


  }
  ngOnInit(): void {
    this.getAllCategory();
  }
  getAllCategory(){
    this.productSev.getCategories().subscribe((res:any)=>{
      // debugger
      this.categoriesList = res;
      this.calculateTotalSubtotal
    })
  }
 getAllProductsByID(categoryId:number){
  this.router.navigate(['product/',categoryId]);
}


getAllCart(){
  this.router.navigate(['cart']);
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
