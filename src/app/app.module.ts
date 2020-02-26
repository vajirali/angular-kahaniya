import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './home/home.component';
import { OwlModule } from 'ngx-owl-carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { StoryprefaceComponent } from './storypreface/storypreface.component';
import { ProfilewritingComponent } from './profilewriting/profilewriting.component';
import { WritestoryComponent } from './writestory/writestory.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PrefaceComponent } from './preface/preface.component';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { FictionstoryComponent } from './fictionstory/fictionstory.component';
import { ReadingstoryComponent } from './readingstory/readingstory.component';
import { OtherprofileComponent } from './otherprofile/otherprofile.component';
import { ViewallComponent } from './viewall/viewall.component';
import { FormsModule } from '@angular/forms';
import { WINDOW_PROVIDERS } from "./services/window.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

//auth guard
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { ClickoutsideDirective } from './directive/clickoutside.directive';

//quill
import { ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';


import {Nl2BrPipeModule} from 'nl2br-pipe';
import { ImagepreloadDirective } from './directive/imagepreload.directive';
import { CardContestComponent } from './shared/card-contest/card-contest.component';
import { CardAuthorComponent } from './shared/card-author/card-author.component';
import { CardSeriesComponent } from './shared/card-series/card-series.component';
import { CardNanostoryComponent } from './shared/card-nanostory/card-nanostory.component';
import { CardStoriesComponent } from './shared/card-stories/card-stories.component';
import { TabCoinbankComponent } from './user/tab-coinbank/tab-coinbank.component';
import { TabWrittingComponent } from './user/tab-writting/tab-writting.component';
import { TabSettingComponent } from './user/tab-setting/tab-setting.component';
import { SignupmodalComponent } from './signupmodal/signupmodal.component';
import { CreatestoryComponent } from './createstory/createstory.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { TabLibraryComponent } from './user/tab-library/tab-library.component';
import { SearchComponent } from './search/search.component';
import { WindowRef } from './core/windowref.service';
import { CardPaymentComponent } from './shared/card-payment/card-payment.component';
import { CardInnerSeriesComponent } from './shared/card-inner-series/card-inner-series.component';
import { CardInnerStoriesComponent } from './shared/card-inner-stories/card-inner-stories.component';
import { OnlynumberDirective } from './directive/onlynumbers.directive';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    StoryprefaceComponent,
    ProfilewritingComponent,
    WritestoryComponent,
    PrefaceComponent,
    FictionstoryComponent,
    ReadingstoryComponent,
    OtherprofileComponent,
    ClickoutsideDirective,
    ImagepreloadDirective,
    CardContestComponent,
    CardAuthorComponent,
    CardSeriesComponent,
    CardNanostoryComponent,
    CardStoriesComponent,
    TabCoinbankComponent,
    TabWrittingComponent,
    TabSettingComponent,
    ViewallComponent,
    SignupmodalComponent,
    CreatestoryComponent,
    LandingpageComponent,
    TabLibraryComponent,
    SearchComponent,
    CardPaymentComponent,
    CardInnerSeriesComponent,
    CardInnerStoriesComponent,
    OnlynumberDirective
  ],
  imports: [

    BrowserModule,
    OwlModule,
    AppRoutingModule,
    HttpClientModule,
    TextareaAutosizeModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    Nl2BrPipeModule
    ],
  providers: [ WINDOW_PROVIDERS, AuthGuardGuard, WindowRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
