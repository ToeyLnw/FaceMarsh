import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/api/user.service';
import { UserComponent } from '../../../components/user/user.component';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [UserComponent, RouterModule, FormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent {
  oldPass : any;
  newPass : any;
  userProfile: any;
  hash : any;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userProfile = this.userService.getCurrentUser(); // ดึงข้อมูลผู้ใช้ปัจจุบัน
  }
  async updateProfile() {
    try {
      this.hash = await this.userService.getHashNewPass(this.userProfile.UID, this.oldPass, this.newPass)
      console.log("asdasdasd");
      console.log(this.hash.password);
      await this.userService.updateUserProfile(this.userProfile.UID, this.userProfile.fname, this.userProfile.lname, this.userProfile.profile, this.hash.password);
      // เมื่ออัปเดตข้อมูลเสร็จสิ้น นำผู้ใช้กลับไปยังหน้า user หรือหน้าที่คุณต้องการ
            // let Link = "profile/"+this.userProfile[0].UID;
      // this.router.navigate(['/']);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดตโปรไฟล์:', error);
    }
  }
}
