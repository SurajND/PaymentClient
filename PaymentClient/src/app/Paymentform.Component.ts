import { Component, EventEmitter, Output } from '@angular/core';
import { Req } from './request';
import { Res } from './response';
import { CreatePaymentLogic,PaymentLogic } from './sendpayment';
import { SalaryPayment } from './SalaryPayment';
import { PayForm } from './PayForm';
import { PaymentReq } from './Models/PaymentReq';

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
	benDd:boolean = false;
	code : boolean = false;
	pay : PayForm;

	constructor(private PayLogic: PaymentLogic) {
		this.pay = new PayForm();
	}

	pad(num:string, size:number): string {
        var s = num;
        while (s.length < size) s = "0" + s;
        return s;
    }
	
	CreateP(uid: string, agrno: string, faccount: string, amount: string, 
	ptype: string,kortart : string,ikdent : string, ibkreditor : string,
	afsname : string, address : string,postnr : string, byname : string, afslandkode : string,
	modtagtext : string,krednr : string, rfnrar : string): void {		
			let btty : string;
			if (ptype == "BKT"){
				btty = "Account transfer";								
			}
			else{
				btty = "Salary";
				this.pay.btype = "";
			}	
			let d : PaymentReq = new PaymentReq(agrno,uid,faccount,faccount,
			this.pay.toaccount,this.pad(amount.replace(",",""),15),
			'O23YVQD5IKDJK26L3443FJO5',ptype,btty,
			this.pay.btype,this.pay.kortart,
			this.pay.ikdent,this.pay.ibkreditor,afsname,address,postnr,byname,this.pay.modtagtext,krednr);	

			this.PayLogic.MakePayment(d).subscribe((r) => {
				this.out = r;
				this.result = "Payment has been made with reference number : " + this.out.returtekst;
				this.Show = true;
				console.log(this.result); 
			}, error => this.error = <any>error);		
	}

	CreateMore(): void {
		this.Show = false;
	}

	BenType(ptype : string):void{
		if (ptype == 'BKT'){
			this.benDd = true;
			this.code = false;
		}
		else if(ptype == 'BKL'){
			this.benDd = false;
			this.code = false;
		}
		else{
			this.benDd = false;
			this.code = true;
		}
	}
}