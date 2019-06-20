import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  public model: any = {};
  private subscrition = new Subscription();
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) {}

  public ngOnInit() {}

  public login() {
    this.subscrition.add(this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success('Logging succssesfully');
      },
      (error) => {
        this.alertify.error(error);
      },
      () => {
        this.router.navigate(['/members']);

      }
    ));
  }
 public loggedIn() {
   return this.authService.loggedIn();
 }
 public logout()
 {
   localStorage.removeItem('token');
   this.alertify.success('logout ');
  this.router.navigate(['/home']);
 }
  public ngOnDestroy() {
    this.subscrition.unsubscribe();
  }
}
