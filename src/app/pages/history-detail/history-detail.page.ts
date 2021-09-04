import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ApisService } from 'src/app/services/apis.service';
import { UtilService } from 'src/app/services/util.service';
import { AlertController, NavController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.page.html',
  styleUrls: ['./history-detail.page.scss'],
})
export class HistoryDetailPage implements OnInit {
  id: any;
  grandTotal: any;
  orders: any[] = [];
  serviceTax: any;
  status: any;
  time: any;
  total: any;
  uid: any;
  address: any;
  restName: any;
  deliveryAddress: any;
  paid: any;
  restPhone: any;
  coupon: boolean = false;
  dicount: any;
  dname: any;
  orderData: any;
  loaded: boolean;
  restFCM: any;
  driverFCM: any;
  dId: any;
  constructor(
    private route: ActivatedRoute,
    private api: ApisService,
    private router: Router,
    private util: UtilService,
    private alertController: AlertController,
    private navCtrl: NavController
  ) {
    this.loaded = false;
  }

  ngOnInit() {
    
  }



}
