import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/api/user.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [MatCardModule,CommonModule, MatButtonModule,RouterLink],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss'
})
export class RankingComponent {
  pics : any ;
  rank : any ;
  constructor(private picService:UserService, private router:Router){}
  
  ngOnInit(): void {
    this.LoadDataAsync();
  }

  async LoadDataAsync(){
    this.pics = await this.picService.getAllPics();

    this.rank = [];
    // loop rank1-rank2 collect in array na
    for (const pic of this.pics) {
      const i = this.pics.indexOf(pic); 
      this.rank[i] = pic.ranking2 - pic.ranking1;
      // console.log(this.rank[i]);
      // console.log(pic.ranking2);
      
  }
  
    console.log(this.pics);
  }
}
