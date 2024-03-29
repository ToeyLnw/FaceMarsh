import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// import { routes } from '../../app.routes';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserService } from '../../services/api/user.service';
import { CommonModule } from '@angular/common';
CommonModule


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule, RouterOutlet, MatToolbarModule, MatButtonModule, MatCardModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  user: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user=this.userService.getCurrentUser();
    // try {
    //   const currentUser = this.userService.getCurrentUser();
    //   if (currentUser !== null && currentUser !== undefined) {
    //     this.user = currentUser;
    //   } else {
    //     console.error('getCurrentUser() returned null or undefined.');
    //   }
    // } catch (error) {
    //   console.error('An error occurred while trying to get the current user:', error);
    // }
    
    
  }

  logOut(){
    localStorage.removeItem("currentUser");
  }
}
