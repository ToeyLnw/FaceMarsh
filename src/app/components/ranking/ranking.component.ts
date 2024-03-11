import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/api/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [MatCardModule,CommonModule, MatButtonModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent {
  pics : any ;

  constructor(private picService:UserService, private router:Router){}
  
  ngOnInit(): void {
    this.LoadDataAsync();
  }

  async LoadDataAsync(){
    this.pics = await this.picService.getAllPics();
    console.log(this.pics);
  }
}