import { Component, EventEmitter, Output } from '@angular/core';
import { ListPaymentRequest } from './listrequest';
import { ListPaymentResponse, Payment, Payments } from './listresponse';
import { ListLogic, ListPaymentLogic } from './listpayment';
import { ApprovePayment} from './Approve.service';
import { ApproveRequesst,ApprovePaymentList, PaymentRow} from './ApproveReq';
import { ApproveResponse } from './ApproveRes';

@Component({

    moduleId: module.id,
    selector: 'list-payment',
    templateUrl: './PaymentList.component.html'
})

export class PaymentListComponent {
    result: ListPaymentResponse;
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

        //const [first, second, third] = fdate.toString().split("-");
        //fdate = first + second + third;
        //const [first1, second1, third1] = tdate.toString().split("-");
        //tdate = first1 + second1 + third1;
        this.Alert = false;
        let r: ListPaymentRequest = 
        new ListPaymentRequest('000000000000000000000000',
            uid,
            agrno,
            'N',
            'DK',
            'EN',
            ' ',
            ' ',
            ' ',
            '7DAG',
            'Q',
            'MANGLG    ',
            fdate,
            tdate,
            ' ',
            ' ',
            '00000000000000',
            '0',
            0,
            0,
            0,
            0,
            'DKK',
            uid,
            ' ',
            ' ',
            ' ',
            '00000000000000000000000000000000000000000000000000',
            ' ',
            ptype,
            ' ',
            'BET',
            ' ',
            '0',
            '0');
        this.LisLogic.List(r).subscribe((r) => {
            this.result = r;
            this.paymentresult = this.result.payments.paymentrow;
            console.log(this.result);
            
                this.Show = true;
            
        }, error => this.error = <any>error);

        
    }

    pad(num:string, size:number): string {
        var s = num;
        while (s.length < size) s = "0" + s;
        return s;
    }

    Approve() {
        //this.Alert = true;
        let i : number = 0;
        let req : ApproveRequesst = new ApproveRequesst();
        req.payments = new ApprovePaymentList();
        req.payments.paymentRow = new Array<PaymentRow>();
        req.AFTLNR = '0F2714';
        req.BRGNR = '5G7283';
        req.BULKREFC = '';
        req.INTEKSTBRUGER = 'E';
        req.KT_DROPDOWN_SPECIEL = '';
        req.LANDEKODE = 'DK';
        req.LDKD_BRUGER = 'DK';
        req.RATECNTROLTIMESTAMP = '';
        req.RATEEXPIRYTIMESTAMP = '';
        req.SPKD_BRUGER = 'DA';
        req.SPROG = 'EN';
        req.TZID_BRUGER = '3923';

        this.paymentresult.forEach(pay => {
            if(pay.selected == true)
            {                
                let pr : PaymentRow = new PaymentRow();
                pr.RFNRAR = pay.txhRfnrar.substr(3,10);
                pr.AntalDec = 2;                
                pr.BELOEB = this.pad(pay.txoAmount.replace(",",""),15);
                pr.BELOEB = "000000000000" + pay.txoAmount.replace(",","");
                pr.BTTY = pay.paymentTypeValue.replace(" ","");
                pr.LAESTIMESTAMP = pay.txhOprettid;
                pr.TILIDENT = pay.txoTilKto.replace(" ","").trim();
                pr.VALUTAKODE = pay.txoCurrency;
                //console.log(pr);
                req.payments.paymentRow.push(pr);
                i = i + 1;
            }
        });
        //console.log(this.aprPay);
        //req.payments.paymentRow = this.aprPay;
        console.log(req);
        this.appPay.Approve(req)
        .subscribe(can => {      
         console.log(this.res);
        },error => this.error = <any>error);


        //start
        let r: ListPaymentRequest = 
        new ListPaymentRequest('000000000000000000000000',
            '5G7283',
            '0F2714',
            'N',
            'DK',
            'EN',
            ' ',
            ' ',
            ' ',
            '7DAG',
            'Q',
            'MANGLG    ',
            '20170313',
            '20170313',
            ' ',
            ' ',
            '00000000000000',
            '0',
            0,
            0,
            0,
            0,
            'DKK',
            '5G7283',
            ' ',
            ' ',
            ' ',
            '00000000000000000000000000000000000000000000000000',
            ' ',
            'ALL',
            ' ',
            'BET',
            ' ',
            '0',
            '0');
        this.LisLogic.List(r).subscribe((r) => {
            this.result = r;
            this.paymentresult = this.result.payments.paymentrow;
            console.log(this.result);
            
                this.Show = true;
            
        }, error => this.error = <any>error);
        //stop

    }
}