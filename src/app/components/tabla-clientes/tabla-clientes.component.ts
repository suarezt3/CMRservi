import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { DatosClientesService } from '../../services/datos-clientes.service';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { FormsModule } from '@angular/forms';

import { SearchComponent } from '../search-name/search-name.component';
import { SearchPlacaComponent } from '../search-placa/search-placa.component';
import { SearchVehiculoComponent } from '../search-vehiculo/search-vehiculo.component';
import { CLIENTE } from '../../interfaces/CLIENTE';
import { RouterModule } from '@angular/router';
import { DetallesClienteComponent } from '../../pages/detalles-cliente/detalles-cliente.component';


@Component({
  selector: 'app-tabla-clientes',
  standalone: true,
  templateUrl: './tabla-clientes.component.html',
  styleUrl: './tabla-clientes.component.css',
  imports: [
    NgZorroModule,
    FormsModule,
    RouterModule,
    SearchComponent,
    SearchPlacaComponent,
    SearchVehiculoComponent,
    DetallesClienteComponent
  ],
})
export class TablaClientesComponent implements OnInit {


  public visible: boolean = false
  public datosClientes: CLIENTE[] = [] || undefined;
  private DatosClientesService = inject( DatosClientesService )
  public idPlaca: string = ""

  constructor( ) {}


  ngOnInit() {
    this.DatosClientesService.getClientes().subscribe((resp: any) => {
      this.datosClientes = resp
    });
  }


 open(placa: any) {
    this.idPlaca = placa
    this.visible = true;
    console.log(placa);
    this.DatosClientesService.getClientPlate(placa).subscribe((resp: any) => {
      console.log("DATOS", resp[0]);

    });
  }

  close(): void {
    this.visible = false;
  }


}
