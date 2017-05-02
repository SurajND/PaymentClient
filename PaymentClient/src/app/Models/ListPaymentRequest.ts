export class ListPaymentReq {
    constructor(public LSID: string,
        public UserID: string,
        public AgreementNumber: string,        
        public FromDate: string,
        public ToDate: string) { }
}

export class ListPayment {
    constructor(public request: ListPaymentReq) { }
}
