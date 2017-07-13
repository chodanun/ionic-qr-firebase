import { Injectable, EventEmitter } from '@angular/core'
import 'rxjs/add/operator/map';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Info} from '../../share/info'
import {QInfo} from '../../share/qinfo'
import {WaitingQueue} from '../../share/WaitingQueue'

@Injectable()
export class Data {
  items: FirebaseListObservable<any[]>;
  objInfo: Info;
  objQInfo: QInfo;
  waitingList: WaitingQueue[] ;
  arrList: WaitingQueue[];
  waitingQueueNumber: number = 0;
  navchange: EventEmitter<number> = new EventEmitter();

  constructor(public db: AngularFireDatabase) {
  
  }

  getNavChangeEmitter() {
    return this.navchange;
  }

  updateWaitingQueue(obj): Promise<Object> {
    return new Promise ( (res,rej)=>{
        console.log(`START AUTOMATICALLY UPDATING PROCESS: on branchName ${obj.branchName}, at service ${obj.queueLogicId}`)
        this.db.object(`${obj.branchName}/WaitingDetails/${obj.queueLogicId}`, { preserveSnapshot: true })
          .subscribe(snapshot => { 
            this.waitingList = snapshot.val()
            console.log(this.waitingList)
            console.log("Waiting queue: "+this.findWaitingQueue())
            this.navchange.emit(this.waitingQueueNumber)
            res(this.waitingList)
        })
    })
  }

  findWaitingQueue(){
    this.arrList = this.waitingList.filter( obj => {
      return parseInt(obj.visitId) < parseInt(this.objQInfo.visitId)
    })
    let number = this.arrList.length;
    this.waitingQueueNumber = number;
    console.log(`number: ${number}`)
    return number;
  }

  writeToFirebase(): Promise<string> {
    return new Promise ( (res,rej) => {
       const item = this.db.list(`Register`)
       const mKey = item.push({
            branchName:"",
            key:"",
        }).key;
        console.log("SAVE COMPLETED , mKey = "+mKey);
        res(mKey)
    })
  }

  listQInfo(mKey): Promise<QInfo>{
    return new Promise( (res,rej)=>{
        this.listenFirebase(mKey).then( obj => {
          this.getQInfo(obj).then( objQ => res(objQ))
        })
    })
  }

  listenFirebase(mKey): Promise<Info> {
    return new Promise ( (res,rej) => {
        let objectMKey = this.db.object(`Register/${mKey}`, { preserveSnapshot: true })
          .subscribe(snapshot => {
             if(snapshot.val().key != ""){
              this.objInfo = snapshot.val()
              console.log(this.objInfo)
              objectMKey.unsubscribe();
              res(this.objInfo)
              
            }
            
          })
      })
  }

  getQInfo(obj): Promise<QInfo> {
    return new Promise( (res,rej)=>{
      let objectTicket =  this.db.object(`${obj.branchName}/${obj.key}`, { preserveSnapshot: true })
          .subscribe(snapshot => { 
            this.objQInfo = snapshot.val()
            console.log(this.objQInfo)
            objectTicket.unsubscribe();
            res(this.objQInfo)
          })
    })
  }

}