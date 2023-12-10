import { Component, OnInit, inject, signal } from '@angular/core';
import { DatosClientesService } from '../../services/datos-clientes.service';

@Component({
  selector: 'app-tabla-clientes',
  standalone: true,
  imports: [],
  templateUrl: './tabla-clientes.component.html',
  styleUrl: './tabla-clientes.component.css'
})
export class TablaClientesComponent implements OnInit {


  private datosClientes = signal([])
  private DatosClientesService = inject( DatosClientesService )


  constructor( ) {}


  ngOnInit() {
    this.DatosClientesService.getClientes().subscribe((resp: any) => {
      this.datosClientes = resp
      console.log("DATOS", this.datosClientes);
    });
  }

}
