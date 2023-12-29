import { Component, OnInit } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { FormularioNuevoClienteComponent } from '../../components/formulario-nuevo-cliente/formulario-nuevo-cliente.component';

@Component({
  selector: 'app-nuevo-cliente',
  standalone: true,
  imports: [NgZorroModule, FormularioNuevoClienteComponent],
  templateUrl: './nuevo-cliente.component.html',
  styleUrl: './nuevo-cliente.component.css'
})
export class NuevoClienteComponent implements OnInit {





  ngOnInit() {

  }

}
