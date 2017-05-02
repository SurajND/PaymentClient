export class PaymentReq {

	constructor(public AgreementNumber: string, public UserID: string, public FromAccount: string,
		public InternalAccount : string, public ToAccount: string, public Amount: string, public LSID : string, 
        public PaymentType: string,public TextType: string,public BeneficiaryType: string,public InPaymentType: string,
        public PaymentID: string,public CreditorAccount: string,public CreditorName: string,public CreditorAddress: string,
        public CreditorPostNr: string,public CreditorByName: string, public BeneficiaryMessage : string,
        public CreditorNumber: string) { }
} 
export class MakePayment {

	constructor(public request: PaymentReq) { }
} 