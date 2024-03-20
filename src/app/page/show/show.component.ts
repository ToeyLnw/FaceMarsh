import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { PictureComponent } from '../../components/picture/picture.component';


@Component({
  selector: 'app-show',
  standalone: true,
  imports: [HeaderComponent,PictureComponent],
  templateUrl: './show.component.html',
  styleUrl: './show.component.scss'
})
export class ShowComponent {

}
