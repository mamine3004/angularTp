import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { constant } from '../constant/constant';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  constructor(private http:HttpClient, private toastr: ToastrService ) { }

  login(obj: any) {
    return this.http.post(constant.END_POINT_URL + constant.METHODS.LOGIN, obj);
  }

  onLogOut(loggedInObj: any) {
        loggedInObj = {};
        sessionStorage.removeItem('bigBasket_user');
        sessionStorage.removeItem('token');
        this.toastr.success('You have been logged out', 'Thank you');
  }

  registerCustomer(obj: any) {
    return this.http.post(constant.END_POINT_URL + constant.METHODS.REGISTER, obj);
  }
}
