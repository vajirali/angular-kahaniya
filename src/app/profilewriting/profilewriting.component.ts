import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Router, ActivatedRoute} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GlobalService } from '../core/global.service';
import { AuthService } from '../core/auth.service';
import { TabsetComponent } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profilewriting',
  templateUrl: './profilewriting.component.html',
  styleUrls: ['./profilewriting.component.scss']
})
export class ProfilewritingComponent implements OnInit {

  modalRef: BsModalRef;
  maxDate: Date;
  selected :any;
  list:any;
  public inactive:boolean = true;
  public selectedGenre = [];
  public temporyGenre = [];
  public setSlider = 0;
  public imagePath;
  imgURL: any;
  public message: string;
  public userToken;
  public userId;
  public allgenres = [];
  public removegenres = [];
  public full_name;
  public biography;
  public phone;
  public email;
  public date_of_birth;
  public gender;
  public bookmarkCollection;

  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  constructor(private modalService: BsModalService, public globalservice: GlobalService, private route: ActivatedRoute, private router: Router, public authservice: AuthService,public toastr: ToastrService) {
    this.maxDate = new Date();
    this.list = [10,20,30,40,50,60,70,80];
    //this.selectTab(4)

    let udata = JSON.parse(localStorage.getItem('currentuser'));
    this.userToken = udata['token'];
    this.userId = udata['id'];
    this.full_name = udata['full_name'];
    this.biography = udata['biography'];
    this.phone = udata['phone'];
    this.email = udata['email'];
    if(udata['date_of_birth']){
      var dobArray = udata['date_of_birth'].split('-');
      this.date_of_birth = dobArray[2]+'-'+dobArray[1]+'-'+dobArray[0];
    }
    this.gender = udata['gender'];
   }

  ngOnInit() {

    //get All Genres
    this.globalservice.getGenresData().then((result) => {
      this.allgenres = result;
        }, (err) => {
    });



      this.route.params.forEach((urlParameters) => {
        var tabName = urlParameters['tab'];
        var tabId = 0;
        if(tabName == 'setting'){
          tabId = 4;
        }
        this.selectTab(tabId);
       });
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  changeStatus(status){
    this.inactive = status;
    var tempdate;
    if(status){
      if(this.date_of_birth){
        if(this.date_of_birth.length <= 10){
          var date = this.date_of_birth;
          tempdate = date.split("-").reverse().join("-");
        }else{
          var d = new Date(this.date_of_birth);
          tempdate = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        }
      }else{
        this.date_of_birth = '';
        tempdate = "";
      }

      this.globalservice.updateProfile(this.userToken, this.full_name, this.biography, this.phone, this.email, tempdate, this.gender).then((result) => {
        result.token = this.userToken;
        localStorage.setItem('currentuser', JSON.stringify(result));
        this.toastr.success("Profile updated Successfully.", 'Success!', {
          progressBar: true,
          positionClass : 'toast-bottom-right'
         });
        }, (err) => {
          this.toastr.error("Something went wrong.", 'Error!', {
            progressBar: true,
            positionClass : 'toast-bottom-right'
          });
      });
    }
  }

  filterModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'language-modal'});
  }

  logout(){
    localStorage.removeItem('currentuser');
    this.authservice.currentUserData = [];
    this.authservice.isLogin = false;
    var fullGen = [];
    for (let genreData of this.globalservice.allGenres) {
      fullGen.push(genreData.id);
    }
    localStorage.setItem('genres',  JSON.stringify(fullGen));
    this.router.navigate(['/home']);
  }

  isActive(item) {
    return this.selected === item;
  };

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  getnanoData(ndata){
    var ntext = JSON.parse(ndata);
    return ntext.ops[0].insert;
  }

  changeGender(val){
    this.gender = val;
  }

}
