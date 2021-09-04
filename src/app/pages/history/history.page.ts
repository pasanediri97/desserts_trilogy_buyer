import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { UtilService } from 'src/app/services/util.service';
import { Router, NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import { AngularFirestore } from 'angularfire2/firestore';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  haveItems: boolean = false;
  myOrders: any[] = [];
  dummy = Array(50);
  constructor(
    private api: ApisService,
    private util: UtilService,
    private router: Router,
    private adb: AngularFirestore
  ) {
    
    
  }

  ngOnInit() {
  }
  async ionViewWillEnter() {
  }

 

}
