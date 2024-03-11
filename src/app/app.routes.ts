import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { MainComponent } from './page/main/main.component';
import { VoteComponent } from './components/vote/vote.component';

export const routes: Routes = [
    {path : 'login', component : LoginComponent},
    {path : 'register', component : RegisterComponent},
    {path : '', component: MainComponent},
    {path : 'vote' , component: VoteComponent}
];
