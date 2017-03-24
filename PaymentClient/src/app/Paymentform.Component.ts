import { Component, EventEmitter, Output } from '@angular/core';
import { Req } from './request';
import { Res } from './response';
import { CreatePaymentLogic,PaymentLogic } from './sendpayment';

@Component({

	moduleId: module.id,
	selector: 'create-payment',
	templateUrl: './PaymentForm.component.html'
})

export class PaymentFormComponent {
	out: Res;
	result: string;
	error: string;
	Show: boolean = false;
	constructor(private PayLogic: PaymentLogic) {

	}
	
	CreateP(uid: string, agrno: string, faccount: string, taccount: string, amount: string, ptype: string): void {
		if(ptype == "BKT") {
			let d: Req = new Req(uid, agrno, faccount, taccount, amount, ptype);
			this.PayLogic.Create(d).subscribe((r) => {
				this.out = r;
				this.result = this.out.Returtekst;
				this.Show = true;
				console.log(this.result); 
			}, error => this.error = <any>error);
		}
		else if(ptype == "BKL")
		{
			let d: Req = new Req(uid, agrno, faccount, taccount, amount, ptype);
			this.PayLogic.SalaryCreate(d).subscribe((r) => {
				this.out = r;
				this.result = this.out.Returtekst;
				this.Show = true;
				console.log(this.result); 
			}, error => this.error = <any>error);
		}
	}
	CreateMore(): void {
		this.Show = false;
	}
}