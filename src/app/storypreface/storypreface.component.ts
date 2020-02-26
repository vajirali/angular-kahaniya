import { Component, OnInit} from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Router} from '@angular/router';
import { GlobalService } from '../core/global.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-storypreface',
  templateUrl: './storypreface.component.html',
  styleUrls: ['./storypreface.component.scss']
})
export class StoryprefaceComponent implements OnInit {

  public seriesCollection;
  public seriesId;
  public userToken;
  public writereviews : string;
  public userProfilePic;
  public reviewsCollection;
  public userId;



  constructor(public globalservice: GlobalService, private route: ActivatedRoute) {
    let udata = JSON.parse(localStorage.getItem('currentuser'));
    this.userToken = udata['token'];
    this.userProfilePic = udata['image'];
    this.userId = udata['id'];
  }

  ngOnInit() {
    //id
    this.route.params.forEach((urlParameters) => {
      this.seriesId = urlParameters['id'];
      //get series detail
      this.globalservice.getSeriesDetail(this.userToken,this.seriesId).then((result) => {
          this.seriesCollection = result;
         console.log(this.seriesCollection);
          this.getreviews(this.seriesCollection.id,this.userToken);
        }, (err) => {
      });
    });
  }

  getnanoData(ndata){
    if(ndata != ''){
      var ntext = JSON.parse(ndata);
      return ntext;
    }else{
      return '';
    }
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

convertDate(bdate){
  var d = new Date(bdate);
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[d.getMonth()]+' '+d.getDate();
}

getreviews(seriesId,token){
  //get Story Comment detail
  this.globalservice.getreviewsData(seriesId,token).then((result) => {
    this.reviewsCollection = result;
    //console.log(result);
   }, (err) => {
  });
}

addReview(){
  //get Story Comment detail
  this.globalservice.addReviewData(this.seriesCollection.id,this.userToken,this.writereviews).then((result) => {
    this.reviewsCollection.count = this.reviewsCollection.count + 1;
    this.reviewsCollection.results.push(result);
    this.writereviews = '';
   }, (err) => {
  });
 }

}
