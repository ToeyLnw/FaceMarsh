import { Component } from '@angular/core';
import { UserService } from '../../services/api/user.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-vote',
  standalone: true,
  imports: [CommonModule, MatButtonModule, HeaderComponent],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss'
})
export class VoteComponent {
  pics : any ;
  score :any ;
  pid : any ;
  constructor(private picService:UserService, private router:Router){}
  
  ngOnInit(): void {
    this.LoadDataAsync();
  }

  async LoadDataAsync(){
    this.pics = await this.picService.randomToFight();
    console.log(this.pics);
  }

  async vote(value: number){
    console.log(value);
    
    let i = 1;
    this.score = [];
    this.pid = [] ;
    for (const pic of this.pics){
      this.pid[i]=pic.PID;
      console.log("id ="+ pic.PID);
      this.score[i]=pic.point;
      console.log("score "+i+" = "+this.score[i]);
      i++;
    }
    
    // console.log("score 2 = "+this.score[2]);
    let Ea = 1/(1+(10**((this.score[2]-this.score[1])/400)));
    let Eb = 1/(1+(10**((this.score[1]-this.score[2])/400)));
    // console.log("Ea:"+Ea+": Eb:"+Eb);
    // console.log("score = "+(10**((this.score[1]-this.score[2])/400)));
    // console.log("score = "+((this.score[2]-this.score[1])/400));
    let k = 32;
    let Sa,Sb : number;
    if(value == 0){
      Sa = 1;
      Sb = 0;
    }else{
      Sa = 0;
      Sb = 1;
    }
    // console.log("Sa:"+Sa+": Sb:"+Sb);
    // console.log("Sa-Ea= "+(Sa-Ea));

    let Ra = this.score[1] + k*(Sa-Ea);
    let Rb = this.score[2] + k*(Sb-Eb);

    console.log("Pic1 gets"+(Ra-this.score[1])+"point");
    console.log("Pic2 gets"+(Rb-this.score[2])+"point");

    await this.picService.updatePoint(this.pid[1],Ra);
    await this.picService.updatePoint(this.pid[2],Rb);

    alert("vote success!");
    window.location.reload();
    // this.router.navigate(['/']);
  }
}


