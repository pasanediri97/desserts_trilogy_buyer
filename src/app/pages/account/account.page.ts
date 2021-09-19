import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { Router, NavigationExtras } from "@angular/router";
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  seg_id = 1;
  name: any;
  photo: any = 'assets/imgs/user.jpg';
  email: any;
  reviews: any = [];
  id: any;
  constructor(
    private api: ApisService,
    private router: Router,
    private util: UtilService
  ) {
    
  }

  ngOnInit() {
  }
 
}
