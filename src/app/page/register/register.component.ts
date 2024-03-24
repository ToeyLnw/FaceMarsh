import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserGetRespons } from '../../model/user-get-res';
import { UserService } from '../../services/api/user.service';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatFormFieldModule, MatCardModule, MatInputModule, 
    FormsModule, RouterLink, MatButtonModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  fname : any;
  lname : any;
  img : any;
  email : any;
  password : any;
  url: any;
  constructor(private userService: UserService, private router : Router){}

  user : UserGetRespons[] = [];
  
  async register(){
    if (this.areFieldsInvalid()) {
      console.log("Please fill in all fields");
      return;
    }
    console.log(this.fname+" "+this.lname+" "+this.img+" "+this.email+" "+this.password);

    alert("สมัครล้า");
    this.router.navigate(['/login']);
    this.url = await this.userService.uploadFile(this.img);
    //console.log(this.url.url);
    
    this.user = await this.userService.addNewUser(this.fname, this.lname, this.url.url,
       this.email, this.password);
  }
  areFieldsInvalid(): boolean {
    return !this.fname || !this.email || !this.password;
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
