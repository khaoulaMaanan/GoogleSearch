import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetPasswordComponent } from './resetPassword.component';
import { SearchComponent } from './search.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base'
    },
    children: [
      {
        path: '',
        redirectTo: 'cards'
      },
      {
        path: 'cards',
        component: ResetPasswordComponent,
        data: {
          title: 'Cards'
        }
      },
      {
        path: 'forms',
        component: SearchComponent,
        data: {
          title: 'Forms'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
