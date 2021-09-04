import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';
import { Router, NavigationExtras } from '@angular/router';
import { ApisService } from 'src/app/services/apis.service';
import { Platform, ModalController, NavController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import * as moment from 'moment';
import { orderBy, uniqBy } from 'lodash';
import Swal from 'sweetalert2';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  plt;
  allRest: any[] = [];
  headerHidden: boolean;
  chips: any[] = [];
  showFilter: boolean;
  lat: any;
  lng: any;
  // address: any;
  dummyRest: any[] = [];
  dummy = Array(50);
  haveLocation: boolean;
  nearme: boolean = false;
  profile: any;
  banners: any[] = [];
  slideOpts = {
    slidesPerView: 1.7,
  };
  cityName: any;
  cityId: any;
  constructor(
    private platform: Platform,
    private androidPermissions: AndroidPermissions,
    private diagnostic: Diagnostic,
    public geolocation: Geolocation,
    private router: Router,
    private api: ApisService,
    private util: UtilService,
    private apis: ApisService,
    public modalController: ModalController,
    private navCtrl: NavController
  ) {
    const currentLng = this.util.getLanguage();
    console.log('current language --->', currentLng);
    this.chips = [this.util.translate('Ratting 4.0+'), this.util.translate('Fastest Delivery'), this.util.translate('Cost')];
    // ['Ratting 4.0+', 'Fastest Delivery', 'Cost'];
    this.haveLocation = false;
    if (this.platform.is('ios')) {
      this.plt = 'ios';
    } else {
      this.plt = 'android';
    }
    // this.api.getBanners().then(data => {
    //   console.log(data);
    //   this.banners = data;
    // }).catch(error => {
    //   console.log(error);
    // });
    const city = JSON.parse(localStorage.getItem('selectedCity'));
    console.log(city);
    if (city && city.name) {
      this.cityName = city.name;
      this.cityId = city.id;
    //   this.getRest();
    }
  }

  addFilter(index) {
    console.log(index);
    if (index === 0) {
      console.log('rating');
      this.allRest = orderBy(this.allRest, 'ratting', 'desc');
    } else if (index === 1) {
      console.log('fast');
      this.allRest = orderBy(this.allRest, 'time', 'asc');
    } else {
      console.log('cost');
      this.allRest = orderBy(this.allRest, 'dishPrice', 'asc');
    }
    this.allRest = uniqBy(this.allRest, 'id');
  }
  ionViewWillEnter() {
    this.getLocation();
    // this.getProfile();
  }

  getLocation() {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
          result => console.log('Has permission?', result.hasPermission),
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
        );
        this.grantRequest();
      } else if (this.platform.is('ios')) {
        this.grantRequest();
      } else {
        this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 10000, enableHighAccuracy: false }).then((resp) => {
          if (resp) {
            console.log('resp', resp);
            this.lat = resp.coords.latitude;
            this.lng = resp.coords.longitude;
            // this.getAddress(this.lat, this.lng);
          }
        }).catch(error => {
          console.log(error);
          this.grantRequest();
        });
      }
    });
  }

  grantRequest() {
    this.diagnostic.isLocationEnabled().then((data) => {
      if (data) {
        this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 10000, enableHighAccuracy: false }).then((resp) => {
          if (resp) {
            console.log('resp', resp);
            this.lat = resp.coords.latitude;
            this.lng = resp.coords.longitude;
            // this.getAddress(this.lat, this.lng);
          }
        }).catch(error => {
          console.log(error);
        });
      } else {
        this.diagnostic.switchToLocationSettings();
        this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 10000, enableHighAccuracy: false }).then((resp) => {
          if (resp) {
            console.log('ress,', resp);
            this.lat = resp.coords.latitude;
            this.lng = resp.coords.longitude;
            // this.getAddress(this.lat, this.lng);
          }
        }).catch(error => {
          console.log(error);
        });
      }
    }, error => {
      console.log('errir', error);
      this.dummy = [];
    }).catch(error => {
      console.log('error', error);
      this.dummy = [];
    });

  }

  ngOnInit() {
    console.log('init');
  }


  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }
  distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    console.log(lat1, lon1, lat2, lon2);
    const earthRadiusKm = 6371;

    const dLat = this.degreesToRadians(lat2 - lat1);
    const dLon = this.degreesToRadians(lon2 - lon1);

    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }

  getTime(time) {
    return moment(time).format('mm');
  }

  async presentModal() {
    //   const modal = await this.modalController.create({
    //     component: ChooseAddressPage
    //   });
    //   return await modal.present();
    await this.router.navigate(['choose-address']);
  }

  nearMe() {
    this.dummy = Array(50);
    this.allRest = [];
    if (this.nearme) {
      this.dummyRest.forEach(async (element) => {
        const distance = await this.distanceInKmBetweenEarthCoordinates(this.lat, this.lng, element.lat, element.lng);
        console.log('distance', distance);
        // Distance
        if (distance < 10) {
          this.allRest.push(element);
        }
      });
      this.dummy = [];
    } else {
      this.allRest = this.dummyRest;
      this.dummy = [];
    }
  }

  openMenu(item) {
    // if (item && item.status === 'close') {
    //   return false;
    // }
    // const navData: NavigationExtras = {
    //   queryParams: {
    //     id: item.uid
    //   }
    // };
    // this.router.navigate(['category'], navData);
    this.router.navigate(['category']);
  }

  openOffers(item) {
    const navData: NavigationExtras = {
      queryParams: {
        id: item.restId
      }
    };
    this.router.navigate(['category'], navData);
  }

  onSearchChange(event) {
    console.log(event.detail.value);

    this.allRest = this.dummyRest.filter((ele: any) => {
      return ele.name.toLowerCase().includes(event.detail.value.toLowerCase());
    });
  }

  getCusine(cusine) {
    return cusine.join('-');
  }

  onScroll(event) {
    if (event.detail.deltaY > 0 && this.headerHidden) return;
    if (event.detail.deltaY < 0 && !this.headerHidden) return;
    if (event.detail.deltaY > 80) {
      this.headerHidden = true;
    } else {
      this.headerHidden = false;
    }
  }

  chipChange(item) {
    this.allRest = this.dummyRest;
    console.log(item);
    if (item === 'Fastest Delivery') {
      this.allRest.sort((a, b) => {
        a = new Date(a.time);
        b = new Date(b.time);
        return a > b ? -1 : a < b ? 1 : 0;
      });
    }

    if (item === 'Ratting 4.0+') {
      this.allRest = [];

      this.dummyRest.forEach(ele => {
        if (ele.ratting >= 4) {
          this.allRest.push(ele);
        }
      });
    }

    if (item === 'Cost') {
      this.allRest.sort((a, b) => {
        a = a.time;
        b = b.time;
        return a > b ? -1 : a < b ? 1 : 0;
      });
    }

  }
  changeLocation() {
    this.navCtrl.navigateRoot(['cities']);
  }

  getCurrency() {
    return this.util.getCurrecySymbol();
  }
}
