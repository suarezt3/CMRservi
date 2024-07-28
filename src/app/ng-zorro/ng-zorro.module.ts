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
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzNotificationModule } from 'ng-zorro-antd/notification';











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
    NzSelectModule,
    NzAlertModule,
    NzModalModule,
    NzDatePickerModule,
    NzGridModule,
    NzNotificationModule

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
    NzSelectModule,
    NzAlertModule,
    NzModalModule,
    NzDatePickerModule,
    NzGridModule,
    NzNotificationModule
  ]
})
export class NgZorroModule { }
