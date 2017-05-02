export class ListPaymentRes {
    constructor(public moreRows:string,
                public lastRowRepos: string,
                public numberOfPayments: string,
                public returkode: string,
                public statusCode: string,
                public reasonCode: string,
                public returtekst: string,
                public payments: Payments) { } 
}

export class Payments {
    constructor(public paymentRow: Payment[]) { }
}

export class Payment {
    constructor(public amount: string,
                public currency: string,
                public approvalDate: string,
                public beneficiaryName: string,
                public beneficiaryText: string,
                public creditorName: string,
                public toAccount: string,
                public paymentType: string,
                public bttytt: string,
                public iBTST: string,
                public tBTST: string,
                public btsttt: string,
                public fee: string,
                public referenceNumber: string,
                public creationId : string,
                public decimalsPlace: string,
                public paymentTypeValue: string,
                public paymentStatusValue: string,
                public selected : boolean){}
    }
