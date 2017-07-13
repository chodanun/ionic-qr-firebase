import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { QueueInfo } from '../queueInfo/queueInfo';
import {Data} from '../../providers/data/data';
import {Info} from '../../share/info'
import {QInfo} from '../../share/qinfo'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
	
	QRObj: string ;
	mKey: string ;
	name: string ;
	obj: Info;
	data: QInfo;
	waitingQueue: string;

	constructor(public navCtrl: NavController, public db: Data, ) {

	}

	setWaitingQueue(n){
		this.waitingQueue = n
	}

	onBarcodeSuccess(){
		this.navCtrl.push(QueueInfo,{data: this.data});
	}

	saveToFirebase(): void{
		this.db.writeToFirebase().then( mKey => {
			this.mKey = mKey
			this.getQInfo(mKey);
		});
	}
	getQInfo(mKey): void{
		this.db.listQInfo(mKey)
		.then(resultQ => this.data = resultQ)
		.then( ()=> this.onBarcodeSuccess())
	}
	
}

