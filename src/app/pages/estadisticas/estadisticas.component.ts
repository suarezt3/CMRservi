import { Component, OnInit, inject } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from '../../../assets/dumy';
import { DatosClientesService } from '../../services/datos-clientes.service';
import { Trabajo } from '../../interfaces/trabajos';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { BRANDS } from '../../interfaces/marcas-vehiculos';


@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [NgxChartsModule, ReactiveFormsModule, FormsModule, NgZorroModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent implements OnInit {

  public formFilter!: FormGroup;
  public trabajos: Trabajo[] = [] || undefined;
  public brands: BRANDS[] = [] || undefined;
  public typeJobs: any[] = [] || undefined;
  public mode = 'date';

  public single!: any[];
  public multi!: any[];
  public dataT!: any[];
  public count!: any;

  private fb                   = inject(FormBuilder);
  private DatosClientesService = inject( DatosClientesService );


  public dumyDATA = [
    {
      "name": "Suzuki",
      "value": 10
    }
  ]

  public view: any = [700, 400];

   // options
   showXAxis = true;
   showYAxis = true;
   gradient = false;
   showLegend = true;
   showXAxisLabel = true;
   xAxisLabel = 'Paises';
   showYAxisLabel = true;
   yAxisLabel = 'Poblacion';

   colorScheme: any = {
     domain: ['#bbd0ff', '#90e0ef', '#0077b6', '#AAAAAA']
   };



   constructor() {}


  ngOnInit(): void {

    this.formFilter = this.fb.group({
      typeJobs: ['', ],
      vehicleBrand: ['', ],
      date: ['', ],
    })

      /**
       * Trae todas la marcas de autos
       */
      this.DatosClientesService.getBrandVehicles().subscribe((resp: any) => {
        console.log("RESPUESTA", resp);
        this.brands = resp
      })

      this.DatosClientesService.getTypeJobs().subscribe((resp) => {
        this.typeJobs = resp
      });

    this.DatosClientesService.getJobs().subscribe((resp: any) => {
      console.log("TRABAJOS", resp);
      this.trabajos = resp



      this.dataT = this.trabajos.map(jobs => ({
        "name": jobs?.vehicleBrand || "",
        "value": jobs?.vehicleBrand?.length || ""
      }))
      Object.assign(this, {single})
    })
  }

  onSelect(event: any) {
    console.log(event);
  }

  onSubmit() {

  }

}
