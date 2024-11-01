import { Component, OnInit, inject } from '@angular/core';
import { take, finalize } from 'rxjs/operators';
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
  public isLoading      : boolean = false;
  public loadingData    : boolean = false;


  private DatosClientesService = inject( DatosClientesService );
  private message = inject(NzMessageService)
  private fb = inject(FormBuilder)


  ngOnInit() {

    this.formFilter = this.fb.group({
      typeJobs: ['', [Validators.required] ],
      vehicleBrand: ['', [Validators.required] ],
    })

    this.DatosClientesService.getJobs().pipe(
      take(1),
      finalize(() => {
        this.loadingData = true;
      })
    ).subscribe({
      next: (resp: any) => {
        this.trabajos = resp;
      },
    })

    this.DatosClientesService.getBrandVehicles().subscribe((resp: any) => {
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

  reload() {
    this.isLoading = true;
    this.DatosClientesService.getJobs().pipe(
      take(1), // Asegura que la suscripción se complete después de recibir el primer valor
      finalize(() => {
        this.isLoading = false; // Esto se ejecutará tanto si la llamada es exitosa como si falla
        this.loadingData = true;
      })
    ).subscribe({
      next: (resp: any) => {
        this.trabajos = resp;
        this.formFilter.reset();
      },
      error: (error) => {
        console.error('Error al cargar los trabajos', error);
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
      }
    });
  }

  createMessage(): void {
    let type = "error"
    this.message.create(type, `No existen trabajos con esta busqueda`);
  }

}
