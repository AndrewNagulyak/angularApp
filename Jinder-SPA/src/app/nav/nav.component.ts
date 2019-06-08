import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/_services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  public model: any = {};
  private subscrition = new Subscription();
  constructor(private authService: AuthService) {}

  public ngOnInit() {}

  public login() {
    this.subscrition.add(this.authService.login(this.model).subscribe(
      (next) => {
        console.log('Logged in succsesfully');
      },
      (error) => {
        ('Failed');
      }
    ))
  }
 public loggedIn() {
   const token = localStorage.getItem('token');
   return !!token;
 }
 public logout()
 {
   localStorage.removeItem('token');
   console.log('logout ');
 }
  public ngOnDestroy() {
    this.subscrition.unsubscribe();
  }
}
