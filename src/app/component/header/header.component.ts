import { Component, OnInit, TemplateRef, ViewChild , ViewContainerRef} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router, NavigationEnd } from '@angular/router';
import { GlobalService } from '../../core/global.service';
import { AuthService } from '../../core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SignupmodalComponent } from '../../signupmodal/signupmodal.component';
import {filter} from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('childModal') childModal :SignupmodalComponent;
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: "write-modal"
  };
  public clickPopUp: boolean = false;
  public signupPopup: boolean = false;
  public loginPopup: boolean = false;
  public signotpPopup: boolean = false;
  public resetPopup: boolean = false;
  public resetPopupopen: boolean = false;
  public signupfirstPopup: boolean = false;
  public passwordshow: boolean = false;
  public mobileno;
  public p_password;
  public defaultLanguage = 'english';
  public defaultLanguageCode = 'en';
  public tempLanguage = 'english';
  public isLangChecked;
  public sign_name;
  public sign_email;
  public sign_mobile;
  public sign_password;
  public sign_otp;
  public userSignupData = [];
  public notificationsData = [];
  public showextraheader: boolean = true;
  public headerSearch;
  public is_checked ;




  constructor(private viewContainerRef: ViewContainerRef, public translate: TranslateService, public toastr: ToastrService, private modalService: BsModalService, private router: Router, public globalservice: GlobalService, public authservice: AuthService, public location: Location) {
    if (localStorage.getItem('language')){
      this.defaultLanguage = localStorage.getItem('language');
      this.defaultLanguageCode = localStorage.getItem('language_code');
    }
    if(localStorage.getItem('currentuser')){
      this.authservice.currentUserData = JSON.parse(localStorage.getItem('currentuser'));
      this.authservice.isLogin = true;
    }
    this.translate.use(this.defaultLanguageCode);
    this.tempLanguage = this.defaultLanguage;
    this.globalservice.displayLanguage = this.defaultLanguage;
    this.globalservice.displayTempLanguage = this.defaultLanguage;

    router.events.pipe(
        filter((event: any) => event instanceof NavigationEnd)
    )
      .subscribe(event => {
          if(event.urlAfterRedirects == '/landing'){
              this.showextraheader = false;
          }else{
            this.showextraheader = true;
          }
      });

  }


  ngOnInit() {
    //get All Languages
    this.globalservice.getLanguagesData().then((result) => {
    }, (err) => {
    });

    //get All Notifications
    if(this.authservice.isLogin){
      this.globalservice.getnotificationData().then((result) => {
        this.notificationsData = result;
        //console.log(this.notificationsData);
      }, (err) => {
      });
    }

  }

  languageModal(template: TemplateRef<any>) {
    this.tempLanguage = this.defaultLanguage;
    this.modalRef = this.modalService.show(template, {class: 'language-modal'});
  }

  loginModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'login-modal'});
  }

  public loginModelCloseEmit() {
    this.modalRef.hide();
  }

  writeModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  listClick(newValue) {
      this.tempLanguage = newValue.slug;
      this.defaultLanguageCode = newValue.code;
      this.globalservice.displayTempLanguage = newValue.slug;
  }

  popupopen(){
    if(this.globalservice.clickPopUpNotification)
      this.globalservice.clickPopUpNotification = false;
    else
    this.globalservice.clickPopUpNotification = true;
   }



   saveLanguage(){
    this.modalRef.hide();
    this.defaultLanguage = this.tempLanguage;
    localStorage.setItem('language', this.defaultLanguage);
    // localStorage.setItem('language_code', this.defaultLanguageCode);
    this.globalservice.displayLanguage = this.defaultLanguage;
    // this.translate.use(this.defaultLanguageCode);

    if(this.location.path() == "/home"){
      window.location.reload();
    }
  }

   ispasswordvisible(status){
    this.passwordshow  = status;
   }



   googlelogin(){
    /* this.authservice.doGoogleLogin().then((result) => {
        console.log(result);
      }, (err) => {
    }); */
   }


   resendotp(){
     this.sign_otp = '';
      this.authservice.checkphone(this.sign_mobile).then((result) => {
        }, (err) => {
      });
   }

   /* saveSignupData(){
    this.authservice.doSignup(this.sign_name, this.sign_email, this.sign_mobile, this.sign_password).then((result) => {
      this.modalRef.hide();
      localStorage.setItem('currentuser',JSON.stringify(result));
      this.authservice.currentUserData = result;
      this.authservice.isLogin = true;
      this.router.navigate(['/my-profile']);
      }, (err) => {
        console.log(err.error.message);
    });
   } */

    WriteSelection($event,type){
      if($event.target.tagName != 'BUTTON'){
        this.globalservice.writestoryType = type;
        this.modalRef.hide();
        this.router.navigate(['/writestory']);
      }
    }

   search(){
     if(this.headerSearch != undefined && this.headerSearch != ''){
        this.router.navigate(['/search/'+this.headerSearch]);
        this.headerSearch = '';
     }
   }

  watchVideo(url){
    window.open(url,'_blank');
  }

}
