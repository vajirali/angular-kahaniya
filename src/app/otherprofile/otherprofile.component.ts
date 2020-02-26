import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../core/global.service';
import { shallowEqualArrays } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-otherprofile',
  templateUrl: './otherprofile.component.html',
  styleUrls: ['./otherprofile.component.scss']
})
export class OtherprofileComponent implements OnInit {
  public authorid;
  public userToken;
  public authorProfile;
  public seriesCollection = [];
  public storiesCollection = [];
  public nanosCollection = [];

  constructor(public globalservice: GlobalService, private route: ActivatedRoute) {
    let udata = JSON.parse(localStorage.getItem('currentuser'));
    this.userToken = udata['token'];
   }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.authorid = urlParameters['authorid'];

      //get author profile
      this.globalservice.getauthorProfile(this.userToken,this.authorid).then((result) => {
        this.authorProfile = result;
        //console.log(result);
        }, (err) => {
      });

      //get author series
      this.globalservice.kahanies_mine(this.authorid,this.userToken).then((result) => {
        this.seriesCollection = result;
        //console.log(result);
        }, (err) => {
      });

      //get author Stories
      this.globalservice.stories_mine(this.authorid,this.userToken).then((result) => {
        this.storiesCollection = result;
        // console.log(result);
        }, (err) => {
      });

      //get author nanaos
      this.globalservice.nano_stories_mine(this.authorid).then((result) => {
        this.nanosCollection = result;
        //console.log(result);
        }, (err) => {
      });

    });
  }

  followAuthor(authorId){
    this.globalservice.userfollowAuthor(this.userToken,authorId).then((result) => {
      this.authorProfile.is_following = true;
      this.authorProfile.followings = this.authorProfile.followings + 1;
     }, (err) => {
   });
 }

 unfollowAuthor(authorId){
  this.globalservice.userunfollowAuthor(this.userToken,authorId).then((result) => {
    this.authorProfile.is_following = false;
    this.authorProfile.followings = this.authorProfile.followings - 1;
   }, (err) => {
 });
}

}

