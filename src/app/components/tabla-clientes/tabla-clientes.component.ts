import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { DatosClientesService } from '../../services/datos-clientes.service';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { FormsModule } from '@angular/forms';
import { utils, writeFileXLSX } from 'xlsx';

import { SearchComponent } from '../search-name/search-name.component';
import { SearchPlacaComponent } from '../search-placa/search-placa.component';
import { SearchVehiculoComponent } from '../search-vehiculo/search-vehiculo.component';
import { RouterModule } from '@angular/router';
import { DetallesClienteComponent } from '../../pages/detalles-cliente/detalles-cliente.component';
import { HistorialTrabajosClienteComponent } from '../historial-trabajos-cliente/historial-trabajos-cliente.component';
import { Cliente } from '../../interfaces/cliente';
import { Trabajo } from '../../interfaces/trabajos';
import { CommonModule } from '@angular/common';
import { FormularioNuevoTrabajoComponent } from '../formulario-nuevo-trabajo/formulario-nuevo-trabajo.component';

interface President { Name: string; Index: number };

@Component({
  selector: 'app-tabla-clientes',
  standalone: true,
  templateUrl: './tabla-clientes.component.html',
  styleUrl: './tabla-clientes.component.css',
  imports: [
    CommonModule,
    NgZorroModule,
    FormsModule,
    RouterModule,
    SearchComponent,
    SearchPlacaComponent,
    SearchVehiculoComponent,
    DetallesClienteComponent,
    HistorialTrabajosClienteComponent,
    FormularioNuevoTrabajoComponent
  ],
})
export class TablaClientesComponent implements OnInit {

  public modalVisible   : boolean   = false
  public isOkLoading    : boolean   = false;
  public visible        : boolean   = false
  public datosClientes  : Cliente[] = [] || undefined;
  public cliente        : Cliente[] = [] || undefined;
  public trabajos       : Trabajo[] = [] || undefined;
  public isLoading      : boolean   = false;
  public query          : string    = ""
  private debounceTimer?: NodeJS.Timeout;


  private DatosClientesService = inject( DatosClientesService );

  constructor( ) {}


  ngOnInit() {
    this.DatosClientesService.getClientes().subscribe((resp: any) => {
      this.datosClientes = resp
    });
  }

  searchAll() {
    this.DatosClientesService.getClientes().subscribe((resp: any) => {
      this.datosClientes = resp
      this.query = ""
    });
  }

  onQueryChanged(query: string = '') {
    this.isLoading = true
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.DatosClientesService.getClientPlate(query.toUpperCase()).subscribe((resp: any) => {

        if (!query) {
          this.DatosClientesService.getClientes().subscribe((resp: any) => {
            this.datosClientes = resp
            this.query = ""
            this.isLoading = false
          });
        } else {
          this.datosClientes = resp
          this.isLoading = false
        }


      })
    },800)
  }

 open(placa: any) {
  this.DatosClientesService.getJobsClients(placa).subscribe((trabajo: any) => {
    this.trabajos = trabajo
    console.log("TRABAJOS", this.trabajos);
  })
      this.DatosClientesService.getClientPlate(placa).subscribe((resp: any) => {
        this.cliente = resp
        console.log("CLIENTE", this.cliente);
      })
      this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  /**
   * Modal que carga el formulario para agregar los trabajos
   */
  mostrarModal(placa: any): void {
    this.DatosClientesService.getClientPlate(placa).subscribe((resp: any) => {
      this.cliente = resp
      console.log("CLIENTE", this.cliente);
    })
    this.modalVisible = true;
  }

  enviarFormulario(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.modalVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  cancelarModal(): void {
    this.modalVisible = false;
  }


  /**
   * Funcion para exportar los datos de la tabla en un excel
   */
  rows: Cliente[] = [
     {
      name: "Eyder Suarez",
      documentType: "Cedula",
      numberDocument: "1.130.680.544",
      email: "ey_der19@hotmail.com",
      phone: "318277564",
      vehicle: "Viva R Style",
      vehicleBrand: "Suzuki",
      plate: "MMC13G"
     }
    ];
  /* get state data and export to XLSX */
  DwonloadXLSX(): void {
    /* generate worksheet from state */
    const ws = utils.json_to_sheet(this.rows);
    /* create workbook and append worksheet */
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Datos");
    /* export to XLSX */
    writeFileXLSX(wb, "Clientes.xlsx");

}

}
