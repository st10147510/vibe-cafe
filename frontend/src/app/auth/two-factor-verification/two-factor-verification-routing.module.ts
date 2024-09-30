import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TwoFactorVerificationPage } from './two-factor-verification.page';

const routes: Routes = [
  {
    path: '',
    component: TwoFactorVerificationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TwoFactorVerificationPageRoutingModule {}
