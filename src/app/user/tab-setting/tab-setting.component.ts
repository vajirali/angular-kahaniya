import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GlobalService } from '../../core/global.service';

@Component({
  selector: 'app-tab-setting',
  templateUrl: './tab-setting.component.html',
  styleUrls: ['./tab-setting.component.scss']
})
export class TabSettingComponent implements OnInit {

  modalRef: BsModalRef;
  public selectedGenre = [];
  public temporyGenre = [];
  public userToken;
  public removegenres = [];

  constructor(private modalService: BsModalService, public globalservice: GlobalService) {
    let udata = JSON.parse(localStorage.getItem('currentuser'));
    this.userToken = udata['token'];
   }

  ngOnInit() {

    //get My Genres
      this.globalservice.getmyGenres(this.userToken).then((result) => {
        let minegen = [];
        localStorage.removeItem('genres');
        for (let genreDt of result) {
          minegen.push(genreDt['genre'])
        }
        localStorage.setItem('genres', JSON.stringify(minegen));
        if (localStorage.getItem('genres')){
          this.temporyGenre = this.selectedGenre = JSON.parse(localStorage.getItem('genres'));
        }
      }, (err) => {
     });

  }

  filterModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'language-modal'});
  }

  genreClick(newValue) {
    if(this.temporyGenre.indexOf(newValue.id) !== -1 ){
      this.temporyGenre.splice(this.temporyGenre.indexOf(newValue.id), 1);
      this.removegenres.push(newValue.id);
    }else{
      this.temporyGenre.push(newValue.id);
      this.removegenres.splice(this.removegenres.indexOf(newValue.id), 1);
    }
    this.selectedGenre = this.temporyGenre;
    console.log(this.removegenres);
    }

  saveGenre(){
    this.modalRef.hide();
    localStorage.setItem('genres',  JSON.stringify(this.selectedGenre));
    for (let genreIds of this.selectedGenre) {
      this.addminegenre(genreIds);
    }
    for (let genreIds of this.removegenres) {
      this.removeminegenre(genreIds);
    }
  }
  getgenreslabel(genreid){
    return this.globalservice.allGenres.find(x => x.id == genreid).title;
  }

  addminegenre(genId){
    this.globalservice.addmyGenres(this.userToken, genId).then((result) => {
      }, (err) => {
    });
  }

  removeminegenre(genId){
    this.globalservice.removemyGenres(this.userToken, genId).then((result) => {
      }, (err) => {
    });
  }


}
