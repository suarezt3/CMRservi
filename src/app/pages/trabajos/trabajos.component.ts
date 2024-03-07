import { Component } from '@angular/core';
import { TablaTrabajosComponent } from '../../components/tabla-trabajos/tabla-trabajos.component';

@Component({
  selector: 'app-trabajos',
  standalone: true,
  imports: [TablaTrabajosComponent],
  templateUrl: './trabajos.component.html',
  styleUrl: './trabajos.component.css'
})
export class TrabajosComponent {

}
