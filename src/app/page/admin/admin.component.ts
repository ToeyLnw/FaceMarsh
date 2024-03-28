import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SettingComponent } from './setting/setting.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent,SettingComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
