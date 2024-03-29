import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/api/user.service';
import { UserComponent } from '../../../components/user/user.component';
@Component({
  selector: 'app-add',
  standalone: true,
  imports: [UserComponent, RouterModule, FormsModule, MatButtonModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  userProfile: any;
  fname: any;
  lname: any;
  des: any;
  id:any;
  url : any;
  img: any;
  picData: any;
  constructor(private userService: UserService, private router: Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.userProfile = this.userService.getCurrentUser(); // ดึงข้อมูลผู้ใช้ปัจจุบัน
  }

  async updateProfile() {
    // console.log("here");
    
    try {
      this.url = await this.userService.uploadFile(this.img);
      await this.userService.addNewPic(this.userProfile.UID, this.fname, this.lname, this.url.url, this.des);
      
      let link = "/profile/"+this.userProfile.UID;
      this.router.navigate([link]);
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
