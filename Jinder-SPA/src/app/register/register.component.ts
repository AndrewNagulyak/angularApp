import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/_services/auth.service';
import { Subscription } from 'rxjs';

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
  constructor(private authService: AuthService) { }
@Output() cancelRegister = new EventEmitter();
  ngOnInit() {
  }
  public register()
  {
    this.registerObservable=this.authService.register(this.model).subscribe(()=>(console.log('successful')));
  }
  cancel()
  {
    this.cancelRegister.emit(false);
    console.log('canceled');
  }

}
