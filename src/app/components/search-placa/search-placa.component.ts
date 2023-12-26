import { Component, Input, Output, OnInit, EventEmitter, inject } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { FormsModule } from '@angular/forms';
import { DatosClientesService } from '../../services/datos-clientes.service';


@Component({
  selector: 'app-search-placa',
  standalone: true,
  imports: [NgZorroModule, FormsModule],
  templateUrl: './search-placa.component.html',
  styleUrl: './search-placa.component.css'
})
export class SearchPlacaComponent implements OnInit {


  public    searchValue = '';
  public    visible = false;
  @Input()  Data: any[] = [] || undefined;
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
    this.Data = this.Data.filter((item: any) => item.plate.indexOf(this.searchValue.toUpperCase()) !== -1);
    this.ResultadoBuscador.emit(this.Data)
  }

}
