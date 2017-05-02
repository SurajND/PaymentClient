import { Component, EventEmitter, Output, HostListener, Attribute } from '@angular/core';
import { ListPaymentRequest } from './listrequest';
import { ListPaymentRes, Payment, Payments } from './Models/ListPaymentResponse';
import { ListLogic, ListPaymentLogic } from './listpayment';
import { SalaryPayment } from "./SalaryPayment";
import { PayForm } from "./PayForm";
import { PaymentLogic } from "./sendpayment";
import { Res } from "./response";
import { ListPaymentReq } from './Models/ListPaymentRequest';
import { PaymentReq } from './Models/PaymentReq';

@Component({

    moduleId: module.id,
    selector: 'transfer-internal',
    templateUrl: './TransferInternal.html'
})

export class TransferInternal {
    dis:boolean = false;
    result: ListPaymentRes;
    paymentresult: Payment[];
    error: string;
    acc : Account;
    pay : PayForm;
    out: Res;
    results: string;
    accounts : Account[];
        
    constructor(public LisLogic: ListPaymentLogic,
    private PayLogic: PaymentLogic){
        this.accounts = new Array<Account>(
            new Account("3361632362","","DKK","DK"),
            new Account("3258186214","","DKK","DK"),
            new Account("3258050347","","DKK","DK"),
            new Account("3191000331","","DKK","DK")
        );
        this.acc = new Account("","","","");
        this.pay = new PayForm();        
    }

    ListPayment(){         
        let dat = new Date();
        let y = dat.getFullYear();
        let m = dat.getMonth() + 1;
        let d = dat.getDate();

        let date = y.toString() + "0" + m.toString() + "0" + d.toString();
        
        let r: ListPaymentReq = new ListPaymentReq('000000000000000000000000',
        '5G7283','0F2714', date,date);
        
        this.LisLogic.ListPayment(r).subscribe((r) => {
            this.result = r;
            this.paymentresult = this.result.payments.paymentRow.reverse().slice(0,5);
            console.log(this.result);
        }, error => this.error = <any>error);
    }

    ngOnInit(){
        this.ListPayment();
    }    

    Distrue(): void {		
		  this.dis = true;
	}
    
    @HostListener("dragover", ["$event"])
    prevent(event : any){        
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;        
        event.preventDefault();
        event.stopPropagation();            
        //this.acc.fromAccount = "3361632362";
        this.acc.toAccount = target.innerHTML;
    }

    // @HostListener("drop", ["$event"])
    // Distrue(event : any): void {		
	// 	  this.dis = true;
    //       let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    //       let target: HTMLInputElement = <HTMLInputElement> eventObj.target; 
    //       this.acc.toAccount = target.innerHTML;
	// }
    Transfer(amount : string): void {		
		  this.CreateP("5G7283", "0F2714", this.acc.fromAccount.trim(),
          this.acc.toAccount.trim(), amount, 
	        "BKT","","", "",
	        "", "","", "", "",
	        "","", "");
          
          this.dis = false;
	}

    @HostListener("dragstart", ["$event"])
    drag(event : any): void{
        let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        let target: HTMLInputElement = <HTMLInputElement> eventObj.target;         
        this.acc.fromAccount = target.innerHTML;
    }

	Disfalse(): void {		
		  this.dis = false;
	}

    CreateP(uid: string, agrno: string, faccount: string, taccount : string, amount: string, 
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
			taccount,this.pad(amount.replace(",",""),15),
			'O23YVQD5IKDJK26L3443FJO5',ptype,btty,
			"ACC","",
			"","",afsname,address,postnr,byname,"",krednr);

			this.PayLogic.MakePayment(d).subscribe((r) => {
				this.out = r;
				this.results = this.out.returtekst;
                this.ListPayment();
				console.log(this.result); 
			}, error => this.error = <any>error);		
	}

    pad(num:string, size:number): string {
        var s = num;
        while (s.length < size) s = "0" + s;
        return s;
    }
}
export class Account{
    constructor(faccount: string,taccount: string,cur : string,count : string){
        this.fromAccount = faccount;
        this.toAccount = taccount;
        this.country = count;
        this.currency = cur;
    }
    fromAccount : string;
    toAccount : string;   
    currency : string;
    country : string; 
}