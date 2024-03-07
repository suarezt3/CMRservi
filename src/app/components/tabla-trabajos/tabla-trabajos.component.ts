import { Component, OnInit, inject } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { DatosClientesService } from '../../services/datos-clientes.service';
import { Trabajo } from '../../interfaces/trabajos';

@Component({
  selector: 'app-tabla-trabajos',
  standalone: true,
  imports: [NgZorroModule],
  templateUrl: './tabla-trabajos.component.html',
  styleUrl: './tabla-trabajos.component.css'
})

export class TablaTrabajosComponent implements OnInit {

  public trabajos: Trabajo[] = [] || undefined

  private DatosClientesService = inject( DatosClientesService );


  ngOnInit() {

    this.DatosClientesService.getJobs().subscribe((resp: any) => {
      console.log("TRABAJOS", resp);
      this.trabajos = resp

    })

  }



}
