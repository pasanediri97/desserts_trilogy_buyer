import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/app/services/apis.service';
import { Router, NavigationExtras } from "@angular/router";
import { UtilService } from 'src/app/services/util.service';
import swal from 'sweetalert2';
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
    this.util.getReviewObservable().subscribe(data => {
      console.log(data);
      this.getReview();
    });
    this.util.observProfile().subscribe(data => {
      this.getProfile();
    });
  }

  ngOnInit() {
  }
  logout() {
    console.log('Logout alert');
    swal.fire({
      title: 'Alert',
      text: "Do you want to leave this app?",
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: '#9e0059',
      reverseButtons: true
        }).then(data => {
          if (data.value) {
            this.api.logout().then((data) => {
            
              this.router.navigate(['login']);
            }).catch(error => {
              console.log(error);
            });
          }

        });
    
  }

  goToAddress() {
    const navData: NavigationExtras = {
      queryParams: {
        from: 'accont'
      }
    };
    this.router.navigate(['choose-address'], navData);
  }

  ionViewWillEnter() {
    this.validate();
  }
  getReview() {
    this.api.getMyReviews(this.id).then((reviews) => {
      console.log(reviews);
      this.reviews = reviews;
    }, error => {
      console.log(error);
    }).catch(error => {
      console.log(error);
    });
  }
  getProfile() {
    this.api.getMyProfile(localStorage.getItem('uid')).then((data: any) => {
      console.log('userdata', data);
      if (data) {
        this.name = data.fullname;
        this.photo = data && data.cover ? data.cover : 'assets/imgs/user.jpg';
        this.email = data.email;
        this.id = data.uid;
        this.getReview();
      }
    }).catch(error => {
      console.log(error);
    });
  }

  validate() {
    this.api.checkAuth().then(async (user: any) => {
      if (user) {
        localStorage.setItem('uid', user.uid);
        this.getProfile();
      } else {
        this.router.navigate(['login']);
      }
    }).catch(error => {
      console.log(error);
    });
  }
  changeSegment(val) {
    this.seg_id = val;
  }

  goToselectRestaurants() {
    this.router.navigate(['/choose-restaurant']);
  }

  goToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  goToAddReview() {
    const navData: NavigationExtras = {
      queryParams: {
        id: "uoZfuvtoEyVqMsHeo9pOe5fhzMk2"
      }
    };
    this.router.navigate(['/add-review'], navData);
  }
}
