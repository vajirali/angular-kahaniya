import { Component, OnInit, Input, TemplateRef} from '@angular/core';
import { GlobalService } from '../../core/global.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-card-author',
  templateUrl: './card-author.component.html',
  styleUrls: ['./card-author.component.scss']
})
export class CardAuthorComponent implements OnInit {
  @Input() author: any;

  public userToken;
  public userId;
  modalRef: BsModalRef;

  constructor(public globalservice: GlobalService, private modalService: BsModalService, public authservice: AuthService) {

    if(localStorage.getItem('currentuser')){
      let udata = JSON.parse(localStorage.getItem('currentuser'));
      this.userToken = udata['token'];
      this.userId = udata['id'];
    }

   }

  ngOnInit() {

  }

  followAuthor(authorId){
     this.globalservice.userfollowAuthor(this.userToken,authorId).then((result) => {
       //console.log(result);
      }, (err) => {
    });
  }

  loginModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'login-modal'});
  }

  public loginModelCloseEmit() {
    this.modalRef.hide();
  }

}
