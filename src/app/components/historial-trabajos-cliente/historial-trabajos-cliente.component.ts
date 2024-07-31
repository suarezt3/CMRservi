import { Component, inject, Input, OnInit } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { CommonModule } from '@angular/common';
import { FormularioNuevoTrabajoComponent } from '../formulario-nuevo-trabajo/formulario-nuevo-trabajo.component';
import { DatosClientesService } from '../../services/datos-clientes.service';

@Component({
  selector: 'app-historial-trabajos-cliente',
  standalone: true,
  imports: [NgZorroModule, CommonModule, FormularioNuevoTrabajoComponent],
  templateUrl: './historial-trabajos-cliente.component.html',
  styleUrl: './historial-trabajos-cliente.component.css'
})
export class HistorialTrabajosClienteComponent implements OnInit {

  @Input() trabajosCliente!: any;
  @Input() cliente: any = "" || undefined;
  public textDate: string = "Siguiente ";
  public modalVisible : boolean   = false
  public isOkLoading  : boolean   = false;
  public visible      : boolean   = false

  private DatosClientesService = inject( DatosClientesService );

  ngOnInit(): void {

    setTimeout(() => {
      console.log("CLIENTE", this.cliente);
    }, 1000);
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


  cancelarModal(): void {
    this.modalVisible = false;
  }


}
