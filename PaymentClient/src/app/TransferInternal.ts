import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { ListPaymentRequest } from './listrequest';
import { ListPaymentResponse, Payment, Payments } from './listresponse';
import { ListLogic, ListPaymentLogic } from './listpayment';

@Component({

    moduleId: module.id,
    selector: 'transfer-internal',
    templateUrl: './TransferInternal.html'
})

export class TransferInternal {
    dis:boolean = false;

    constructor(){

    }

    Distrue(): void {		
		  this.dis = true;
	}
    
    @HostListener("dragover", ["$event"])
    prevent(event : any){        
        // let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
        // let target: HTMLInputElement = <HTMLInputElement> eventObj.target;        
        event.preventDefault();
        event.stopPropagation();    
    }

	Disfalse(): void {		
		  this.dis = false;
	}
}