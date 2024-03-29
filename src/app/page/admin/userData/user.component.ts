import { Component } from '@angular/core';
import { UserService } from '../../../services/api/user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Constants } from '../../../config/constant';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserDataComponent {
  users: any;
  data: any;
  constructor(private userService: UserService, private constants: Constants, private http: HttpClient) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    const url = this.constants.API_ENDPOINT;

    this.http.get(url).subscribe((result: any) => {
      this.users = result; // กำหนดค่า users โดยใช้ข้อมูลที่ได้รับมา
      console.log(this.users); // ตรวจสอบข้อมูลที่ได้รับมาในคอนโซล
    });
  }
}

