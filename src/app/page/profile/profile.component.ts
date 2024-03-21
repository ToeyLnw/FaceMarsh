import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { UserComponent } from '../../components/user/user.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent,UserComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

}
