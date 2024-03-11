import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/api/user.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, 
    FormsModule, RouterLink, MatButtonModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: any;
  password: any;
  check : boolean = true;
  constructor (private http: HttpClient, private userService: UserService, 
    private router : Router){}

  user : any;

  async login() {
    // console.log("clicked");
    // console.log(this.email+this.password);
    this.user = await this.userService.loginCheck(this.email, this.password);
    console.log(this.user);
    
    if(Array.isArray(this.user) && this.user.length != 0){
      this.userService.setUID(this.user);
      this.router.navigate(['/']);
    }else{
      this.check = false;
    }
  }
}
