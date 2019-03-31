// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { UsersComponent } from './users.component';

// Components Routing
import { AdministrationRoutingModule } from './administration-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdministrationRoutingModule
  ],
  declarations: [
    UsersComponent
  ]
})
export class AdministrationModule { }
