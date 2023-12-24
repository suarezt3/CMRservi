import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { DatosClientesService } from '../../services/datos-clientes.service';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from '../search-name/search-name.component';


@Component({
  selector: 'app-tabla-clientes',
  standalone: true,
  templateUrl: './tabla-clientes.component.html',
  styleUrl: './tabla-clientes.component.css',
  imports: [ NgZorroModule, FormsModule, SearchComponent ],
})
export class TablaClientesComponent implements OnInit {

  public paginaActual = signal(1)



  public datosClientes: any[] = []
  private DatosClientesService = inject( DatosClientesService )


  constructor( ) {}


  ngOnInit() {
    this.DatosClientesService.getClientes().subscribe((resp: any) => {
      this.datosClientes = resp
      console.log("DATOS", this.datosClientes, this.datosClientes.length);
    });
  }


  actualizarPagina(event: any) {
    console.log("EVENTO", event);
    this.datosClientes = event
    }

    cambioPagina(event: any){
      console.log("Pagina Actual", event);
      this.paginaActual = event
    }

}
