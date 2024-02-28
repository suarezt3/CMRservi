import { Component, Input, OnInit, inject } from '@angular/core';

import { DatosClientesService } from '../../services/datos-clientes.service';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-detalles-cliente',
  standalone: true,
  imports: [NgZorroModule, CommonModule, RouterLink,],
  templateUrl: './detalles-cliente.component.html',
  styleUrl: './detalles-cliente.component.css'
})
export class DetallesClienteComponent implements OnInit {

  @Input() cliente: any[] = [] || undefined

  private DatosClientesService = inject( DatosClientesService );

  constructor() {}

  ngOnInit() {
    console.log("CLIENTE", this.cliente);


  }



}
