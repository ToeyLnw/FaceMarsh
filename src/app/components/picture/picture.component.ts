import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/api/user.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';

import Chart from 'chart.js/auto';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-picture',
  standalone: true,
  imports: [HeaderComponent, CommonModule,MatButtonModule],
  templateUrl: './picture.component.html',
  styleUrl: './picture.component.scss'
})

export class PictureComponent implements OnInit {
  user:any;
  id: any;
  pic: any;
  history: any;

  constructor(private activatedRoute: ActivatedRoute, private picService: UserService,
    private router:Router) {}

  ngOnInit() {
    this.user = this.picService.getCurrentUser();
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || 0;
    this.getPicture();
    this.getHistory();
  }

  async getPicture() {
    const data = await this.picService.getShow(this.id);
    if (data && data.length > 0) {
      this.pic = data[0]; // เลือกข้อมูลตัวแรกจาก array
      console.log(this.pic);
    }
  }

  async getHistory() {
    this.history = await this.picService.getHistory(this.id);
    console.log(this.history);
    if (this.history && this.history.length > 0) {
      this.createChart(); // เมื่อได้ข้อมูลแล้วให้สร้างกราฟ
    }
  }
  
  async delete(){
    await this.picService.deletePic(this.id,this.user.UID);
    alert("delete success");
    this.router.navigate(['/']);
  }
  edit(){
    let link = '/pagepic/editpic/'+this.id
    this.router.navigate([link]);
  }

  createChart() {
    // สร้างกราฟด้วย Chart.js
    const ctx = document.createElement('canvas');
    const container = document.querySelector('.bar-graph');
    container?.appendChild(ctx);
    
    new Chart(ctx, {
      type: 'line', // เปลี่ยนชนิดของกราฟเป็นเส้น
      data: {
        labels: this.history.map((item: any) => item.date),
        datasets: [{
          label: 'Scores of Votes',
          data: this.history.map((item: any) => item.point),
          backgroundColor: 'rgba(0, 255, 127, 0.6)', // ตั้งค่าสีพื้นหลังเป็นสีเขียวมรกต
          borderColor: 'rgba(0, 255, 127, 1)', // ตั้งค่าสีเส้นเป็นสีเขียวมรกต
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

