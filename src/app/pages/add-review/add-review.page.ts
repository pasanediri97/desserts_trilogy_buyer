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
    this.route.queryParams.subscribe(data => {
      console.log('data=>', data);
      if (data.hasOwnProperty('id')) {
        this.id = data.id;
        this.getDetails();
      }
    });
  }
  getDetails() {
    this.api.getVenueDetails(this.id).then((data) => {
      console.log(data);
      if (data) {
        this.ratting = data.ratting;
        this.totalRatting = data.totalRatting;
      }
    }, error => {
      console.log('errir', error);
    }).catch(error => {
      console.log(error);
    });
  }
  onClick(val) {
    this.rate = val;
  }

  onChange(val) {
    console.log(val);
  }
 

  async openCamera() {
    const actionSheet = await this.actionSheetController.create({
      header: this.util.translate('Choose from'),
      buttons: [{
        text: this.util.translate('Gallery'),
        icon: 'images',
        handler: () => {
          console.log('Images clicked');
          this.opemCamera('gallery');
        }
      }, {
        text: this.util.translate('Camera'),
        icon: 'camera',
        handler: () => {
          console.log('camera clicked');
          this.opemCamera('camera');
        }
      }, {
        text: this.util.translate('Cancel'),
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  opemCamera(type) {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 700,
      targetWidth: 700,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: type === 'camera' ? 1 : 0
    };
    console.log('open');
    this.camera.getPicture(options).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = base64Image;
      this.util.show();
      const id = localStorage.getItem('uid') + '/' + this.util.makeid(10);
      firebase.storage().ref().child(localStorage.getItem('uid')).child(btoa(id) + '.jpg')
        .putString(base64Image, 'data_url').then((snapshot) => {
          this.util.hide();
          snapshot.ref.getDownloadURL().then((url) => {
            console.log('url uploaded', url);
            this.coverImage = url;
          });
        }, error => {
          this.util.hide();
          console.log(error);
        }).catch((error) => {
          console.log(error);
          this.util.hide();
        });
    }, (err) => {
      this.util.hide();
    });
  }
}
