export class ListPaymentResponse {
    constructor(public MoreRows:string,
                public LastRowRepos: string,
                public NumberOfPayments: string,
                public Returkode: string,
                public StatusCode: string,
                public ReasonCode: string,
                public Returtekst: string,
                public payments: Payments) { } 
}

export class Payments {
    constructor(public paymentRow: Payment[]) { }
}

export class Payment {
    constructor(public txoAmount: string,
                public txoCurrency: string,
                public txoEkspDt: string,
                public txoAfsKto: string,
                public txoPosttxt: string,
                public txoTilNvn: string,
                public txoTilKto: string,
                public txoBTTY: string,
                public txoBTTYTT: string,
                public icoBTST: string,
                public txoBTST: string,
                public txoBTSTTT: string,
                public txoFee: string,
                public txhRfnrar: string,
                public txhOprettid: string,
                public txoDecimals: string,
                public paymentTypeValue: string,
                public paymentStatusValue: string,
                public selected : boolean){}
    }
