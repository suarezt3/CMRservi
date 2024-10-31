import { Component, OnInit, inject } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { DatosClientesService } from '../../services/datos-clientes.service';
import { Trabajo } from '../../interfaces/trabajos';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-tabla-trabajos',
  standalone: true,
  imports: [NgZorroModule, CommonModule, ReactiveFormsModule],
  templateUrl: './tabla-trabajos.component.html',
  styleUrl: './tabla-trabajos.component.css'
})

export class TablaTrabajosComponent implements OnInit {

  public trabajos: Trabajo[] = [] || undefined
  public brands: any[] = [] || undefined
  public typeJobs: any[] = [] || undefined
  public formFilter!: FormGroup;


  private DatosClientesService = inject( DatosClientesService );
  private message = inject(NzMessageService)
  private fb = inject(FormBuilder)


  ngOnInit() {

    this.formFilter = this.fb.group({
      typeJobs: ['', [Validators.required] ],
      vehicleBrand: ['', [Validators.required] ],
    })


    this.DatosClientesService.getJobs().subscribe((resp: any) => {
      console.log("TRABAJOS", resp);
      this.trabajos = resp
    })

    this.DatosClientesService.getBrandVehicles().subscribe((resp: any) => {
      console.log("RESPUESTA", resp);
      this.brands = resp
    })

    this.DatosClientesService.getTypeJobs().subscribe((resp) => {
      this.typeJobs = resp
    });


  }

  invalidField( field: string ) {
    return this.formFilter.get(field)?.invalid
            && this.formFilter.get(field)?.touched;
  }


  enviar() {
    let vehicleBrand     = this.formFilter.get('vehicleBrand')?.value;
    let typeJobs         = this.formFilter.get('typeJobs')?.value;
     this.DatosClientesService.getFilterJobs(vehicleBrand, typeJobs).subscribe((resp: any) => {

      if(resp.length == 0){
        this.createMessage()
        return;
      }else{
        this.trabajos = resp;
      }
     })

  }

  reload () {
    this.DatosClientesService.getJobs().subscribe((resp: any) => {
      console.log("TRABAJOS", resp);
      this.trabajos = resp
    })
  }

  createMessage(): void {
    let type = "error"
    this.message.create(type, `No existen trabajos con esta busqueda`);
  }

}
