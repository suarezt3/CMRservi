import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorPlateService } from '../../services/plate.service';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { DatosClientesService } from '../../services/datos-clientes.service';


@Component({
  selector: 'app-formulario-nuevo-cliente',
  standalone: true,
  imports: [NgZorroModule, ReactiveFormsModule, FormsModule,],
  templateUrl: './formulario-nuevo-cliente.component.html',
  styleUrl: './formulario-nuevo-cliente.component.css'
})
export class FormularioNuevoClienteComponent implements OnInit {


  public formNuevoCliente!: FormGroup;
  public tiposDocumentos!: any[]
  public limitNumber      : string  = "^([0-9]+)$";


  private fb                    = inject(FormBuilder)
  private validatorPlateService = inject(ValidatorPlateService)
  private dataService           = inject(DatosClientesService)

  ngOnInit() {

    this.dataService.getTypeDocuments().subscribe((documento) => {
      this.tiposDocumentos = documento
    })

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


  envioFormulario() {

  }

}
