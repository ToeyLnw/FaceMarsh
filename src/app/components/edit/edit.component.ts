import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/api/user.service';
import { UserComponent } from '../../components/user/user.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [UserComponent, RouterModule, FormsModule,MatButtonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {
  userProfile: any;
  fname: any;
  lname: any;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userProfile = this.userService.getCurrentUser(); // ดึงข้อมูลผู้ใช้ปัจจุบัน
    this.fname = this.userProfile.fname;
    this.lname = this.userProfile.lname;
    
  }

  async updateProfile() {
    try {
      await this.userService.updateUserProfile(this.userProfile.UID, this.fname, this.lname,this.userProfile.profile,this.userProfile.password);
      // เมื่ออัปเดตข้อมูลเสร็จสิ้น นำผู้ใช้กลับไปยังหน้า user หรือหน้าที่คุณต้องการ
            // let Link = "profile/"+this.userProfile[0].UID;
      this.router.navigate(['/']);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดตโปรไฟล์:', error);
    }
  }
  changePass() { 
    this.router.navigate(['/edit/password']);
  }
  changeProfile() { 
    this.router.navigate(['/edit/file']);
  }
}