import { Component, HostListener, Inject, NgModule, OnInit, TemplateRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/platform-browser';
import { WINDOW } from "../services/window.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Router} from '@angular/router';
import { GlobalService } from '../core/global.service';
import {TranslateService} from '@ngx-translate/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  modalRef: BsModalRef;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: "write-modal"
  };

  homeSlideOptions={items: 1, dots: false, nav: true, autoplay:true, navSpeed:200};

  public latestGenreCollection = [];
  public latestFictionData = [];
  public feedTypeCollection = [];
  public feedDataCollection = [];
  public homeSlideImages = [];
  public genreBreakPoint = 0;
  public selectedNanos = '';

  tabSlideOptions={dots: false, nav: true, autoplay:true, navSpeed:200,responsive:{
    0:{
        items:3,margin:10
    },
    600:{
        items:4, margin:20
    },
    800:{
      items:4, margin:30
    },
    1000:{
      items:4, margin:40
    },
    1280:{
        items:4, margin:80
    }
}};

fictionSlideOptions={ dots: false, nav: true, autoplay:true,navSpeed:200,responsive:{
  0:{
      items:3,margin:10
  },
  600:{
      items:4, margin:20
  },
  800:{
    items:4, margin:30
  },
  1000:{
    items:4, margin:40
  },
  1280:{
      items:4, margin:80
  }
}};

  authSlideImages = [
    '../assets/images/auth-slider1.png','../assets/images/auth-slider2.png','../assets/images/auth-slider3.png','../assets/images/auth-slider2.png',
    '../assets/images/auth-slider1.png','../assets/images/auth-slider3.png'
  ]

  authSlideOptions={ dots: false, nav: true, autoplay:true, navSpeed:200,responsive:{
    0:{
        items:2,margin:10
    },
    600:{
        items:3, margin:20
    },
    800:{
      items:3, margin:30
    },
    1000:{
      items:3, margin:40
    },
    1280:{
        items:3, margin:80
    }
  }};

  nanoSlideOptions={ dots: false, nav: true, autoplay:true,navSpeed:200,responsive:{
    0:{
        items:4,margin:10
    },
    600:{
        items:4, margin:20
    },
    800:{
      items:4, margin:30
    },
    1000:{
      items:4, margin:40
    },
    1280:{
        items:4, margin:80
    }
  }};

  contestSlideImages = [
    '../assets/images/contest-slider1.png','../assets/images/contest-slider2.png','../assets/images/contest-slider1.png','../assets/images/contest-slider2.png',
    '../assets/images/contest-slider1.png','../assets/images/contest-slider2.png'
  ]

  contestSlideOptions={items: 2, dots: false, nav: true, autoplay:true, navSpeed:200,responsive:{
      0:{
          items:2,margin:10
      },
      600:{
          items:2, margin:20
      },
      800:{
        items:2, margin:30
      },
      1000:{
        items:2, margin:40
      },
      1280:{
          items:2, margin:80
      }
  }};

  fictionSlideImages = [
    '../assets/images/fiction-silder1.png','../assets/images/fiction-silder2.png','../assets/images/fiction-silder3.png','../assets/images/fiction-silder4.png',
    '../assets/images/fiction-silder2.png','../assets/images/fiction-silder4.png','../assets/images/fiction-silder3.png','../assets/images/fiction-silder1.png'
  ]


  thrillerSlideImages = [
    '../assets/images/thriller-slider1.png','../assets/images/thriller-slider2.png','../assets/images/thriller-slider3.png','../assets/images/thriller-slider4.png',
    '../assets/images/thriller-slider2.png','../assets/images/thriller-slider4.png','../assets/images/thriller-slider1.png','../assets/images/thriller-slider3.png'
  ]

  public selectedGenre = [];
  public temporyGenre = [];
  public totalGenres = [];
  public popularAuthors = [];
  public popularSeries = [];
  public popularStories = [];
  public popularNanoStories = [];
  public loadedGenres = 2;
  public userToken;
  public userProfilePic;

  constructor( @Inject(DOCUMENT) private document: Document,
  @Inject(WINDOW) private window: Window, private modalService: BsModalService, private router: Router, public globalservice: GlobalService, public translate: TranslateService, public authservice: AuthService) {
    if (localStorage.getItem('genres')){
      this.temporyGenre = this.selectedGenre = JSON.parse(localStorage.getItem('genres'));
      for(var i=0;i<2;i++) {
        if(this.selectedGenre[i]){
          this.globalservice.defulaGenreIds.push(this.selectedGenre[i]);
        }
      }
    }

    let udata = JSON.parse(localStorage.getItem('currentuser'));
    //this.userToken = udata['token'];
    //this.userProfilePic = udata['image'];
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const offset = this.window.pageYOffset || this.document.documentElement.scrollTop || this.document.body.scrollTop || 0;
  if((this.window.innerHeight + this.window.scrollY + 50 >= this.document.documentElement.scrollHeight) && this.genreBreakPoint == 0){
    if(this.selectedGenre.length > 0){
          if(this.selectedGenre.length > 2){
            for(var i = this.loadedGenres; i < this.selectedGenre.length; i++) {
                this.genreBreakPoint = 1;
                this.getGenredata(this.selectedGenre[i]);
                this.loadedGenres++;
                break;
            }
          }
      }else{
       for(var i = this.loadedGenres; i < this.globalservice.allGenres.length; i++) {
            this.genreBreakPoint = 1;
            this.getGenredata(this.globalservice.allGenres[i].id);
            this.loadedGenres++;
            break;
        }
      }
    }
  }

  getGenredata(genreId){
    this.globalservice.getgenreData(genreId,this.globalservice.displayLanguage).then((result) => {
      this.latestGenreCollection.push(result);
      //console.log(this.latestGenreCollection);
      this.genreBreakPoint = 0;
      }, (err) => {
    });
  }

  ngOnInit() {

  //get Popular Stories
  this.globalservice.getfeeddata('stories').then((result) => {
      this.popularStories = result;
      //console.log(result);
      }, (err) => {
  });

  //get All Banners
  this.globalservice.getBannersData().then((result) => {
    console.log(result[0].image);
    this.homeSlideImages = result;
    }, (err) => {
  });


  //get Popular Authors
  this.globalservice.getPopularAuthors().then((result) => {
      this.popularAuthors = result;
      //console.log(result);
      }, (err) => {
  });

  //get Popular Series
  this.globalservice.getfeeddata('kahanies').then((result) => {
      this.popularSeries = result;
      //console.log(result);
      }, (err) => {
  });

//get Popular Nano Stories
this.globalservice.getfeeddata('nano_stories').then((result) => {
    this.popularNanoStories = result;
    //console.log(result);
    }, (err) => {
  });



    // get EditorPicksData
    this.globalservice.callEditorPicksApi(this.globalservice.displayLanguage);

   //get All Genres
   this.globalservice.getGenresData().then((result) => {
      if(this.globalservice.defulaGenreIds.length == 0){
        for(var i=0;i<2;i++) {
          if(result[i].id){
            this.globalservice.defulaGenreIds.push(result[i].id);
          }
        }
      }
       //get genreCollection
      for (let genre of this.globalservice.defulaGenreIds) {
        this.getGenredata(genre);
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
     }else{
        this.temporyGenre.push(newValue.id);
     }
     this.selectedGenre = this.temporyGenre;
  }

  saveGenre(){

    this.modalRef.hide();
    let tempGenreCollection = [];
    tempGenreCollection = this.latestGenreCollection;
    this.latestGenreCollection = [];
    for (let genreData of tempGenreCollection) {
      if(this.selectedGenre.indexOf(genreData[0].genre_id) !== -1){
        this.latestGenreCollection.push(genreData);
      }
    }
    this.loadedGenres = this.latestGenreCollection.length;
    localStorage.setItem('genres',  JSON.stringify(this.selectedGenre));
  }

  getgenreslabel(genreid){
    console.log(genreid.genre.title);
    return 'test';
    //return this.globalservice.allGenres.find(x => x.id == genreid).title;
  }

  hideGenreLoader(){
    if (localStorage.getItem('genres')){
      if(this.selectedGenre.length == this.loadedGenres){
        return true;
      }else{
        return false;
      }
    }else{
      if(this.globalservice.allGenres.length == this.loadedGenres){
        return true;
      }else{
        return false;
      }
    }

  }


  loginModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'login-modal'});
  }

  public loginModelCloseEmit() {
    this.modalRef.hide();
  }



}
