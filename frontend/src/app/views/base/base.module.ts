// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ResetPasswordComponent } from './resetPassword.component';

// Forms Component
import { SearchComponent } from './search.component';

// Components Routing
import { BaseRoutingModule } from './base-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BaseRoutingModule
  ],
  declarations: [
    ResetPasswordComponent,
    SearchComponent
  ]
})
export class BaseModule { }
