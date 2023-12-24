import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { DatosClientesService } from '../../services/datos-clientes.service';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-vehiculo',
  standalone: true,
  imports: [ NgZorroModule, FormsModule ],
  templateUrl: './search-vehiculo.component.html',
  styleUrl: './search-vehiculo.component.css'
})
export class SearchVehiculoComponent {


  public    searchValue = '';
  public    visible = false;
  @Input()  Data: any;
  @Output() ResultadoBuscador = new EventEmitter();

  private DatosClientesService = inject( DatosClientesService )


  ngOnInit(): void {

  }


  reset(): void {
    this.searchValue = '';
    this.search();
    this.DatosClientesService.getClientes().subscribe((resp: any) => {
      this.Data = resp
      this.ResultadoBuscador.emit(this.Data)
    });
  }

  search(): void {
    this.visible = false;
    this.Data = this.Data.filter((item: any) => item.vehicleBrand.indexOf(this.searchValue) !== -1);
    this.ResultadoBuscador.emit(this.Data)
  }

}
