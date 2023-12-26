import { Component, Input, OnInit, inject } from '@angular/core';
import { CLIENTE } from '../../interfaces/CLIENTE';
import { DatosClientesService } from '../../services/datos-clientes.service';

@Component({
  selector: 'app-detalles-cliente',
  standalone: true,
  imports: [],
  templateUrl: './detalles-cliente.component.html',
  styleUrl: './detalles-cliente.component.css'
})
export class DetallesClienteComponent implements OnInit {

  @Input() cliente: CLIENTE[] = [] || undefined

  private DatosClientesService = inject( DatosClientesService );

  constructor() {this.DatosClientesService.datos}

  ngOnInit() {

    setTimeout(() => {
      this.cliente = this.DatosClientesService.datos
      console.log("cliente", this.cliente);
    }, 300);

  }



}
