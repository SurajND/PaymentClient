export class ApproveReq
    {
        AgreementNumber : string;
        UserID : string;        
        Payments : ApprovePaymentList;
    }

    export class ApprovePaymentList
    {
        public PaymentRow : Array<PaymentRow>;
    }

    export class PaymentRow
    {
        ReferenceNumber : string;
        TimeStamp : string;
        PaymentType : string;
        InternalReference : string;
        Amount : string;
        NumberOfDecimals : number;
        Currency : string;
    }

    export class Approve
    {        
        constructor(public request:ApproveReq){}
    }