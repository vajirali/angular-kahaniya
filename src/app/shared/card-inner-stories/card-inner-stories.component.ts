import { Component, OnInit,Input, TemplateRef } from '@angular/core';
import { GlobalService } from '../../core/global.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-card-inner-stories',
  templateUrl: './card-inner-stories.component.html',
  styleUrls: ['./card-inner-stories.component.scss']
})
export class CardInnerStoriesComponent implements OnInit {
  @Input() stories: any;
  @Input() genreData: any;
  modalRef: BsModalRef;
  public userid;

  constructor(public globalservice: GlobalService,  private modalService: BsModalService, public authservice: AuthService) {
    if(localStorage.getItem('currentuser')){
      let udata = JSON.parse(localStorage.getItem('currentuser'));
      this.userid = udata['id'];
    }
   }

  ngOnInit() {
  }

  getGenerLable(generData){
    return generData[0].kahani.genre.title;
  }

  loginModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'login-modal'});
  }

  public loginModelCloseEmit() {
    this.modalRef.hide();
  }



}
