import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../core/global.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public query;
  public seriesCollection;
  public seriesCollectionCount;
  public storiesCollection;
  public storiesCollectionCount;
  public authorsCollection;
  public authorsCollectionCount;

  constructor(public globalservice: GlobalService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.query = urlParameters['q'];

      //get series detail
      this.globalservice.getSeriesbytitle(this.query).then((result) => {
          this.seriesCollection = result;
          this.seriesCollectionCount = result.length;
          //console.log(result);
        }, (err) => {
      });

      //get stories detail
      this.globalservice.getStoriesbytitle(this.query).then((result) => {
          this.storiesCollection = result;
          this.storiesCollectionCount = result.length;
          //console.log(result);
        }, (err) => {
      });

      //get authors detail
      this.globalservice.getAuthorsbytitle(this.query).then((result) => {
          this.authorsCollection = result;
          this.authorsCollectionCount = result.length;
          //console.log(result);
        }, (err) => {
      });

    });
  }

}
