import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService) { }
@Output() cancelRegister = new EventEmitter();
  ngOnInit() {
  }
  public register()
  {
    this.authService.register(this.model).subscribe(()=>(console.log('successful')));
  }
  cancel()
  {
    this.cancelRegister.emit(false);
    console.log('canceled');
  }

}
