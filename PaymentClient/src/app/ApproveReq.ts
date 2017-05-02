export class ApproveRequest
    {
        AFTLNR : string;
        BRGNR : string;
        LANDEKODE : string;
        SPROG : string;
        BULKREFC : string;
        INTEKSTBRUGER : string;
        LDKD_BRUGER : string;
        SPKD_BRUGER : string;
        TZID_BRUGER : string;
        KT_DROPDOWN_SPECIEL : string;
        RATEEXPIRYTIMESTAMP : string;
        RATECNTROLTIMESTAMP : string;
        Payments : ApprovePaymentList;
    }

    export class ApprovePaymentList
    {
        public PaymentRow : Array<PaymentRow>;
    }

    export class PaymentRow
    {
        RFNRAR : string;
        LAESTIMESTAMP : string;
        BTTY : string;
        TILIDENT : string;
        BELOEB : string;
        AntalDec : number;
        VALUTAKODE : string;
    }