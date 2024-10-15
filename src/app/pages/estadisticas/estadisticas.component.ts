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
  public trabajos: Trabajo[] = [];
  public brands: BRANDS[] = [];
  public typeJobs: any[] = [];
  public mode = 'date';

  public single!: any[];
  public multi!: any[];
  public dataT!: any[];
  public dataFiltered!: any[];

  public resultFiltered: any[] = [];


 public filtros: any[] = [];

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
   xAxisLabel = 'Tipo de Trabajo';
   showYAxisLabel = true;
   yAxisLabel = 'Cantidad de Trabajos';

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
    })
  }

  onSelect(event: any) {
    console.log(event);
  }

  onSubmit() {

   let vehicleBrand     = this.formFilter.get('vehicleBrand')?.value;
   let typeJobs         = this.formFilter.get('typeJobs')?.value;
   let  date             = this.formFilter.get('date')?.value;
   console.log(vehicleBrand, typeJobs, date);


    this.DatosClientesService.getFilterJobs(vehicleBrand, typeJobs).subscribe((resp: any) => {
        console.log("FILTRO", resp);

        this.resultFiltered = resp;

        const filtro = [
          {
            name: typeJobs,
            value: resp.length
          }
        ]

        this.filtros = filtro;


        const transformedArray = resp.map((item: any) => ({
          vehicleBrand: item.vehicleBrand,
          typeJobs: item.typeJobs,
          count : resp.length
      }));

      console.log("ARRAY NEW",transformedArray);
  })

 }
}
