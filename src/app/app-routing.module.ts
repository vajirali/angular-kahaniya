import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/*========= All Component ===========*/
import { HomeComponent } from './home/home.component';
import { StoryprefaceComponent } from './storypreface/storypreface.component';
import { ProfilewritingComponent } from './profilewriting/profilewriting.component';
import { WritestoryComponent } from './writestory/writestory.component';
import { PrefaceComponent } from './preface/preface.component';
import { FictionstoryComponent } from './fictionstory/fictionstory.component';
import { ReadingstoryComponent } from './readingstory/readingstory.component';
import { OtherprofileComponent } from './otherprofile/otherprofile.component';
import { ViewallComponent } from './viewall/viewall.component';
import { CreatestoryComponent } from './createstory/createstory.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { SearchComponent } from './search/search.component';
//auth guard
import { AuthGuardGuard } from './guard/auth-guard.guard';


const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 's/:id', component: StoryprefaceComponent, canActivate: [AuthGuardGuard] },
  { path: 'my-profile', component: ProfilewritingComponent, canActivate: [AuthGuardGuard] },
  { path: 'my-profile/:tab', component: ProfilewritingComponent, canActivate: [AuthGuardGuard] },
  { path: 'writestory', component: WritestoryComponent, canActivate: [AuthGuardGuard] },
  { path: 'preface/:kahaniid', component: PrefaceComponent, canActivate: [AuthGuardGuard] },
  { path: 'preface/:kahaniid/:epid', component: PrefaceComponent, canActivate: [AuthGuardGuard] },
  { path: 'story/:id', component: FictionstoryComponent, canActivate: [AuthGuardGuard] },
  { path: 's/:sid/:epid', component: ReadingstoryComponent, canActivate: [AuthGuardGuard] },
  { path: 'u/:authorid', component: OtherprofileComponent, canActivate: [AuthGuardGuard] },
  { path: 'all/:type/:value', component: ViewallComponent, canActivate: [AuthGuardGuard] },
  { path: 'createstory/:kahaniid', component: CreatestoryComponent, canActivate: [AuthGuardGuard] },
  { path: 'landing', component: LandingpageComponent},
  { path: 'search/:q', component: SearchComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
