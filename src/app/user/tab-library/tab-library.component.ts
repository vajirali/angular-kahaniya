import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/global.service';

@Component({
  selector: 'app-tab-library',
  templateUrl: './tab-library.component.html',
  styleUrls: ['./tab-library.component.scss']
})
export class TabLibraryComponent implements OnInit {

  public bookmarkCollection;
  public subscribedCollection;
  public userToken;
  public userId;
  public totalbookmark;
  public totalsubscribed;
  public purchasedStoriesCollection = [];
  public purchasedSeriesCollection = [];


  constructor(public globalservice: GlobalService) {
    let udata = JSON.parse(localStorage.getItem('currentuser'));
    this.userToken = udata['token'];
    this.userId = udata['id'];
  }

  ngOnInit() {
    //get bookmarks
    this.globalservice.getbookmarklist(this.userToken).then((result) => {
      this.bookmarkCollection = result;
      this.totalbookmark = result.length;
        }, (err) => {
    });

    //get subscribed
    this.globalservice.getsubscribedlist(this.userToken).then((result) => {
      this.subscribedCollection = result;
      this.totalsubscribed = result.length;
      //console.log(result);
        }, (err) => {
    });


    //get purchased stories
    this.globalservice.getPurchaseStories(this.userToken).then((result) => {
      this.purchasedStoriesCollection = result;
      //console.log(result);
        }, (err) => {
    });

    //get purchased series
    this.globalservice.getPurchaseSeries(this.userToken).then((result) => {
      this.purchasedSeriesCollection = result;
      //console.log(result);
        }, (err) => {
    });



  }

}
