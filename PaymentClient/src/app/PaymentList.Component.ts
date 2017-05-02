import { Component, EventEmitter, Output } from '@angular/core';
import { ListPaymentRequest } from './listrequest';
import { ListPaymentRes, Payment, Payments } from './Models/ListPaymentResponse';
import { ListLogic, ListPaymentLogic } from './listpayment';
import { ApprovePayment} from './Approve.service';
//import { ApproveRequest,ApprovePaymentList, PaymentRow} from './ApproveReq';
import { ApproveResponse } from './ApproveRes';
import { ApproveReq,ApprovePaymentList,PaymentRow } from './Models/ApproveReq';
import { ListPaymentReq } from './Models/ListPaymentRequest';

@Component({

    moduleId: module.id,
    selector: 'list-payment',
    templateUrl: './PaymentList.component.html'
})

export class PaymentListComponent {
    result: ListPaymentRes;
    res : ApproveResponse;
    paymentresult: Payment[];
    error: string;
    Show: boolean = false;
    Alert: boolean = false;
    //req : ApproveRequesst = new ApproveRequesst();
    aprPay : Array<PaymentRow> = new Array<PaymentRow>();
    constructor(public LisLogic: ListPaymentLogic,
    public appPay : ApprovePayment) {
        //this.req.payments = new Payments();
        //this.req.payments.paymentRow = new PaymentRow();
    }

    ListP(uid: string, agrno: string, ptype: string, fdate: string, tdate: string ): void {
        console.log(fdate);
        fdate = fdate.replace("-","");        
        tdate = tdate.replace("-","");
        fdate = fdate.replace("-","");
        tdate = tdate.replace("-","");
        this.Alert = false;
        let r: ListPaymentReq = new ListPaymentReq('000000000000000000000000',uid,agrno,
        fdate,tdate);

        this.LisLogic.ListPayment(r).subscribe((r) => {
            this.result = r;
            this.paymentresult = this.result.payments.paymentRow.reverse().slice(0,8);
            console.log(this.result);
            
                this.Show = true;
            
        }, error => this.error = <any>error);
        
    }

    pad(num:string, size:number): string {
        var s = num;
        while (s.length < size) s = "0" + s;
        return s;
    }

    Approve(fdate: string, tdate: string) {       
        let i : number = 0;
        let req : ApproveReq = new ApproveReq();
        req.Payments = new ApprovePaymentList();
        req.Payments.PaymentRow = new Array<PaymentRow>();
        req.AgreementNumber = '0F2714';
        req.UserID = '5G7283';        

        this.paymentresult.forEach(pay => {
            if(pay.selected == true)
            {                
                let pr : PaymentRow = new PaymentRow();
                pr.ReferenceNumber = pay.referenceNumber.substr(3,10);
                pr.NumberOfDecimals = 2;                
                pr.Amount = this.pad(pay.amount.replace(",",""),15);           
                pr.PaymentType = pay.paymentTypeValue.replace(" ","");
                pr.TimeStamp = pay.creationId;
                pr.InternalReference = pay.toAccount.replace(" ","").trim();
                pr.Currency = pay.currency;
                req.Payments.PaymentRow.push(pr);
                i = i + 1;
            }
        });

        console.log(req);
        this.appPay.ApprovePayment(req)
        .subscribe(can => {      
         console.log(this.res);
        },error => this.error = <any>error);

        //start
        fdate = fdate.replace("-","");        
        tdate = tdate.replace("-","");
        fdate = fdate.replace("-","");
        tdate = tdate.replace("-","");
        let r: ListPaymentReq = new ListPaymentReq('000000000000000000000000','5G7283','0F2714',
        fdate,tdate);
        
        this.LisLogic.ListPayment(r).subscribe((r) => {
            this.result = r;
            this.paymentresult = this.result.payments.paymentRow.reverse().slice(0,8);
            console.log(this.result);
            
                this.Show = true;
            
        }, error => this.error = <any>error);
        //stop

    }
}