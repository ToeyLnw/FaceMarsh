import { Component } from '@angular/core';
import { EditComponent } from '../../../components/edit/edit.component';

@Component({
  selector: 'app-name',
  standalone: true,
  imports: [EditComponent],
  templateUrl: './name.component.html',
  styleUrl: './name.component.scss'
})
export class NameComponent {

}
