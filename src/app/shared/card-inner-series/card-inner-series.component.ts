import { Component, OnInit , Input, TemplateRef} from '@angular/core';
import { GlobalService } from '../../core/global.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-card-inner-series',
  templateUrl: './card-inner-series.component.html',
  styleUrls: ['./card-inner-series.component.scss']
})
export class CardInnerSeriesComponent implements OnInit {
  @Input() series: any;
  @Input() kahanies: any;
  modalRef: BsModalRef;
  public userid;

  constructor(public globalservice: GlobalService, private modalService: BsModalService, public authservice: AuthService) {
    if(localStorage.getItem('currentuser')){
      let udata = JSON.parse(localStorage.getItem('currentuser'));
      this.userid = udata['id'];
    }
  }

  ngOnInit() {
  }

  loginModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'login-modal'});
  }

  public loginModelCloseEmit() {
    this.modalRef.hide();
  }

}
