import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { DatosClientesService } from '../../services/datos-clientes.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-formulario-nuevo-trabajo',
  standalone: true,
  imports: [NgZorroModule, ReactiveFormsModule, FormsModule],
  templateUrl: './formulario-nuevo-trabajo.component.html',
  styleUrl: './formulario-nuevo-trabajo.component.css'
})
export class FormularioNuevoTrabajoComponent implements OnInit {

  @Input() cliente: any = "" || undefined

  public modalVisible     : boolean   = false
  public formNuevoTrabajo!: FormGroup;
  public tiposTrabajos   !: any[];
  public date = null;
  public limitNumber      : string  = "^([0-9]+)$";
  public id = "";
  public vehicle         !: string | null;
  public vehicleBrand    !: string | null;
  public plate           !: string | null;
  public numberDocument  !: number | null;
  public name            !: string | null;
  public isLoading        : boolean = false;

  /**
   * Injecctions
   */
  private fb = inject(FormBuilder);
  private dataService  = inject(DatosClientesService);
  private notification = inject(NzNotificationService);
  private activatedRoute = inject(ActivatedRoute);


  ngOnInit(): void {

    this.dataService.getTypeJobs().subscribe((resp) => {
      this.tiposTrabajos = resp
    });

    setTimeout(() => {
      console.log("DATOS CLIENTE", this.cliente);
       this.vehicle = this.cliente.vehicle
       this.vehicleBrand = this.cliente.vehicleBrand
       this.plate = this.cliente.plate,
       this.numberDocument = this.cliente.numberDocument
       this.name = this.cliente.name
    }, 1000);




    /**
     * Formulario para crear los trabajos
     */
    this.formNuevoTrabajo = this.fb.group({
     typeJobs      : ['', [Validators.required]],
     date          : ['', [Validators.required]],
     nextDate      : [''],
     numberOrder   : ['', [Validators.required]],
     price         : ['', [Validators.required]],
     description   : ['', [Validators.required]],
     user          : [''],
     vehicle       : [''],
     vehicleBrand  : [''],
     plate         : [''],
     name          : ['']
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
    this.isLoading = true
    setTimeout(() => {
      this.formNuevoTrabajo.markAllAsTouched()
      if (this.formNuevoTrabajo.invalid) {
       let status = "error"
       this.notificationError(status)
      }else {
        this.formNuevoTrabajo.get('vehicle')?.setValue(this.vehicle)
        this.formNuevoTrabajo.get('vehicleBrand')?.setValue(this.vehicleBrand)
        this.formNuevoTrabajo.get('plate')?.setValue(this.plate)
        this.formNuevoTrabajo.get('user')?.setValue(this.numberDocument)
        this.formNuevoTrabajo.get('name')?.setValue(this.name)
        let dataForm: {}
        dataForm = this.formNuevoTrabajo.value;
        this.dataService.createJobs(dataForm).subscribe()
        let status = "success";
        this.notificationSuccess(status)
        this.formNuevoTrabajo.reset()
        console.log("Desde el formulario", this.formNuevoTrabajo.value);
      }

      this.isLoading = false
    }, 2000);


  }

  /**
  * La función `notificationError` crea una notificación con un mensaje de error.
  * @param {string} type - El tipo de notificación a mostrar. Puede ser 'success', 'información',
  * 'advertencia' o 'error'.
  */
    notificationError(type: string): void {
      this.notification.create(
        type,
        'Error',
        'No se pudo enviar los datos 😧'
      );
    }

    notificationSuccess(type: string): void {
      this.notification.create(
        type,
        'Excelente',
        'Trabajo creado con exito 😀'
      );
    }
}
