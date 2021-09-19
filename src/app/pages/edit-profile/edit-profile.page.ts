import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { UtilService } from 'src/app/services/util.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  name: any = '';
  profilePic: any = 'assets/imgs/user.jpg';
  phone: any = '';
  descriptions: any = '';
  handle: any = '';

  task: AngularFireUploadTask;
  ref: AngularFireStorageReference;
  uploadState: Observable<string>;
  downloadURL: Observable<string>;
  uploadProgress: Observable<number>;
  db = firebase.firestore();
  constructor(
    private api: ApisService,
    private util: UtilService,
    private navCtrl: NavController,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
  ) {

  }
  
  ngOnInit() {
  
  }
  

  

  

}
