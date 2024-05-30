import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
  public limitNumber: string  = "^([0-9]+)$"

  /**
   * Injecctions
   */
  private fb = inject(FormBuilder);
  private dataService  = inject(DatosClientesService);


  ngOnInit(): void {

    this.dataService.getTypeJobs().subscribe((resp) => {
      this.tiposTrabajos = resp
    })

    /**
     * Formulario para crear los trabajos
     */
    this.formNuevoTrabajo = this.fb.group({
     tipoTrabajo : ['', [Validators.required]],
     fecha       : ['', [Validators.required]],
     proximaFecha: [''],
     numeroOrden : ['', [Validators.required]],
     precio      : ['', [Validators.required]],
     descripcion : ['', [Validators.required]],
     user        : [''],
     vehicle     : [''],
     vehicleBrand: [''],
     plate       : [''],
     name        : ['']
    })
  }

  /**
   *
   * @param field valida los campos del formulario
   * @returns
   */
  invalidField( field: string ) {
    return this.formNuevoTrabajo.get(field)?.invalid
            && this.formNuevoTrabajo.get(field)?.touched;
  }

  /**
   *
   * @param control Se validad si el control del formulario es requerido
   * @returns
   */
  hasRequiredError(control: any): boolean {
    return control.errors?.["required"];
  }


  envioFormulario() {
    this.formNuevoTrabajo.markAllAsTouched()
    console.log("Desde el formulario", this.formNuevoTrabajo.value);
    this.modalVisible = false;
  }

}
