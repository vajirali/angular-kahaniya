import { Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalService } from '../core/global.service';
import { ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fictionstory',
  templateUrl: './fictionstory.component.html',
  styleUrls: ['./fictionstory.component.scss']
})
export class FictionstoryComponent implements OnInit {
  modalRef: BsModalRef;
  public StoryCollection;
  public CommentCollection;
  public userToken;
  public userId;
  public userwallet;
  public userProfilePic;
  public readmoreBtn = true;
  public writecomment : string;
  public storyId;
  public ratings = [1,2,3,4,5];
  public udata;
  public paybtndsbl: boolean = false;

  constructor(public globalservice: GlobalService, private route: ActivatedRoute,  private modalService: BsModalService, public toastr: ToastrService) {
    this.udata = JSON.parse(localStorage.getItem('currentuser'));
    this.userToken = this.udata['token'];
    this.userProfilePic = this.udata['image'];
    this.userId = this.udata['id'];
    this.userwallet = this.udata['wallet_balance'];
  }

  ngOnInit() {
    //id
    this.route.params.forEach((urlParameters) => {
      this.storyId = urlParameters['id'];
      //console.log(this.storyId);
      //get Story detail
      this.globalservice.getStoryDetail(this.userToken,this.storyId).then((result) => {
        this.StoryCollection = result;
          console.log(this.StoryCollection);
          this.getComment(this.StoryCollection.id,this.userToken);
        }, (err) => {
      });
    });
  }

  getnanoData(ndata){
    var ntext = JSON.parse(ndata);
    return ntext;
  }

  payCoin(){
    if(this.userwallet >= this.StoryCollection.pricing.coins){
      this.paybtndsbl = true;
      this.udata['wallet_balance'] = this.userwallet-this.StoryCollection.pricing.coins;
      localStorage.setItem('currentuser', JSON.stringify(this.udata));

      //pay for story
      this.globalservice.spentforStory(this.userToken, this.StoryCollection.pricing.coins, parseInt(this.storyId)).then((result) => {
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

  moreContent(){

  }

  getComment(storyId,token){
    //get Story Comment detail
    this.globalservice.getCommentData(storyId,token).then((result) => {
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
    this.globalservice.addCommentData(this.StoryCollection.id,this.userToken,this.writecomment).then((result) => {
      this.CommentCollection.count = this.CommentCollection.count + 1;
      this.CommentCollection.results.push(result);
      this.writecomment = '';
     }, (err) => {
    });
   }

   followAuthor(authorId){
    this.globalservice.userfollowAuthor(this.userToken,authorId).then((result) => {
      this.StoryCollection.kahani_data.author.is_following = true;
      this.StoryCollection.kahani_data.author.followings = this.StoryCollection.kahani_data.author.followings + 1;
     }, (err) => {
   });
 }

 unfollowAuthor(authorId){
  this.globalservice.userunfollowAuthor(this.userToken,authorId).then((result) => {
    this.StoryCollection.kahani_data.author.is_following = false;
    this.StoryCollection.kahani_data.author.followings = this.StoryCollection.kahani_data.author.followings - 1;
   }, (err) => {
 });
}

addrating(rat){
  this.globalservice.ratToStory(rat,this.userToken,this.StoryCollection.id).then((result) => {
    this.StoryCollection.is_rated = true;
    this.StoryCollection.user_rating = result;
    this.StoryCollection.average_rating = result.average_rating;
   }, (err) => {
  });
}


purchaseModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template,{class: 'purchase-popup-modal'});
}

}
