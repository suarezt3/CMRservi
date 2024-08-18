import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { DatosClientesService } from '../../services/datos-clientes.service';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { FormsModule } from '@angular/forms';

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

  public modalVisible : boolean   = false
  public isOkLoading  : boolean   = false;
  public visible      : boolean   = false
  public datosClientes: Cliente[] = [] || undefined;
  public cliente      : Cliente[] = [] || undefined;
  public trabajos     : Trabajo[] = [] || undefined;
  private debounceTimer?: NodeJS.Timeout;


  private DatosClientesService = inject( DatosClientesService );

  constructor( ) {}


  ngOnInit() {
    this.DatosClientesService.getClientes().subscribe((resp: any) => {
      this.datosClientes = resp
    });
  }

  onQueryChanged(query: string = '') {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      console.log("Probando Query", query);
      this.DatosClientesService.getClientPlate(query).subscribe((resp: any) => {
        this.cliente = resp
        console.log("CLIENTE", this.cliente);
      })
    },3000)
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

}
