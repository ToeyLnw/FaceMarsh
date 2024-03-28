import { Component } from '@angular/core';
import { UserService } from '../../../services/api/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UserComponent } from '../../../components/user/user.component';
@Component({
  selector: 'app-pfile',
  standalone: true,
  imports: [UserComponent, FormsModule, MatButtonModule],
  templateUrl: './pfile.component.html',
  styleUrl: './pfile.component.scss'
})
export class PFileComponent {
  userProfile: any;
  fname: any;
  lname: any;
  des: any;
  id:any;
  picData: any;
  img: any;
  url:any;
  constructor(private userService: UserService, private router: Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.userProfile = this.userService.getCurrentUser(); // ดึงข้อมูลผู้ใช้ปัจจุบัน
    this.id = this.activatedRoute.snapshot.paramMap.get('id') || 0;
    this.getPicture();
  }

  async getPicture() {
    const data = await this.userService.getShow(this.id);
    if (data && data.length > 0) {
      this.picData = data[0]; // เลือกข้อมูลตัวแรกจาก array
      console.log(this.picData);
    this.fname = this.picData.fname;
    this.lname = this.picData.lname;
    this.des = this.picData.description;
    }
  }
  async updateProfile() {
    
    try {
      this.url = await this.userService.uploadFile(this.img);
      await this.userService.updatePic(this.id, this.fname, this.lname, this.des, this.url.url);
      // เมื่ออัปเดตข้อมูลเสร็จสิ้น นำผู้ใช้กลับไปยังหน้า user หรือหน้าที่คุณต้องการ
      // let Link = "profile/"+this.userProfile[0].UID;
      let link = "/show/"+this.id;
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
