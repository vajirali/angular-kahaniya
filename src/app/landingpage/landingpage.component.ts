import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../core/global.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../core/auth.service';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {

  title = 'ngSlick';

  public  defaultLanguage = 'english';
  public defaultLanguageCode = 'en';

  public reviewtSlideImages = [
    {image: "../assets/images/review1.png",text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"},
    {image: "../assets/images/review2.png",text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"},
    {image: "../assets/images/review3.png",text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"},
    {image: "../assets/images/review4.png",text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"},
    {image: "../assets/images/review5.png",text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took"},

  ]




  reviewSlideOptions = {items: 1, dots: false, nav: true, autoplay:true, navSpeed:200,responsive:{
    0:{
        items:1,margin:10
    },
    600:{
        items:1, margin:20
    },
    800:{
      items:1, margin:30
    },
    1000:{
      items:1, margin:40
    },
    1280:{
        items:1, margin:80
    }
}};

  constructor(public globalservice: GlobalService, public authservice: AuthService, public translate: TranslateService, private router: Router) {
}

  ngOnInit() {

    //get All Languages
    this.globalservice.getLanguagesData().then((result) => {
      }, (err) => {
    });


    if (localStorage.getItem('language')){
      this.defaultLanguage = localStorage.getItem('language');
      this.defaultLanguageCode = localStorage.getItem('language_code');
    }else{
      localStorage.setItem('language', this.defaultLanguage);
      localStorage.setItem('language_code', this.defaultLanguageCode);
    }
    this.translate.use(this.defaultLanguageCode);

  }

  listClick(newValue) {
    localStorage.setItem('language', newValue.slug);
    localStorage.setItem('language_code', newValue.code);
    this.defaultLanguage = newValue.slug;
    this.defaultLanguageCode = newValue.code;
    this.translate.use(this.defaultLanguageCode);
    this.globalservice.displayLanguage = newValue.slug;
    this.globalservice.displayTempLanguage = newValue.slug;
    this.router.navigate(['/home']);
  }


}
