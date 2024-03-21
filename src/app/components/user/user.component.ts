import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../services/api/user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user: any;
  userProfile: any;
  id: any;
  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const idGet = this.activatedRoute.snapshot.paramMap.get('id') || 0;
    this.id = +idGet; //convert it into number
    // console.log(this.id);
    this.user = this.userService.getCurrentUser();
    this.loadUserProfile();
  }

  getType(variable: any): string {
    return typeof variable;
}

  async loadUserProfile() {
    try {
      const data = await this.userService.getUserProfile(this.id);
      if (data && data.length > 0) {
        this.userProfile = data[0]; // เลือกข้อมูลตัวแรกจาก array
        console.log(this.userProfile);
      }

    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
      throw error;
    }
  }
}



