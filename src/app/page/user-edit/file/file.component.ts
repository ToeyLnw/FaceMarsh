import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../services/api/user.service';
import { UserComponent } from '../../../components/user/user.component';
@Component({
  selector: 'app-file',
  standalone: true,
  imports: [UserComponent, RouterModule, FormsModule],
  templateUrl: './file.component.html',
  styleUrl: './file.component.scss'
})
export class FileComponent {
  userProfile: any;
  img: any;
  url: any;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userProfile = this.userService.getCurrentUser(); // ดึงข้อมูลผู้ใช้ปัจจุบัน
  }

  async updateProfile() {
    try {
      this.url = await this.userService.uploadFile(this.img);
      await this.userService.updateUserProfile(this.userProfile.UID, this.userProfile.fname, this.userProfile.lname, this.url.url, this.userProfile.password);
      // let Link = "profile/"+this.userProfile[0].UID;
      this.router.navigate(['/']);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดตโปรไฟล์:', error);
    }
  }

  onFileSelected(files: FileList | null) {
    if (files && files.length > 0) {
      const fileToUpload = files.item(0);
      if (fileToUpload) {
        this.img = fileToUpload;
        // this.uploadImage(fileToUpload);
      }
    }
  }


}
