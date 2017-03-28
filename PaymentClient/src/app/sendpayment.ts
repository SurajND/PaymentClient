import { Req } from './request';
import { Res } from './response';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SalaryPayment } from './SalaryPayment';
//import 'rxjs';
import { Observable } from 'rxjs/Rx';

export abstract class PaymentLogic {

	abstract Create(Pay: Req): Observable<Res>;	
	abstract SalaryCreate(Pay : SalaryPayment) : Observable<Res>;
}

@Injectable()
export class CreatePaymentLogic extends PaymentLogic {
    
	public beneficiaryDd : boolean;
	constructor(private _http: Http) {
		super();
	}

	private handleError(error: Response) {
		console.error('An error occurred', error);
		return Observable.throw(error.json().error || 'Server error');
	}

	Create(Pay: Req): Observable<Res> {
        let url = "http://localhost:63977/api/AccountPaymentService";
		let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
		let options = new RequestOptions({ headers: headers }); // Create a request option
		return this._http
			.post(url, Pay, options)
			.map((response: Response) => <Res>response.json())
			.do(data => console.log('All : ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	beneficiary(ptype : string) : void{
		if(ptype = 'BKT'){
			this.beneficiaryDd = true;
		}
		else{
			this.beneficiaryDd = false;
		}
	} 

	SalaryCreate(Pay: SalaryPayment): Observable<Res> {
        let url = "http://localhost:63977/api/SalaryService";
		let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
		let options = new RequestOptions({ headers: headers }); // Create a request option
		return this._http
			.post(url, Pay, options)
			.map((response: Response) => <Res>response.json())
			.do(data => console.log('All : ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

}