import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http:HttpClient,private authService:AuthService) { }
  registerMode=false;
  loggedIn=false;
  ngOnInit() {
    this.authService.logged.subscribe((b:any)=>this.loggedIn=!!b);
    //this.loggedIn = !!this.authService.loggedIn;

  }
  registerToggle()
  {
    this.registerMode=!this.registerMode;
  } 

  cancelRegisterMode(bool : boolean)
  {
    this.registerMode = bool;
  }

}
