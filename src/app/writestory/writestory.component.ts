import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Router} from '@angular/router';
import { GlobalService } from '../core/global.service';
import {Location} from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-writestory',
  templateUrl: './writestory.component.html',
  styleUrls: ['./writestory.component.scss']
})
export class WritestoryComponent implements OnInit {

  public wssecond: boolean = true;
  public wsfirst: boolean = true;
  public wsthird: boolean = true;
  public wsforth: boolean = true;
  public adsec:boolean = false;
  public dispTitleId:boolean = false;
  public data:any = {};
  public imagePath;
  imgURL: any;
  public defaultimage = "../../assets/images/write-story-placeholder.png";
  public message: string;
  public selectedFile: File;
  public userToken;
  public nanocount;

  public upDateContent;

  public editorStyle = {
    'min-height': '100px'
  }

  config = {
    toolbar:[
      ['bold', 'italic', 'underline', 'align'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'font': [] }]
    ]
  }

  constructor(private router: Router, public globalservice: GlobalService, public location: Location, public toastr: ToastrService) {
    let udata = JSON.parse(localStorage.getItem('currentuser'));
    this.userToken = udata['token'];
   }

  ngOnInit() {
    //console.log(this.globalservice.writestoryType);
    this.data.language = 'english';
    this.data.writing_style = 'prose';
    this.data.genre = 1;
    this.data.copy_rights = "All Rights Reserved";
    this.data.type = this.globalservice.writestoryType;
    this.data.preface = "";
  }

  richTextEditorChange(event){
    this.upDateContent = event.content;
    this.nanocount = event.html;
  }

  firstscreen(){
    if(this.wssecond) {
      this.wssecond = false;
      this.wsfirst = false;
    }else{
      this.wssecond = true;
      this.wsfirst = true;
    }
    this.wsforth = true;
  }

  secondscreen(){
    if(this.data.language == 'english'){
      this.dispTitleId = false;
    }else{
      this.dispTitleId = true;
    }

    if(this.wssecond) {
      this.wssecond = false;
      this.wsfirst = false;
      this.wsthird = true;
    }else{
      this.wssecond = true;
      this.wsfirst = true;
    }
  }

  thirdscreen(){
    if(this.wsthird) {
      this.wsthird = false;
      this.wssecond = true;
    }else{
    this.wsthird = true;
    this.wssecond = false;
    }
  }

  forthscreen(){
    this.wsforth = false;
    this.wsfirst = false;
  }

  backfirstscreen(){
    this.wsforth = true;
    this.wsfirst = true;
  }


  advanced(){
    if(this.adsec)
      this.adsec = false;
    else
      this.adsec = true;
  }

  backClicked() {
    this.location.back();
  }

  onSubmit(isValid: Boolean){
    if (isValid){
       let formData: any = new FormData();
       formData.append('language', this.data.language);
       formData.append('genre', this.data.genre);
       if(this.data.type == 'nano'){
          formData.append('content', JSON.stringify(this.upDateContent));
          this.globalservice.creatNano(formData, this.userToken).then((result) => {
            this.toastr.success("Nano Story Added Successfully.", 'Success!', {
              progressBar: true,
              positionClass : 'toast-bottom-right'
             });
            this.router.navigate(['/home']);
          }, (err) => {
          });
       }else{
        formData.append('writing_style', this.data.writing_style);
        formData.append('type', this.data.type);
        formData.append('copy_rights', this.data.copy_rights);
        formData.append('preface', this.data.preface);
        formData.append('title', this.data.title);
        formData.append('tag_line', this.data.tag_line);
        if(this.data.language == 'english'){
          formData.append('title_id', this.data.title);
        }else{
          formData.append('title_id', this.data.title_id);
        }
        formData.append('cover_image', this.selectedFile, this.selectedFile.name);
        this.globalservice.creatKahanies(formData, this.userToken).then((result) => {
          // alert(JSON.stringify(result))
          if(this.data.type == 'story'){
            this.router.navigate(['/createstory/'+result.title_id]);
          }else{
            this.router.navigate(['/preface/'+result.title_id]);
          }
        }, (err) => {
        });
       }
      }
      // Logic to add/update data here.
  }

  preview(event, files) {
    if (files.length === 0)
      return;

    this.selectedFile = event.target.files[0];
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

}
