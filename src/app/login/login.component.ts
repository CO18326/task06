import { Component, OnInit } from '@angular/core';

import { LoginService } from '../login.service';

import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private loginservice:LoginService,private route:Router ) { }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    const { username, password } = this.form;
    if (username=="test" && password=="123456"){
      this.isLoginFailed=false;
      this.isLoggedIn=true;
      this.roles=["test-user"];
      this.route.navigate(['/home']);
      window.sessionStorage.setItem('logged_in_name', 'test');
      this.loginservice.loggedIn=true;
    }

    else{
        this.errorMessage="Error in Login"
        this.isLoginFailed = true;
    }
    
  }

  reloadPage(): void {
    window.location.reload();
  }
}
