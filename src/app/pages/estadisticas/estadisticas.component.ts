import { Component, OnInit, inject } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from '../../../assets/dumy';
import { DatosClientesService } from '../../services/datos-clientes.service';
import { Trabajo } from '../../interfaces/trabajos';


@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent implements OnInit {

  public trabajos: Trabajo[] = [] || undefined

  public single!: any[];
  public multi!: any[];
  public dataT!: any[];
  public count!: any


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

   private DatosClientesService = inject( DatosClientesService );


   constructor() {


  }


  ngOnInit(): void {
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

}
