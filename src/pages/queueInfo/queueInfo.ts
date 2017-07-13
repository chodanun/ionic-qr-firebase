import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QInfo } from '../../share/qinfo'
import {Data} from '../../providers/data/data';

@Component({
  selector: 'queue-info',
  templateUrl: 'queueInfo.html'
})
export class QueueInfo {
	
	key: string = "123key";
	name: string ;
	qObj: QInfo;
	subscription: any;
	waitingQueueNumber: number;

	constructor(public navCtrl: NavController, public navParams: NavParams,public db: Data) {
		this.qObj = this.navParams.get('data')
		console.log(this.qObj)
		this.init();
	}

	init(){
		this.db.updateWaitingQueue(this.qObj).then( res => console.log(res))
		this.subscription = this.db.getNavChangeEmitter()
      		.subscribe(item => this.selectedItem(item));
		
	}
	selectedItem(item: number) {
    	this.waitingQueueNumber = item
  	}

}

