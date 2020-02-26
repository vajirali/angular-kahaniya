import { Component, OnInit, Input, TemplateRef  } from '@angular/core';
import { GlobalService } from '../../core/global.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-card-nanostory',
  templateUrl: './card-nanostory.component.html',
  styleUrls: ['./card-nanostory.component.scss']
})
export class CardNanostoryComponent implements OnInit {
  @Input() nanos: any;
  public tabNanosData;
  modalRef: BsModalRef;
  public selectedNanos = '';
  public type;
  public userToken;



  constructor(public globalservice: GlobalService,  private modalService: BsModalService, public authservice: AuthService) {
    if(localStorage.getItem('currentuser')){
      let udata = JSON.parse(localStorage.getItem('currentuser'));
      this.userToken = udata['token'];
    }
  }

  ngOnInit() {

  }

  getnanoData(ndata){
    if(ndata){
      var ntext = JSON.parse(ndata);
      return ntext.ops[0].insert;
    }else{
      return "No Contents Available";
    }
  }

  nanofilterModal(template: TemplateRef<any>, ndata) {
    this.selectedNanos = ndata;
    this.modalRef = this.modalService.show(template, {class: 'nanofilter-modal'});
  }

  loginModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'login-modal'});
  }

  public loginModelCloseEmit() {
    this.modalRef.hide();
  }

  likefun(action, type, nstoryid, nanos){
    console.log(nanos);
    console.log(action+' '+ type+' '+nstoryid);
    let formData: any = new FormData();
    formData.append('nano_story', nstoryid);
    if(action == null){

      if(type == 'like'){
        formData.append('action', 1);
        nanos.action = 1;
        nanos.all_likes = nanos.all_likes + 1;
      }else{
        formData.append('action', 0);
        nanos.action = 0;
        nanos.all_dislikes = nanos.all_dislikes + 1;
      }
      this.globalservice.creatlikedislike(formData, this.userToken).then((result) => {
      }, (err) => {
      });

    }else if(action == 1 && type == 'like'){
      this.globalservice.deletelikedislike(nstoryid, this.userToken).then((result) => {
        nanos.action = null;
        nanos.all_likes = nanos.all_likes - 1;
      }, (err) => {
      });

    }else if(action == 1 && type == 'dislike'){
      formData.append('action', action);
      this.globalservice.changelikedislike(formData, nstoryid, this.userToken).then((result) => {
        nanos.action = 0;
        nanos.all_likes = nanos.all_likes - 1;
        nanos.all_dislikes = nanos.all_dislikes + 1;
      }, (err) => {
      });

    }else if(action == 0 && type == 'like'){
      formData.append('action', action);
      this.globalservice.changelikedislike(formData, nstoryid, this.userToken).then((result) => {
        nanos.action = 1;
        nanos.all_likes = nanos.all_likes + 1;
        nanos.all_dislikes = nanos.all_dislikes - 1;
      }, (err) => {
      });
    }else if(action == 0 && type == 'dislike'){
      this.globalservice.deletelikedislike(nstoryid, this.userToken).then((result) => {
        nanos.action = null;
        nanos.all_dislikes = nanos.all_dislikes - 1;
      }, (err) => {
      });
    }
  }

}
