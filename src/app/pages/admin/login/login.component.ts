import { NoopAnimationPlayer } from '@angular/animations';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

loginObj :any = {
  username:'',
  password:''
}

RegisterObj :any = {
  username:'',
  email:'',
  password:'',
}

constructor(private router:Router,private loginServ:LoginService,private toastr:ToastrService){}
onLogin(){
  if(this.loginObj.username == 'admin' && this.loginObj.password == 'admin'){
    this.router.navigateByUrl('/products')
  }else{

    alert("wrrong Credentials")
  }
}

onTrueLogin(){
this.loginServ.login(this.loginObj).subscribe((res:any)=>{
  sessionStorage.setItem('ecommerce_user', JSON.stringify(res));
  sessionStorage.setItem('token', JSON.stringify(res.token));
  this.toastr.success('LOGIN SUCCESSFUL', 'SUCCESS');
  debugger
  this.router.navigateByUrl('/shop')
});
}
onRegister(){
  this.loginServ.registerCustomer(this.RegisterObj).subscribe((res:any)=>{
    this.router.navigateByUrl('/shop')
  });
  }
  
}

export class loginObject {
  username: string;
  password: string;

  constructor() {
    this.username = '';
    this.password = '';
  }

}


export class registerObject {
  username: string;
  email: string;
  password: string;

  constructor() {
    this.username = '';
    this.email = '';
    this.password = '';
  }
}

