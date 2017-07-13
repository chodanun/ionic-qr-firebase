import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { QueueInfo } from '../pages/queueInfo/queueInfo';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Data } from '../providers/data/data';
// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabase} from 'angularfire2/database'
 
//QR-Code
import { QRCodeModule } from 'angular2-qrcode';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCHs5JeIxYSc1GWnaZyoqoG1uvckyF5jT4",
  authDomain: "ciix-fusion-59c3a.firebaseapp.com",
  databaseURL: "https://ciix-fusion-59c3a.firebaseio.com",
  projectId: "ciix-fusion-59c3a",
  storageBucket: "ciix-fusion-59c3a.appspot.com",
  messagingSenderId: "958932957275"
};


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    QueueInfo,
    
  ],
  imports: [
    BrowserModule,
    FormsModule ,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    QRCodeModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    QueueInfo
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Data,
    AngularFireDatabase,

  ]
})
export class AppModule {}
