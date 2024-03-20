import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/api/user.service';
// import { User, UserService } from '../../services/api/user.service';
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

    this.user = this.userService.getCurrentUser();
    console.log(this.user);
    //this.userService.setUID(this.user);
  }

  // ngOnInit(): void {
  //   // Fetch data from the database
  //   this.userService.getData().subscribe(
  //     (data: any) => {
  //       // Once data is fetched, store it in local storage
  //       localStorage.setItem('databaseData', JSON.stringify(data));
  //     },
  //     (error) => {
  //       console.error('Error fetching data from database:', error);
  //     }
  //   );
  // }

}


