import { Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalService } from '../core/global.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-readingstory',
  templateUrl: './readingstory.component.html',
  styleUrls: ['./readingstory.component.scss']
})
export class ReadingstoryComponent implements OnInit {

  modalRef: BsModalRef;
  public seriesId;
  public episodeId;
  public seriesCollection;
  public episodeCollection;
  public readmoreBtn = true;
  public userToken;
  public userProfilePic;
  public userId;
  public userwallet;
  public writecomment : string;
  public CommentCollection;
  public nextEpisode = false;
  public paybtndsbl: boolean = false;
  public paybtndsblSeries: boolean = false;
  public udata;

  constructor(public globalservice: GlobalService, private route: ActivatedRoute, private modalService: BsModalService, public toastr: ToastrService) {
    this.udata = JSON.parse(localStorage.getItem('currentuser'));
    this.userToken = this.udata['token'];
    this.userProfilePic = this.udata['image'];
    this.userId = this.udata['id'];
    this.userwallet = this.udata['wallet_balance'];
  }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.seriesId = urlParameters['sid'];
      this.episodeId = urlParameters['epid'];

      //get series detail to display all episode list
       this.globalservice.getSeriesDetail(this.userToken,this.seriesId).then((result) => {
        this.readmoreBtn = true;
        this.seriesCollection = result;
        //console.log(result);
        let currentindex = result.stories.findIndex(x => x.id == this.episodeId);
        if(result.stories[currentindex+1]){
          this.nextEpisode = result.stories[currentindex+1]['title_id'];
        }else{
          this.nextEpisode = false;
        }
        }, (err) => {
      });

      //get episode detail
       this.globalservice.getStoryDetail(this.userToken,this.episodeId).then((result) => {
        this.episodeCollection = result;
          //console.log(this.episodeCollection);
          this.getComment(this.episodeCollection.id,this.userToken);
        }, (err) => {
      });


    });
  }

  payCoin(){
      if(this.userwallet >= this.episodeCollection.pricing.coins){
        this.paybtndsbl = true;
        this.udata['wallet_balance'] = this.userwallet-this.episodeCollection.pricing.coins;
        localStorage.setItem('currentuser', JSON.stringify(this.udata));

        //pay for story
        this.globalservice.spentforStory(this.userToken, this.episodeCollection.pricing.coins, parseInt(this.episodeId)).then((result) => {
          this.toastr.success("You have successfully purchased this story.", 'Success!', {
            progressBar: true,
            positionClass : 'toast-bottom-right',
          });
          setTimeout(function(){
              location.reload();
          }, 4500);
        }, (err) => {
        });
      }else{
        this.toastr.error("You have not sufficient amount. Please add more coin in your Wallet.", 'Error!', {
          progressBar: true,
          positionClass : 'toast-bottom-right'
        });
      }
  }

  payCoinforSeries(){
    if(this.userwallet >= this.episodeCollection.kahani_data.pricing.coins){
      this.paybtndsblSeries = true;
      this.udata['wallet_balance'] = this.userwallet-this.episodeCollection.kahani_data.pricing.coins;
      localStorage.setItem('currentuser', JSON.stringify(this.udata));

      //pay for series
      this.globalservice.spentforSeries(this.userToken, this.episodeCollection.kahani_data.pricing.coins, parseInt(this.seriesId)).then((result) => {
        this.toastr.success("You have successfully purchased this series.", 'Success!', {
          progressBar: true,
          positionClass : 'toast-bottom-right',
        });
        setTimeout(function(){
            location.reload();
        }, 4500);
      }, (err) => {
      });
    }else{
      this.toastr.error("You have not sufficient amount. Please add more coin in your Wallet.", 'Error!', {
        progressBar: true,
        positionClass : 'toast-bottom-right'
      });
    }
}

  getnanoData(ndata){
    var ntext = JSON.parse(ndata);
    return ntext;
  }

  getComment(episodeId,token){
    //get Story Comment detail
    this.globalservice.getCommentData(episodeId,token).then((result) => {
      this.CommentCollection = result;
     }, (err) => {
    });
  }

  convertDate(bdate){
    var d = new Date(bdate);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[d.getMonth()]+' '+d.getDate();
  }

  addComment(){
    //get Story Comment detail
    this.globalservice.addCommentData(this.episodeCollection.id,this.userToken,this.writecomment).then((result) => {
      this.CommentCollection.count = this.CommentCollection.count + 1;
      this.CommentCollection.results.push(result);
      this.writecomment = '';
     }, (err) => {
    });
   }

   subscribeSeries(){
    this.globalservice.usersubscribeSeries(this.userToken,this.seriesCollection.id).then((result) => {
      //console.log(result);
      this.seriesCollection.is_subscribed = true;
      this.seriesCollection.subscribers = this.seriesCollection.subscribers + 1;
      }, (err) => {
    });
  }

  unsubscribeSeries(){
    this.globalservice.userunsubscribeSeries(this.userToken,this.seriesCollection.id).then((result) => {
      this.seriesCollection.is_subscribed = false;
      this.seriesCollection.subscribers = this.seriesCollection.subscribers - 1;
      }, (err) => {
    });
  }

  followAuthor(authorId){
    this.globalservice.userfollowAuthor(this.userToken,authorId).then((result) => {
      this.seriesCollection.author.is_following = true;
      this.seriesCollection.author.followings = this.seriesCollection.author.followings + 1;
     }, (err) => {
   });
 }

 unfollowAuthor(authorId){
  this.globalservice.userunfollowAuthor(this.userToken,authorId).then((result) => {
    this.seriesCollection.author.is_following = false;
    this.seriesCollection.author.followings = this.seriesCollection.author.followings - 1;
   }, (err) => {
 });
}

createBookmark(episodeId){
  this.globalservice.createBookmark(this.userToken,episodeId).then((result) => {
    let currentindex = this.seriesCollection.stories.findIndex(x => x.id == episodeId);
    this.seriesCollection.stories[currentindex].is_bookmarked = true;
   }, (err) => {
 });
}

deleteBookmark(episodeId){
  this.globalservice.deleteBookmark(this.userToken,episodeId).then((result) => {
    let currentindex = this.seriesCollection.stories.findIndex(x => x.id == episodeId);
    this.seriesCollection.stories[currentindex].is_bookmarked = false;
   }, (err) => {
 });
}

purchaseModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template,{class: 'purchase-popup-modal'});
}

addrating(rat){
  this.globalservice.ratToStory(rat,this.userToken,this.episodeCollection.id).then((result) => {
    this.episodeCollection.is_rated = true;
    this.episodeCollection.user_rating = result;
    this.episodeCollection.average_rating = result.average_rating;
   }, (err) => {
  });
}

}
