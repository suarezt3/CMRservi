import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSelectModule } from 'ng-zorro-antd/select';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzTableModule,
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    NzPaginationModule,
    NzDrawerModule,
    NzAvatarModule,
    NzTabsModule,
    NzTagModule,
    NzToolTipModule,
    NzSelectModule
  ],
  exports: [
    NzTableModule,
    NzDropDownModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    NzPaginationModule,
    NzDrawerModule,
    NzAvatarModule,
    NzTabsModule,
    NzTagModule,
    NzToolTipModule,
    NzSelectModule
  ]
})
export class NgZorroModule { }
