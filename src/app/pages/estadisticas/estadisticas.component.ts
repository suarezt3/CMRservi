import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { single } from '../../../assets/dumy';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent {

  public single!: any[];
  public multi!: any[];

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
     domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
   };

   constructor() {
    Object.assign(this, { single })
  }

  onSelect(event: any) {
    console.log(event);
  }

}
