import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { DatosClientesService } from '../../services/datos-clientes.service';

@Component({
  selector: 'app-formulario-nuevo-trabajo',
  standalone: true,
  imports: [NgZorroModule, ReactiveFormsModule, FormsModule],
  templateUrl: './formulario-nuevo-trabajo.component.html',
  styleUrl: './formulario-nuevo-trabajo.component.css'
})
export class FormularioNuevoTrabajoComponent implements OnInit {

  public modalVisible : boolean   = false
  public formNuevoTrabajo!: FormGroup;
  public tiposTrabajos!: any[];
  public date = null;

  /**
   * Injecctions
   */
  private fb = inject(FormBuilder);
  private dataService  = inject(DatosClientesService);


  ngOnInit(): void {

    this.dataService.getTypeJobs().subscribe((resp) => {
      this.tiposTrabajos = resp
    })

    this.formNuevoTrabajo = this.fb.group({
     tipoTrabajo : [],
     fecha       : [],
     proximaFecha: [],
     numeroOrden : [],
     precio      : [],
     descripcion : []
    })

  }

  envioFormulario() {
    console.log("Desde el formulario", this.formNuevoTrabajo.value);
    this.modalVisible = false;
  }

}
