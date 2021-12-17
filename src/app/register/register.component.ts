import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, password } = this.form;
    alert("registeration done !");
    window.location.href=window.location.href.split('//')[0]+'//'+window.location.href.split('//')[1].split('/')[0]+'/'+window.location.href.split('//')[1].split('/')[1]+"/login";
  }
}
