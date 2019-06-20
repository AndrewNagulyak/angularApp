import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {
  registerObservable : Subscription;
  ngOnDestroy(): void {
    this.registerObservable.unsubscribe();
  }
  model: any = {};
  constructor(private authService: AuthService, private alertify: AlertifyService) { }
@Output() cancelRegister = new EventEmitter();
  ngOnInit() {
  }
  public register()
  {
    this.registerObservable=this.authService.register(this.model).subscribe(()=>(this.alertify.success('Registration successful')),(error)=>(this.alertify.error(error)));
  }
  cancel()
  {
    this.cancelRegister.emit(false);
    console.log('canceled');
  }

}
