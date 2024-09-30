import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';
//import { mysql2 } from 'mysql2';

import { IonicModule } from '@ionic/angular';

import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule
  ],
  declarations: [SignupPage]
})

export class SignupPageModule {

  constructor(private http: HttpClient){

  }
  getUser(){
    this.http.get('http://localhost/register.php').subscribe((response)=>{
      console.log(response);
    })
  }

}

