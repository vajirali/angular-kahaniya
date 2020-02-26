import { Component, TemplateRef,OnInit, Input, Output, ViewChild, EventEmitter} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { AuthService } from '../core/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-signupmodal',
  templateUrl: './signupmodal.component.html',
  styleUrls: ['./signupmodal.component.scss']
})
export class SignupmodalComponent implements OnInit {
  modalRef: BsModalRef;
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
  public sign_name;
  public sign_email;
  public sign_mobile;
  public sign_password;
  public sign_otp;
  public fresendotpPopup;
  public resignupPopup;
  public mobilenumber : string;
  public forgototp;
  public newpassword : string;

  @Input() title?:string;

  @Output() loginModelClose = new EventEmitter();

  constructor(public authservice: AuthService, public toastr: ToastrService, private router: Router,private modalService: BsModalService) { }

  ngOnInit() {

  }


  loginpopupopen(){
    if(this.resetPopup){
      this.signupPopup = false;
      this.loginPopup = false;
      this.resetPopup = false;
      this.resignupPopup  = false;
      this.fresendotpPopup = false;
      return;
    }

    if(this.signupPopup){
       this.signupPopup = false;
       this.loginPopup = false;
       this.resetPopup = false;
       this.resignupPopup  = false;
       this.fresendotpPopup = false;
      }
     else{
       this.signupPopup = true;
       this.loginPopup = true;
       this.resetPopup = false;
       this.resignupPopup  = false;
      }
   }

   closepopup(){
    this.loginModelClose.emit();
   }


   forgotPopup(){
    if(this.resetPopup){
      this.resignupPopup = true;
      this.resetPopup = false;
      this.loginPopup = false;
     }
    else{
      this.resignupPopup = true;
      this.resetPopup = true;
      this.loginPopup = true;
     }
   }

   sendotpPopup(){
    this.authservice.sendotpforResetPass(this.mobilenumber).then((result) => {
      if(this.fresendotpPopup){
        this.fresendotpPopup = false;
        this.resetPopup = true;
      }
      else{
        this.fresendotpPopup = true;
        this.resetPopup = false;
      }
    }, (err) => {
    });
   }

   verifyforgotOtp(){
    this.authservice.verifyforgotOtp(this.mobilenumber,this.forgototp,this.newpassword).then((result) => {
      this.toastr.success(result.message, 'Success!', { progressBar: true });
      this.closepopup();
    }, (err) => {
      this.toastr.error(err.error.message, 'Oops!', {
        progressBar: true,
        positionClass : 'toast-top-right'
       });
    });
   }

   otpPopup(){
     if(this.mobilenumber){
        this.authservice.checkphoneforregi(this.mobilenumber).then((result) => {
            if(this.signotpPopup){
              this.signotpPopup = false;
              this.signupfirstPopup = false;
            }
            else{
              this.signotpPopup = true;
              this.signupfirstPopup = true;
            }
          }, (err) => {
            this.toastr.error(err.error.message, 'Oops!', {
              progressBar: true,
              positionClass : 'toast-top-right'
             });
        });
     }else{
          this.toastr.error("Please enter Mobile first", 'Oops!', {
            progressBar: true,
            positionClass : 'toast-top-right'
           });
     }
   }

   canLogin(){
    if(this.mobileno && this.p_password){
      return false;
    }else{
      return true;
    }
   }

   checkLogin(){
     //get checkLogin
    this.authservice.checkLogin(this.mobileno,this.p_password).then((result) => {
      this.loginModelClose.emit();
      localStorage.setItem('currentuser',JSON.stringify(result));
      this.authservice.currentUserData = result;
      this.authservice.isLogin = true;
      this.mobileno = '';
      this.p_password = '';
      this.router.navigate(['/home']);
    }, (err) => {
      this.toastr.error(err.error.message, 'Oops!', {
        progressBar: true,
        positionClass : 'toast-top-right'
       });
    });
   }

   resendotp(){
    this.sign_otp = '';
     this.authservice.checkphone(this.sign_mobile).then((result) => {
       }, (err) => {
     });
  }

   saveSignupData(){
    if(this.sign_name && this.sign_email && this.sign_password && this.sign_otp){
      this.authservice.doSignup(this.sign_name, this.sign_email, this.mobilenumber, this.sign_password, this.sign_otp).then((result) => {
        this.loginModelClose.emit();
        localStorage.setItem('currentuser',JSON.stringify(result));
        this.authservice.currentUserData = result;
        this.authservice.isLogin = true;
        this.router.navigate(['/my-profile']);
        }, (err) => {
          console.log(err.error.message);
          this.toastr.error(err.error.message, 'Oops!', {
            progressBar: true,
            positionClass : 'toast-top-right'
           });
      });
    }else{
       this.toastr.error("Please fill all fields", 'Oops!', {
         progressBar: true,
         positionClass : 'toast-top-right'
         });
    }

  }

    ispasswordvisible(status){
    this.passwordshow  = status;
   }

}
