import { Component, OnInit } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';

@Component({
  selector: 'app-form-login',
  standalone: true,
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
  imports: [ NgZorroModule ]
})
export class FormLoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
