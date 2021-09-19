import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { ApisService } from 'src/app/services/apis.service';
import { register } from 'src/app/interfaces/register';
import { NavController } from "@ionic/angular";
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  login: register = { email: '', password: '', full_name: '', confirmPassword: '' };
  submitted = false;
  isLogin: boolean = false;
  constructor(
    private router: Router,
    private api: ApisService,
    private util: UtilService,
    private navCtrl: NavController
  ) { }


  ngOnInit() {
  }
  
}
