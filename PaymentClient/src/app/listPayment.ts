import { ListPaymentRequest } from './listrequest';
import { ListPaymentResponse, Payment } from './listresponse';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ListPaymentReq, ListPayment } from './Models/ListPaymentRequest';
import { ListPaymentRes } from './Models/ListPaymentResponse';
import { Observable } from 'rxjs/Rx';

export abstract class ListPaymentLogic {

    abstract List(Req: ListPaymentRequest): Observable<ListPaymentResponse>;
    abstract ListPayment(Req: ListPaymentReq): Observable<ListPaymentRes>
}

@Injectable()
export class ListLogic extends ListPaymentLogic {

    constructor(private _http: Http) {
        super();
    }

    private handleError(error: Response) {
        console.error('An error occurred', error);
        return Observable.throw(error.json().error || 'Server error');
    }

    List(Req: ListPaymentRequest): Observable<ListPaymentResponse> {
        let url = "http://y34897:8080/payment/payment/list";
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this._http
            .post(url, Req, options)
            .map((response: Response) => <ListPaymentResponse>response.json())
            .do(data => console.log('All : ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    ListPayment(Req: ListPaymentReq): Observable<ListPaymentRes> {
        let reqinput = new ListPayment(Req);
        let url = "http://y01313:80/payment/payment/list";
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this._http
            .post(url, reqinput, options)
            .map((response: Response) => <ListPaymentRes>response.json())
            .do(data => console.log('All : ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

}