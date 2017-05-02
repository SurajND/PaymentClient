import { ApproveRequest } from './ApproveReq';
import { ApproveResponse } from './ApproveRes';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import 'rxjs';
import { Observable } from 'rxjs/Rx';
import { ApproveReq, Approve } from './Models/ApproveReq';

export abstract class ApprovePayment {

	abstract Approve(Pay: ApproveRequest): Observable<ApproveResponse>;	
	abstract ApprovePayment(Pay: ApproveReq): Observable<ApproveResponse>

}

@Injectable()
export class ApprovePayLogic extends ApprovePayment {

	constructor(private _http: Http) {
		super();
	}

	private handleError(error: Response) {
		console.error('An error occurred', error);
		return Observable.throw(error.json().error || 'Server error');
	}

	Approve(Pay: ApproveRequest): Observable<ApproveResponse> {
		console.log(JSON.stringify(Pay));
        let url = "http://y34897:8080/payment/payment/approve";
		//let url = "http://localhost:50608/api/ApprovePayment";
		let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
		let options = new RequestOptions({ headers: headers }); // Create a request option
		return this._http
			.post(url, Pay, options)
			.map((response: Response) => <ApproveResponse>response.json())
			.do(data => console.log('All : ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

	ApprovePayment(Pay: ApproveReq): Observable<ApproveResponse> {
		let payinput = new Approve(Pay);
		console.log(JSON.stringify(Pay));
        let url = "http://y01313:80/payment/payment/approve";
		let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
		let options = new RequestOptions({ headers: headers }); // Create a request option
		return this._http
			.post(url, payinput, options)
			.map((response: Response) => <ApproveResponse>response.json())
			.do(data => console.log('All : ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

}