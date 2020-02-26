import { Component, OnInit, Input  } from '@angular/core';

@Component({
  selector: 'app-card-contest',
  templateUrl: './card-contest.component.html',
  styleUrls: ['./card-contest.component.scss']
})
export class CardContestComponent implements OnInit {

  @Input() image: any;
  constructor() { }

  ngOnInit() {
  }

}
