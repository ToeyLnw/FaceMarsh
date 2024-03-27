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

  user: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getCurrentUser();

  }

}
