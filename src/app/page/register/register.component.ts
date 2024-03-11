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
  
  constructor(private userService: UserService, private router : Router){}

  user : UserGetRespons[] = [];
  
  async register(){
    if (this.areFieldsInvalid()) {
      console.log("Please fill in all fields");
      return;
    }
    console.log("clicked here!!!");

    console.log(this.fname+" "+this.lname+" "+this.img+" "+this.email+" "+this.password);

    alert("สมัครล้า");
    this.router.navigate(['/login']);
    this.user = await this.userService.addNewUser(this.fname, this.lname, this.img,
       this.email, this.password);
  }
  areFieldsInvalid(): boolean {
    return !this.fname || !this.email || !this.password;
  }
}
