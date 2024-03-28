import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/api/user.service';
import { UserComponent } from '../../../components/user/user.component';
@Component({
  selector: 'app-edit-pic',
  standalone: true,
  imports: [UserComponent, RouterModule, FormsModule, MatButtonModule],
  templateUrl: './edit-pic.component.html',
  styleUrl: './edit-pic.component.scss'
})
export class EditPicComponent {
  userProfile: any;
  fname: any;
  lname: any;
  des: any;
  id:any;
  picData: any;
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
    console.log("here");
    
    try {
      await this.userService.updatePic(this.id, this.fname, this.lname, this.des, this.picData.image);
      // เมื่ออัปเดตข้อมูลเสร็จสิ้น นำผู้ใช้กลับไปยังหน้า user หรือหน้าที่คุณต้องการ
      // let Link = "profile/"+this.userProfile[0].UID;
      let link = "/show/"+this.id;
      this.router.navigate([link]);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการอัปเดตโปรไฟล์:', error);
    }
  }

  file(){
    console.log('dsfsd');
    
    let link = '/pagepic/file/'+this.id;
    this.router.navigate([link]);
  }

}

