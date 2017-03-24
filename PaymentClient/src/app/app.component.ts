import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PaymentFormComponent } from './paymentform.component'

import { CreatePaymentLogic, PaymentLogic } from './sendpayment';
import { Req } from './request';
import { Res } from './response';

@Component({
	moduleId: module.id,
	selector: 'my-app',
	templateUrl: './app.component.html',
})
export class AppComponent { }
