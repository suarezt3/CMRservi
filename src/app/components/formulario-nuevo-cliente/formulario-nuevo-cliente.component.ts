import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorPlateService } from '../../services/plate.service';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { DatosClientesService } from '../../services/datos-clientes.service';
import { BRANDS } from '../../interfaces/marcas-vehiculos';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';



@Component({
  selector: 'app-formulario-nuevo-cliente',
  standalone: true,
  imports: [NgZorroModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './formulario-nuevo-cliente.component.html',
  styleUrl: './formulario-nuevo-cliente.component.css'
})
export class FormularioNuevoClienteComponent implements OnInit {

  public id: any;
  public formNuevoCliente!: FormGroup;
  public tiposDocumentos!: any[]
  public brands!: BRANDS[];
  public limitNumber      : string  = "^([0-9]+)$";


  private fb                    = inject(FormBuilder);
  private validatorPlateService = inject(ValidatorPlateService);
  private dataService           = inject(DatosClientesService);
  private router                = inject(Router);
  private activatedRoute        = inject(ActivatedRoute);
  private notification          = inject(NzNotificationService)

  constructor() {this.obtenerParametroUrl()}

  ngOnInit() {

    this.dataService.getTypeDocuments().subscribe((documento) => {
      this.tiposDocumentos = documento
    })

    this.dataService.getBrandVehicles().subscribe((marcas: any) => {
      this.brands = marcas
    })
    this.activatedRoute.params.subscribe(({ id }) => this.id = id) // Tomar el ID del cliente

    this.formNuevoCliente = this.fb.group({
      name           : ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      documentType   : ['', [Validators.required]],
      numberDocument : [  , [Validators.pattern(this.limitNumber)]],
      email          : ['', [Validators.email]],
      phone          : ['', [Validators.pattern(this.limitNumber)]],
      vehicle        : ['', [Validators.required, Validators.maxLength(20)]],
      vehicleBrand   : ['', [Validators.required]],
      plate          : [''.toUpperCase(), [Validators.required, Validators.minLength(6), Validators.maxLength(6)], [this.validatorPlateService ]]
    })

  }

  obtenerParametroUrl() {
    this.activatedRoute.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
      if (this.id) {
        this.dataService.getClientPlate(this.id).subscribe((res: any) => {
          console.log("RESPUESTA", res);

           this.formNuevoCliente.patchValue({
             name: res[0]?.name,
             documentType: res[0]?.documentType,
             phone: res[0]?.phone,
             vehicle: res[0]?.vehicle,
             numberDocument: res[0]?.numberDocument,
             email: res[0]?.email,
             vehicleBrand: res[0]?.vehicleBrand,
             plate: res[0]?.plate
           });
        });
      }
    });
  }


   /**
   *
   * Para validar los campos del formulario
   * @returns
   */
   invalidField( field: string ) {
    return this.formNuevoCliente.get(field)?.invalid
            && this.formNuevoCliente.get(field)?.touched;
  }


  /**
   * Metodo para enviar el formulario
   */
  envioFormulario() {
    const form = [{
      name             : this.formNuevoCliente.get('name')?.value,
      documentType     : this.formNuevoCliente.get('documentType')?.value,
      numberDocument   : this.formNuevoCliente.get('numberDocument')?.value,
      email            : this.formNuevoCliente.get('email')?.value,
      phone            : this.formNuevoCliente.get('phone')?.value,
      vehicle          : this.formNuevoCliente.get('vehicle')?.value,
      vehicleBrand     : this.formNuevoCliente.get('vehicleBrand')?.value,
      plate            : this.formNuevoCliente.get('plate')?.value.toUpperCase()
    }];

   if(this.formNuevoCliente.invalid && !this.id) {
     this.formNuevoCliente.markAllAsTouched();
     let status = "error"
      this.notifications(status)
   }else if(!this.id) {
     this.dataService.createClient(form).subscribe()
     let status = "success"
     this.notifications(status)
     this.formNuevoCliente.reset()
     }else{
       this.formNuevoCliente.get('plate')?.setAsyncValidators(null)
       this.formNuevoCliente.get('plate')?.disable
       let editForm = this.formNuevoCliente.value
       this.dataService.editClientDocument(this.id, editForm).subscribe();
       let status = "success"
       this.notifications(status)
       setTimeout(() => {
         this.router.navigate(['/clientes']);
       },2000)
     }
  }


  notifications(type: string): void {
    if(type === "success"){
      this.notification.create(
        type,
        'Envió exitoso',
        'El cliente se ha creado satisfactoriamente.'
      );
    }else if(type === "error" ) {
      this.notification.create(
        type,
        'Algo no está bien',
        'Por favor revisa que el formulario no tenga errores.'
      );
    }
  }


}
