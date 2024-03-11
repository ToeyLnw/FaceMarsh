import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
// import { routes } from '../../app.routes';
import { RouterModule, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,RouterOutlet,MatToolbarModule, MatButtonModule, MatCardModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
