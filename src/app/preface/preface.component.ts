import { Component, OnInit, TemplateRef } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Router, ActivatedRoute} from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { GlobalService } from '../core/global.service';
import { TabHeadingDirective } from 'ngx-bootstrap/tabs/public_api';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-preface',
  templateUrl: './preface.component.html',
  styleUrls: ['./preface.component.scss']
})
export class PrefaceComponent implements OnInit {

  modalRef: BsModalRef;
  editorForm:FormGroup;

  public editorStyle = {
    'min-height': '100px'
  }

  public dotmenu: boolean = false;
  public addepisec: boolean = false;
  public startwrite: boolean = true;
  public options: boolean = false;
  public editEpisode: boolean = false;
  public coinSection: boolean = false;
  public kahaniid;
  public userToken;
  public storyData;
  public story_title;
  public tag_line;
  public content;
  public episodecontent;
  public upDateContent;
  public selectedFile: File;
  public imagePath;
  public imgURL: any;
  public epimgURL: any;
  public seriesData;
  public message;
  public prefaceContent;
  public episodeprefaceContent;
  public estory_title;
  public etag_line;
  public episodeCollection;
  public genresCollection;
  public seriesId;
  public episodeId;
  public totalcoin;

  config = {
    toolbar:[
      ['bold', 'italic'],
      [{ 'list': 'ordered'}],
      ['link']
    ]
  }
  constructor(private modalService: BsModalService, private router: Router, public globalservice: GlobalService,private route: ActivatedRoute, public toastr: ToastrService) {
    let udata = JSON.parse(localStorage.getItem('currentuser'));
    this.userToken = udata['token'];
  }

  ngOnInit() {
    this.editorForm = new FormGroup({
      'editor':new FormControl(null)
    });

    this.globalservice.getGenresData().then((result) => {
      this.genresCollection = result;
    });

    this.route.params.forEach((urlParameters) => {
      this.kahaniid = urlParameters['kahaniid'];
      this.episodeId = urlParameters['epid'];
      //get mine writestories
      this.globalservice.getKahanies(this.kahaniid,this.userToken).then((result) => {
         this.seriesData = result;
         this.imgURL = result.cover_image;
         this.story_title =  result.title;
         this.tag_line =  result.tag_line;
         //console.log(result.stories[0].main_content);
         if(result.preface!=''){
          this.content =  JSON.parse(result.preface);
         }
      }, (err) => {

      });

      if(this.episodeId != undefined){
        this.addepisec = true;
        this.editEpisode = true;
        this.startwrite = false;

        this.globalservice.getStoryDetail(this.userToken,this.episodeId).then((result) => {
          // console.log(result);
          this.estory_title = result.title;
          this.etag_line = result.tag_line;
          this.epimgURL = result.cover_image;
          if(result.main_content!=''){
            this.episodecontent =  JSON.parse(result.main_content);
           }

         }, (err) => {
        });

      }

    });
  }

  preview(event,files) {

    //if (files.length === 0)
      //return;
      this.selectedFile = event.target.files[0];
    var mimeType = this.selectedFile.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = this.selectedFile;
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  addpreview(event,files) {
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
      this.epimgURL = reader.result;
    }
  }

  onSubmit(){
    let formData: any = new FormData();
    formData.append('title', this.story_title);
    formData.append('tag_line', this.tag_line);
    formData.append('preface', JSON.stringify(this.prefaceContent));
    if(this.selectedFile){
     formData.append('cover_image', this.selectedFile, this.selectedFile.name);
    }
    this.globalservice.createSeries(formData, this.userToken, this.seriesData.id).then((result) => {
      this.toastr.success("Story Updated Successfully.", 'Success!', {
        progressBar: true,
        positionClass : 'toast-bottom-right'
      });
     }, (err) => {
    });
  }

  richTextEditorChange(event){
    this.prefaceContent = event.content;
  }

  richTextEditorChange2(event){
    this.episodeprefaceContent = event.content;
  }

  dotopen(){
    if(this.dotmenu)
      this.dotmenu = false;
    else
      this.dotmenu = true;
  }

  addepisode(){
      if(this.addepisec){
        this.addepisec = false;
        this.startwrite = true;
      }else{
        this.addepisec = true;
        this.startwrite = false;
      }
      this.imgURL = '';
  }

  paymentModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'payment-modal'});
  }

  publish(){

    //add episode
    let formData: any = new FormData();
    formData.append('kahani', this.seriesData.id);
    formData.append('title', this.estory_title);
    formData.append('tag_line', this.etag_line);
    formData.append('main_content', JSON.stringify(this.episodeprefaceContent));
    if(this.selectedFile){
     formData.append('cover_image', this.selectedFile, this.selectedFile.name);
    }

    this.globalservice.addEpisodeforSeries(formData).then((result) => {
      this.seriesData.stories.push(result);
      this.episodeCollection = result;
      this.modalRef.hide();
      if(this.coinSection){
        this.addprice('stories',result.id);
      }
      this.router.navigate(['/preface/'+this.seriesData.id+'/'+result.id]);
     }, (err) => {
    });
  }

  addprice(type,id){
    this.globalservice.addpriceCoin(this.userToken,type,id,this.totalcoin).then((result) => {
      this.toastr.success("Price Added Successfully.", 'Success!', {
        progressBar: true,
        positionClass : 'toast-bottom-right'
       });
      }, (err) => {
    });
  }

  updateEpisode(){
      let formData: any = new FormData();
      formData.append('title', this.estory_title);
      formData.append('tag_line', this.etag_line);
      formData.append('main_content', JSON.stringify(this.episodecontent));
      if(this.selectedFile){
        formData.append('cover_image', this.selectedFile, this.selectedFile.name);
      }
      this.globalservice.creatStory(formData, this.userToken, this.episodeId).then((result) => {
        this.toastr.success("Story Updated Successfully.", 'Success!', {
          progressBar: true,
          positionClass : 'toast-bottom-right'
         });
      }, (err) => {
    });
  }

  backToseries(){
    this.router.navigate(['/preface/'+this.kahaniid]);
  }

  addnewEpisode(){
   // this.router.navigate(['/preface/'+this.kahaniid]);
    this.addepisec = true;
    this.startwrite = false;
    this.editEpisode = false;
    this.estory_title = '';
    this.etag_line = '';
    this.episodecontent = '';
    this.imgURL = '';
}

checkOption(option){
  if(option == 'yes'){
    this.coinSection = true;
  }else{
    this.coinSection = false;
    this.publish();
  }
}

onChange(genreValue) {
  this.globalservice.updateGenreforss(this.kahaniid,this.userToken,genreValue).then((result) => {
    this.toastr.success("Genre Updated Successfully.", 'Success!', {
      progressBar: true,
      positionClass : 'toast-bottom-right'
     });
  });
}

}
