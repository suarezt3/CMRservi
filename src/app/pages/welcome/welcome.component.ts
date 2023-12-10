import { Component, OnInit } from '@angular/core';
import { TablaClientesComponent } from '../../components/tabla-clientes/tabla-clientes.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  imports: [TablaClientesComponent]
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
