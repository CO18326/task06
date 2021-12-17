import { Component } from '@angular/core';

import { LoginService } from './login.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  //isLoggedIn = false;
  

  constructor(public loginservice:LoginService,private route:Router) { }

  ngOnInit(): void {
    if(! window.sessionStorage.getItem('logged_in_name')){
      //window.location.href=window.location.href.split('/')[0]+"/login";
      this.loginservice.loggedIn=false;
    }
    else{
      this.loginservice.loggedIn=true;
    }
  }

  logout(): void {
    window.sessionStorage.removeItem('logged_in_name');
    this.loginservice.loggedIn=false;
    this.route.navigate(['/login']);
    
  }
}
