import { Component, Input, OnInit, inject } from '@angular/core';

import { DatosClientesService } from '../../services/datos-clientes.service';


@Component({
  selector: 'app-detalles-cliente',
  standalone: true,
  imports: [],
  templateUrl: './detalles-cliente.component.html',
  styleUrl: './detalles-cliente.component.css'
})
export class DetallesClienteComponent implements OnInit {

  @Input() cliente: any[] = [] || undefined

  private DatosClientesService = inject( DatosClientesService );

  constructor() {}

  ngOnInit() {

  }



}
