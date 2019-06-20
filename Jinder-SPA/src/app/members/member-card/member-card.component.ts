import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router) { }
@Input() user:User;

  ngOnInit() {
  }
  OnDetail()
  {
    
      this.router.navigate([this.user.id],{relativeTo:this.route});
  }

}
