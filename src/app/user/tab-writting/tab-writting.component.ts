import { Component, OnInit, Input } from '@angular/core';
import { GlobalService } from '../../core/global.service';

@Component({
  selector: 'app-tab-writting',
  templateUrl: './tab-writting.component.html',
  styleUrls: ['./tab-writting.component.scss']
})
export class TabWrittingComponent implements OnInit {

  public userId;
  public userToken;
  @Input() kahanies: any;
  public count;
  public data:any = {
    nano_stories_mineData: {},
    stories_mineData: {},
    kahanies_mineData: {}
  }

  constructor( private globalservice: GlobalService) {
    let udata = JSON.parse(localStorage.getItem('currentuser'));
    this.userToken = udata['token'];
    this.userId = udata['id'];

    //get mine nenostories
    this.globalservice.nano_stories_mine(this.userId).then((result) => {
      this.data.nano_stories_mineData = result;
      }, (err) => {
    });

    //get mine stories
    this.globalservice.stories_mine(this.userId, this.userToken).then((result) => {
      this.data.stories_mineData = result;
        }, (err) => {
    });

    //get mine kahanies
    this.globalservice.kahanies_mine(this.userId,this.userToken).then((result) => {
      this.data.kahanies_mineData = result;
      // console.log(result);
      this.count = result;

      //console.log(this.count);
        }, (err) => {
    });

  }

  ngOnInit() {

  }



}
