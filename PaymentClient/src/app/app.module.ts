import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { PaymentFormComponent } from './paymentform.component';
import { PaymentListComponent} from './paymentlist.component';
import { AppComponent } from './app.component';
import { CreatePaymentLogic, PaymentLogic } from './sendpayment';
import { Req } from './request';
import { Res } from './response';
import { ListPaymentResponse, Payments } from './listresponse';
import { ListLogic, ListPaymentLogic } from './listpayment';
import { ListPaymentRequest } from './listrequest';
import { ApprovePayLogic, ApprovePayment} from './Approve.service';
import { TransferInternal, Account } from './TransferInternal';

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, 
              RouterModule.forRoot([
                { path: 'CreatePayment', component: PaymentFormComponent },
                { path: 'ListPayment', component: PaymentListComponent },
                { path: 'Transfer', component: TransferInternal },
                { path: '', component: PaymentFormComponent }], { useHash: true })],  
	declarations: [AppComponent, PaymentFormComponent, PaymentListComponent, TransferInternal],
	bootstrap: [AppComponent ],
    providers: [{ provide: PaymentLogic, useClass: CreatePaymentLogic },
                { provide: ListPaymentLogic, useClass: ListLogic },
                { provide: ApprovePayment, useClass: ApprovePayLogic }]
})
export class AppModule { }
