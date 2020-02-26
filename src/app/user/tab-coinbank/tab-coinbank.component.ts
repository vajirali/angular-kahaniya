import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/global.service';
import { WindowRef } from 'src/app/core/windowref.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-tab-coinbank',
  templateUrl: './tab-coinbank.component.html',
  styleUrls: ['./tab-coinbank.component.scss']
})
export class TabCoinbankComponent implements OnInit {

  public setSlider = 10;
  list:any;
  public transactionCollection;
  public totaltransaction;
  public userToken;
  public userId;
  public disabled = false;
  public maxSize = 5;
  public offset = 0;
  public limit = 10;
  public wallet_balance;

  //razor pay setting
  public rzp1:any;


  constructor(public globalservice: GlobalService, private winRef: WindowRef, public toastr: ToastrService) {
    this.list = [10,20,30,40,50,60,70,80];
    let udata = JSON.parse(localStorage.getItem('currentuser'));
    this.userToken = udata['token'];
    this.userId = udata['id'];
    this.wallet_balance = udata['wallet_balance'];
   }


  ngOnInit() {
    this.getTranList(0);
  }

  initPay():void{
    var rzpoptions = {
        "key": "rzp_test_HTQz79bVMhpN4L",
        "amount": this.setSlider*100,
        "name": "Kahaniya",
        "handler": this.paymentResponse.bind(this),
        "theme": { "color": "#66BB6A" }
    };
    this.rzp1 = new this.winRef.nativeWindow.Razorpay(rzpoptions);
    this.rzp1.open();
  }

  paymentResponse(response){
    this.addmoney(response.razorpay_payment_id);
  }

  pageChanged(event){
    this.getTranList((event.page - 1)*10);
  }

  getTranList(offset){
    //get transaction list
    this.globalservice.gettransactionlist(this.userToken,this.limit,offset).then((result) => {
      this.transactionCollection = result['results'];
      this.totaltransaction = result.count;
        }, (err) => {
    });
  }

  select(item) {
    this.setSlider = item;
  };

  convertDate(bdate){
    var d = new Date(bdate);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[d.getMonth()]+' '+d.getDate();
  }

  addmoney(transactionId){
    //add money in wallet
    this.globalservice.addmoneywallet(this.userToken,transactionId,this.setSlider).then((result) => {
      this.toastr.success("Money Added Successfully.", 'Success!', {
         progressBar: true,
         positionClass : 'toast-bottom-right'
         });
      let udata = JSON.parse(localStorage.getItem('currentuser'));
      udata['wallet_balance'] = udata['wallet_balance']+this.setSlider;
      localStorage.setItem('currentuser', JSON.stringify(udata));
        }, (err) => {
    });
  }

}
