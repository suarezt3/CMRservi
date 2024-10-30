import { Component, OnInit, inject } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { DatosClientesService } from '../../services/datos-clientes.service';
import { Trabajo } from '../../interfaces/trabajos';
import { CommonModule } from '@angular/common';
import { SearchPlacaComponent } from '../search-placa/search-placa.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
  private fb = inject(FormBuilder)


  ngOnInit() {

    this.formFilter = this.fb.group({
      typeJobs: ['', ],
      vehicleBrand: ['', ],
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


  enviar() {
    let vehicleBrand     = this.formFilter.get('vehicleBrand')?.value;
    let typeJobs         = this.formFilter.get('typeJobs')?.value;
     this.DatosClientesService.getFilterJobs(vehicleBrand, typeJobs).subscribe((resp: any) => {
         console.log("FILTRO", resp);
         this.trabajos = resp;

     })

  }


}
