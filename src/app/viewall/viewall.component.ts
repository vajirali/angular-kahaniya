import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../core/global.service';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.scss']
})
export class ViewallComponent implements OnInit {

  public type;
  public value;
  public genreData;
  public defultLimit = 100;
  public popularauthorData;
  public popularcontestData;
  public popularnanoData;
  public userToken;
  public authorProfile;
  public popularseriesData;
  public authorProfileseries;
  public authorProfilenano;
  public popularbookmark;
  public subscribed;
  public authorProfilebookmark;
  public searchseriesCollection;
  public searchstoriesCollection;
  public searchauthorsCollection;
  public popularnanoCollection
  public popularstoryCollection;
  public popularseriesCollection;
  public purchasedStoriesCollection;
  public purchasedSeriesCollection;

  constructor(public globalservice: GlobalService, private route: ActivatedRoute, public location: Location) { }

  ngOnInit() {
    let udata = JSON.parse(localStorage.getItem('currentuser'));
    this.userToken = udata['token'];

    this.route.params.forEach((urlParameters) => {
      this.type = urlParameters['type'];
      this.value = urlParameters['value'];
      if(this.type == 'genre'){
          this.globalservice.getgenreDatawithLimit(this.value, this.defultLimit,this.globalservice.displayLanguage).then((result) => {
            this.genreData = result;
          }, (err) => {
        });
      }else if(this.type =='authors' && this.value == 'popular'){
        this.globalservice.getlatestAuthorwithlimit(this.defultLimit).then((result) => {
          this.popularauthorData = result;
          }, (err) => {
        });
      }else if(this.type =='contests' && this.value == 'popular'){
        this.popularcontestData = [
          '../assets/images/contest-slider1.png','../assets/images/contest-slider2.png','../assets/images/contest-slider1.png','../assets/images/contest-slider2.png',
          '../assets/images/contest-slider1.png','../assets/images/contest-slider2.png','../assets/images/contest-slider2.png','../assets/images/contest-slider2.png',
          '../assets/images/contest-slider2.png','../assets/images/contest-slider2.png','../assets/images/contest-slider2.png','../assets/images/contest-slider2.png',
          '../assets/images/contest-slider2.png','../assets/images/contest-slider2.png','../assets/images/contest-slider2.png','../assets/images/contest-slider2.png'
        ];
      }else if(this.type =='nanostory' && this.value != '' && this.value != 'popular'){

         //get author name
         this.globalservice.getauthorProfile(this.userToken,this.value).then((result) => {
          this.authorProfilenano = result;
          }, (err) => {
        });

        //get nano story
        this.globalservice.getauthornano(this.value,this.defultLimit).then((result) => {
          this.popularnanoData = result;
          }, (err) => {
        });
      }else if(this.type =='stories' && this.value != '' && this.value != 'popular'){

          //get author name
          this.globalservice.getauthorProfile(this.userToken,this.value).then((result) => {
            this.authorProfile = result;
            }, (err) => {
          });
          //get author stories
            this.globalservice.getauthorstories(this.value,this.defultLimit).then((result) => {
            this.genreData = result;
              }, (err) => {
          });
      }else if(this.type == 'series' && this.value != '' && this.value != 'popular') {

        //get author name
        this.globalservice.getauthorProfileseries(this.userToken,this.value).then((result) => {
          this.authorProfileseries = result;
          }, (err) => {
        });

         //get mine kahanies
        this.globalservice.getauthorseries(this.value,this.defultLimit).then((result) => {
          this.popularseriesData = result;
          //console.log(this.popularseriesData);
          }, (err) => {
        });
      }else if(this.type == 'bookmark' && this.value != ''){
          //get author name
          this.globalservice.getauthorProfilebookmark(this.userToken,this.value).then((result) => {
           // console.log(result);
            this.authorProfilebookmark = result;
            }, (err) => {
          });
          //get All bookmarks
            this.globalservice.getbookmarklistwithlimit(this.value,this.userToken,this.defultLimit).then((result) => {
              this.popularbookmark = result;
              //console.log(result);
                }, (err) => {
            });
      }else if(this.type == 'subscribed' && this.value != ''){
        //get All subscribed
          this.globalservice.getsubscribedlistwithlimit(this.userToken,this.defultLimit).then((result) => {
            this.subscribed = result;
            //console.log(result);
              }, (err) => {
          });
      }else if(this.type == 'search-series' && this.value != ''){
        this.globalservice.getSeriesbytitlewithlimit(this.value,this.defultLimit).then((result) => {
            //console.log(result);
            this.searchseriesCollection = result;
          }, (err) => {
        });
      }else if(this.type == 'search-stories' && this.value != ''){
        this.globalservice.getStoriesbytitlewithlimit(this.value,this.defultLimit).then((result) => {
            // console.log(result);
            this.searchstoriesCollection = result;
          }, (err) => {
        });
      }else if(this.type == 'search-authors' && this.value != ''){
        this.globalservice.getAuthorsbytitlewithlimit(this.value,this.defultLimit).then((result) => {
            // console.log(result);
            this.searchauthorsCollection = result;
          }, (err) => {
        });
      }else if(this.type =='nanostory' && this.value == 'popular'){
        this.globalservice.getpopularcollectionbytypewithlimit("nano_stories",this.defultLimit).then((result) => {
            // console.log(result);
            this.popularnanoCollection = result;
          }, (err) => {
        });
      }else if(this.type =='stories' && this.value == 'popular'){
        this.globalservice.getpopularcollectionbytypewithlimit("stories",this.defultLimit).then((result) => {
            // console.log(result);
            this.popularstoryCollection = result;
          }, (err) => {
        });
      }else if(this.type == 'series' && this.value == 'popular') {
        this.globalservice.getpopularcollectionbytypewithlimit("kahanies",this.defultLimit).then((result) => {
            // console.log(result);
            this.popularseriesCollection = result;
          }, (err) => {
        });
      }else if(this.type == 'purchased' && this.value == 'stories') {
        this.globalservice.getpurchasedstorieswithlimit(this.defultLimit).then((result) => {
            // console.log(result);
            this.purchasedStoriesCollection = result;
          }, (err) => {
        });
      }else if(this.type == 'purchased' && this.value == 'series') {
        this.globalservice.getpurchasedserieswithlimit(this.defultLimit).then((result) => {
            // console.log(result);
            this.purchasedSeriesCollection = result;
          }, (err) => {
        });
      }

    });
  }


  backClicked(){
    this.location.back();
  }

}
