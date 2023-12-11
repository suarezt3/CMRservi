import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzTableModule,
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    NzPaginationModule
  ],
  exports: [
    NzTableModule,
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    NzPaginationModule
  ]
})
export class NgZorroModule { }
