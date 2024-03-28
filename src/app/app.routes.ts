import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { MainComponent } from './page/main/main.component';
import { VoteComponent } from './components/vote/vote.component';
import { ShowComponent } from './page/show/show.component';
import { PictureComponent } from './components/picture/picture.component';
import { ProfileComponent } from './page/profile/profile.component';
import { AdminComponent } from './page/admin/admin.component';
import { SettingComponent } from './page/admin/setting/setting.component';
import { PicComponent } from './page/admin/pic/pic.component';
import { UserEditComponent } from './page/user-edit/user-edit.component';
import { UserDataComponent } from './page/admin/userData/user.component';
import { NameComponent } from './page/user-edit/name/name.component';
import { FileComponent } from './page/user-edit/file/file.component';
import { PasswordComponent } from './page/user-edit/password/password.component';

export const routes: Routes = [
    {path : 'login', component : LoginComponent},
    {path : 'register', component : RegisterComponent},
    {path : '', component: MainComponent},
    {path : 'vote' , component: VoteComponent},
    {path : 'show/:id', component : ShowComponent},
    {path : 'profile/:id', component: ProfileComponent},
    {path : 'edit', component: UserEditComponent,
    children: [
        {path : 'name', component : NameComponent},
        {path : 'file', component : FileComponent},
        {path : 'password', component : PasswordComponent}
    ]
},
    {path : 'admin', component : AdminComponent,
    children: [
        {path : 'setting', component : SettingComponent},
        {path : 'pic', component : PicComponent},
        {path : 'user', component : UserDataComponent}
    ]},
];
