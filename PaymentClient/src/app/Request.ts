export class Req {

	constructor(public UserId: string, public AgreementID: string, public FromAccount: string,
		public ToAccount: string, public Amount: string, public PaymentType: string,
		public BeneficiaryType : string) { }
} 