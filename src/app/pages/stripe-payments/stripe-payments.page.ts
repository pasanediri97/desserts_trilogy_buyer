import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApisService } from 'src/app/services/apis.service';
import { UtilService } from 'src/app/services/util.service';
import * as  moment from 'moment';
import swal from 'sweetalert2';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-stripe-payments',
  templateUrl: './stripe-payments.page.html',
  styleUrls: ['./stripe-payments.page.scss'],
})
export class StripePaymentsPage implements OnInit {
  cid: any;
  cards: any[] = [];
  card_token: any;
  totalPrice: any = 0;
  totalItem: any = 0;
  serviceTax: any = 0;
  deliveryCharge: any = 5;
  grandTotal: any = 0;
  deliveryAddress: any;
  venueFCM: any = '';
  vid: any = '';
  payKey: any = '';
  coupon: any;
  dicount: any;
  cart: any[] = [];
  constructor(
    private router: Router,
    private api: ApisService,
    private util: UtilService,
    private navCtrl: NavController,
  ) { }

  


  async ngOnInit() {
    
  }

  
}
