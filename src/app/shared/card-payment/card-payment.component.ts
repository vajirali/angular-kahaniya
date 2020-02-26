import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/core/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss']
})
export class CardPaymentComponent implements OnInit {

  public coinSection: boolean = false;
  public radcheck: boolean = false;
  public totalcoin;
  public kahaniid;
  public userToken;
  public type;
  public episodeId;

  constructor(private router: Router,private route: ActivatedRoute, public globalservice: GlobalService, public toastr: ToastrService) {
    let udata = JSON.parse(localStorage.getItem('currentuser'));
    this.userToken = udata['token'];
    this.type = 'kahanies';
   }

//preface, createstory
  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.kahaniid = urlParameters['kahaniid'];
      this.episodeId = urlParameters['epid'];

      if(this.episodeId){

        this.globalservice.getStoryDetail(this.userToken,this.episodeId).then((result) => {
          if(result.pricing){
            this.coinSection = true;
            this.radcheck = true;
            this.totalcoin = result.pricing.coins;
          }
          this.type = 'stories';
          this.kahaniid = this.episodeId;
         }, (err) => {
        });
      }
      else{
        this.globalservice.getKahanies(this.kahaniid,this.userToken).then((result) => {
            if(result.pricing){
              this.coinSection = true;
              this.radcheck = true;
              this.totalcoin = result.pricing.coins;
            }
          }, (err) => {
        });
      }


    });
  }

  checkOption(option){
    if(option == 'yes'){
      this.coinSection = true;
    }else{
      this.coinSection = false;
    }
  }

  publish(){
    this.globalservice.addpriceCoin(this.userToken,this.type,this.kahaniid,this.totalcoin).then((result) => {
      this.toastr.success(this.type+" Price Added Successfully.", 'Success!', { progressBar: true });
      }, (err) => {
    });
  }

}
