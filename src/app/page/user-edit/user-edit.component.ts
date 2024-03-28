import { Component } from '@angular/core';
import { EditComponent } from '../../components/edit/edit.component';
import { UserService } from '../../services/api/user.service';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [EditComponent,HeaderComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {
  userProfile: any;

  constructor(private userService: UserService ) { }

  ngOnInit(): void {
    this.userProfile = this.userService.getCurrentUser(); // ดึงข้อมูลผู้ใช้ปัจจุบัน
  }
}
