import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TwoFactorVerificationPageRoutingModule } from './two-factor-verification-routing.module';

import { TwoFactorVerificationPage } from './two-factor-verification.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TwoFactorVerificationPageRoutingModule
  ],
  declarations: [TwoFactorVerificationPage]
})
export class TwoFactorVerificationPageModule {}
