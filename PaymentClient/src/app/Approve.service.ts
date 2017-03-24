import { ApproveRequesst } from './ApproveReq';
import { ApproveResponse } from './ApproveRes';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
//import 'rxjs';
import { Observable } from 'rxjs/Rx';

export abstract class ApprovePayment {

	abstract Approve(Pay: ApproveRequesst): Observable<ApproveResponse>;	

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

	Approve(Pay: ApproveRequesst): Observable<ApproveResponse> {
        let url = "http://localhost:50608/api/Approve";
		let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
		let options = new RequestOptions({ headers: headers }); // Create a request option
		return this._http
			.post(url, Pay, options)
			.map((response: Response) => <ApproveResponse>response.json())
			.do(data => console.log('All : ' + JSON.stringify(data)))
			.catch(this.handleError);
	}

}