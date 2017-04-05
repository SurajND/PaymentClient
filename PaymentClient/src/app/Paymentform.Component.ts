import { Component, EventEmitter, Output } from '@angular/core';
import { Req } from './request';
import { Res } from './response';
import { CreatePaymentLogic,PaymentLogic } from './sendpayment';
import { SalaryPayment } from './SalaryPayment';
import { PayForm } from './PayForm';

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
	dis:boolean = false;

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
			let d: SalaryPayment = new SalaryPayment('',agrno, uid, 'DA','DK' ,'E','DK','DA',
			'3923','','0', faccount, '0','','', '','','','','','0000', faccount,'',this.pay.toaccount,'',
			this.pad(amount.replace(",",""),15), 'DKK','','0','DABA', 'O23YVQD5IKDJK26L3443FJO5',
			ptype,'0','0','0','0','1','0','0',btty,'0','0','0','0',this.pay.btype,this.pay.kortart,
			this.pay.ikdent,this.pay.ibkreditor,afsname,address,postnr,byname,afslandkode,
			this.pay.modtagtext,krednr,rfnrar);
			this.PayLogic.SalaryCreate(d).subscribe((r) => {
				this.out = r;
				this.result = this.out.Returtekst;
				this.Show = true;
				console.log(this.result); 
			}, error => this.error = <any>error);		
	}

	CreateMore(): void {
		this.Show = false;
	}

	Distrue(): void {		
		  this.dis = true;
	}

	Disfalse(): void {		
		  this.dis = false;
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