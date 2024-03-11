import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/api/user.service';
import { VoteComponent } from '../../components/vote/vote.component';
import { HeaderComponent } from '../../components/header/header.component';
import { UserGetRespons } from '../../model/user-get-res';
import { RouterLink } from '@angular/router';
import { RankingComponent } from '../../components/ranking/ranking.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatButtonModule, CommonModule, VoteComponent, HeaderComponent, RouterLink, RankingComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  user: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getUID();
    this.userService.setUID(this.user);
  }

  // setUser() {
  //   let users = [];
  //   if(sessionStorage.getItem('users')){
  //     users = JSON.parse(sessionStorage.getItem('users')!);
  //   }
  //   let user = new User();
  //   for (const us of this.user){
  //     user.UID = us.UID;
  //     user.fname = us.fname;
  //     user.lname = us.lname;
  //     user.email = us.email;
  //     user.password = us.password;
  //     user.profile = us.profile;
  //     user.type = us.type;
  //     user.limit_upload = us.limit_upload;
  //   }
  //   users.push(user);
  //   sessionStorage.setItem('users', JSON.stringify(users));

  //   console.log(sessionStorage.getItem('users'));
  // }

}


