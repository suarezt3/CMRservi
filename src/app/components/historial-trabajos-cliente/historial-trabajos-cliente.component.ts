import { Component, inject, Input, OnInit } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { CommonModule } from '@angular/common';
import { FormularioNuevoTrabajoComponent } from '../formulario-nuevo-trabajo/formulario-nuevo-trabajo.component';
import { DatosClientesService } from '../../services/datos-clientes.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
  private notification = inject(NzNotificationService);

  ngOnInit(): void {

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


   deleteOrder(order: number) {
    this.DatosClientesService.deleteJobs(order).subscribe()
    let status = "success";
    this.notificationSuccess(status)
     setTimeout(() => {
      window.location.reload()
    }, 500);
  }

  notificationSuccess(type: string): void {
    this.notification.create(
      type,
      'Excelente',
      'Trabajo eliminado con exito 😀'
    );
  }

  cancelarModal(): void {
    this.modalVisible = false;
  }


}
