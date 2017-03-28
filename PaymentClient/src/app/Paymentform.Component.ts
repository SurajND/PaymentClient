import { Component, EventEmitter, Output } from '@angular/core';
import { Req } from './request';
import { Res } from './response';
import { CreatePaymentLogic,PaymentLogic } from './sendpayment';
import { SalaryPayment } from './SalaryPayment';

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

	pad(num:string, size:number): string {
        var s = num;
        while (s.length < size) s = "0" + s;
        return s;
    }
	
	CreateP(uid: string, agrno: string, faccount: string, taccount: string, amount: string, ptype: string, btype: string): void {
		if(ptype == "BKT") {
			let d: Req = new Req(uid,agrno,faccount,taccount,amount,ptype,btype);			
			this.PayLogic.Create(d).subscribe((r) => {
				this.out = r;
				this.result = this.out.Returtekst;
				this.Show = true;
				console.log(this.result); 
			}, error => this.error = <any>error);
		}
		else if(ptype == "BKL")
		{
			let d: SalaryPayment = new SalaryPayment('',agrno, uid, 'DA','DK' ,'E','DK','DK',
			'3923','','0', faccount, '0','','', '','','','','','0000', faccount,'',taccount,'', this.pad(amount.replace(",",""),15), 'DKK','','0','DABA', 'O23YVQD5IKDJK26L3443FJO5', ptype,
			'0','0','0','0','1','0','0','Salary','0','0','0','0');
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