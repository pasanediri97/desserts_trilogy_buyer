import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApisService } from 'src/app/services/apis.service';
import { ActionSheetController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import * as firebase from 'firebase';
import { UtilService } from 'src/app/services/util.service';
@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.page.html',
  styleUrls: ['./add-review.page.scss'],
})
export class AddReviewPage implements OnInit {

  rate = 1;
  rate_text;
  task: AngularFireUploadTask;
  ref: AngularFireStorageReference;
  uploadState: Observable<string>;
  downloadURL: Observable<string>;
  uploadProgress: Observable<number>;
  id: any;
  ratting: any;
  coverImage: any = '';
  image: any = '';
  descriptions: any = '';
  totalRatting: any;
  constructor(
    private route: ActivatedRoute,
    private api: ApisService,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private util: UtilService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    
  }
 
}
