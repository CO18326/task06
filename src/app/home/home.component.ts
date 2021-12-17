import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooklistService } from  '../booklist.service';
import { LoginService } from '../login.service';
import {Router} from "@angular/router"


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: any;
  display_content:any;
  form:any;
  form_add:any;
  page_no=0;
  fetch_page_no=1;
  modal_disp:any;
  active_object:any;
  add_form:any;
  modal_disp_add=false;
  constructor(private bookService: BooklistService ,private route: Router, private loginService:LoginService) { }

  ngOnInit(): void {
    if(! window.sessionStorage.getItem('logged_in_name')){
      this.route.navigate(['/login']);
    }
    else{
      this.loginService.loggedIn=true;
    }
    
    //const routeParams = this.route.snapshot.paramMap;
    var pageFromRoute:string;
    this.page_no=0;
    this.fetch_page_no=1;
    this.form={
      id:'',
      title:''

    }

    this.form_add={
      id:'',
      title:'',
      author:''

    }
    
    this.bookService.get_data(String(this.fetch_page_no)).subscribe(
      data => {
        //console.log(data);
        this.content = data;
        this.display_content=this.content.results.slice(16*((this.page_no)%2),32/(2*(1-this.page_no%2)))
        console.log(this.display_content);
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

  next():void{
    this.page_no+=1;
    if(this.page_no%2==0){
      this.fetch_page_no+=1;
      this.bookService.get_data(String(this.fetch_page_no)).subscribe(
        data => {
          //console.log(data);
          this.content = data;
          //console.log(this.content);
        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      );
    }
    this.display_content=this.content.results.slice(16*((this.page_no)%2),32/(2*(1-this.page_no%2)));
  }

  prev():void{
    this.page_no-=1;
    if(this.fetch_page_no!=(this.page_no/2)+1){
      this.fetch_page_no-=1;
      this.bookService.get_data(String(this.fetch_page_no)).subscribe(
        data => {
          //console.log(data);
          this.content = data;
          //console.log(this.content);
        },
        err => {
          this.content = JSON.parse(err.error).message;
        }
      );
    }
    this.display_content=this.content.results.slice(16*((this.page_no)%2),32/(2*(1-this.page_no%2)));
  }


  delete(index:number):void{
    //console.log(index);
    this.display_content.splice(index,1);
  }

  edit(index:any):void{
  this.modal_disp=true;
  this.active_object=index;
  this.form=Object.assign({},this.display_content[index]);
    

  }

  close():void{
    this.modal_disp=false;
    this.modal_disp_add=false;
  }

  add():void{
    this.modal_disp_add=true;
  }

  onSubmit():void{
    this.modal_disp=false;
    this.display_content[this.active_object]=this.form;
  }

  onSubmitAdd():void{
    this.modal_disp_add=false;
    this.display_content.push(this.form_add);
  }
}
