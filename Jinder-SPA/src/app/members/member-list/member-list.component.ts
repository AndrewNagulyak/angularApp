import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  constructor(private userService:UserService, private alertifyService:AlertifyService, private route:ActivatedRoute) { }
  public users:User[]=[];
  
  ngOnInit() {
   this.route.data.subscribe(data => {
     this.users = data['users'];
   });
  }
  // loadUsers()
  // {
  //   this.userService.getUsers().subscribe((users:User[])=>{ 
  //     this.users = users;
  //   })
  // }

}
