import { Component, EventEmitter, Output } from '@angular/core';


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

	Disfalse(): void {		
		  this.dis = false;
	}
}