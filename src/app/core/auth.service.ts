import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from './constants.service'
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserData = [];
  public isLogin = false;

  constructor(public afAuth: AngularFireAuth, public constants :ConstantsService, private router: Router, private http: HttpClient) {

   }

  checkLogin(mobile,password): Promise<any> {
    let data = {"phone": Number(mobile), "password": password};
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
        this.http.post(this.constants.API_ENDPOINT + '/user/login', data, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  //google api login
  doGoogleLogin(){
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
      .signInWithPopup(provider)
      .then(res => {
        resolve(res);
      })
    })
  }

  //Signup process
  doSignup(name,email,mobile,password,otp): Promise<any> {
    let data = {"full_name":name, "email":email, "phone":mobile, "password": password,"otp":otp, "country_code":91};
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
        this.http.post(this.constants.API_ENDPOINT + '/user/register', data, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }


  //Check Phone
  checkphone(mobile): Promise<any> {
    let data = {"phone":Number(mobile)};
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
        this.http.post(this.constants.API_ENDPOINT + '/user/checkPhone', data, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  checkphoneforregi(mobile): Promise<any> {
    let data = {"phone":Number(mobile),"reason":"register"};
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
        this.http.post(this.constants.API_ENDPOINT + '/user/request-otp', data, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }


  //Verify OTP
  verifyotp(mobile,otp): Promise<any> {
    let data = {"phone":Number(mobile), "code":Number(otp)};
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
        this.http.post(this.constants.API_ENDPOINT + '/user/verify', data, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }


  //send otp for forgot password
  sendotpforResetPass(mobilenumber): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
      const body = { 'reason':'forgot_password', 'phone':mobilenumber }
        this.http.post(this.constants.API_ENDPOINT + '/user/request-otp', body, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  //verify otp for forgot password
  verifyforgotOtp(mobilenumber, otp, password): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
      const body = { 'otp':otp, 'phone':mobilenumber, 'password':password }
        this.http.post(this.constants.API_ENDPOINT + '/user/forgot-password', body, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }



}
