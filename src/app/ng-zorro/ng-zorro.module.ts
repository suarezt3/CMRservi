import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzTableModule,
    NzDropDownModule,
    NzIconModule
  ],
  exports: [
    NzTableModule,
    NzDropDownModule,
    NzIconModule
  ]
})
export class NgZorroModule { }
