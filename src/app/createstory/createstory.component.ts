import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { GlobalService } from '../core/global.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createstory',
  templateUrl: './createstory.component.html',
  styleUrls: ['./createstory.component.scss']
})
export class CreatestoryComponent implements OnInit {

  editorForm:FormGroup;
  public imagePath;
  imgURL: any;
  public message: string;
  public kahaniid;
  public userToken;
  public storyData;
  public story_title;
  public tag_line;
  public content;
  public upDateContent;
  public selectedFile: File;
  public genresCollection;
  public seriesData;

  public editorStyle = {
    'min-height': '100px'
  }

  config = {
    toolbar:[
      ['bold', 'italic'],
      [{ 'list': 'ordered'}],
      ['link']
    ]
  }

  constructor(private route: ActivatedRoute, public globalservice: GlobalService, public toastr: ToastrService) {
    let udata = JSON.parse(localStorage.getItem('currentuser'));
    this.userToken = udata['token'];
   }

  ngOnInit() {

    this.editorForm = new FormGroup({
      'editor':new FormControl(null)
    });

    this.globalservice.getGenresData().then((result) => {
      this.genresCollection = result;
      console.log(result);
    });

    this.route.params.forEach((urlParameters) => {
      this.kahaniid = urlParameters['kahaniid'];
      //get mine writestories
      this.globalservice.getKahanies(this.kahaniid,this.userToken).then((result) => {
         this.seriesData = result;
         this.storyData = result.stories;
         this.imgURL = result.stories[0].cover_image_data;
         this.story_title =  result.stories[0].title;
         this.tag_line =  result.stories[0].tag_line;
         //console.log(result.stories[0].main_content);
         this.content =  JSON.parse(result.stories[0].main_content);

          }, (err) => {
      });
    });




  }

  preview(event,files) {
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

  richTextEditorChange(event){
    //console.log(event.content);
    //console.log(JSON.stringify(event.content));
    this.upDateContent = event.content;
  }


  onSubmit(){

    let formData: any = new FormData();
       formData.append('title', this.story_title);
       formData.append('tag_line', this.tag_line);
       formData.append('main_content', JSON.stringify(this.upDateContent));
       if(this.selectedFile){
        formData.append('cover_image', this.selectedFile, this.selectedFile.name);
       }
       console.log(this.storyData[0].id);
       this.globalservice.creatStory(formData, this.userToken, this.storyData[0].id).then((result) => {
        //this.router.navigate(['/createstory/'+result.id]);
        this.toastr.success("Story Updated Successfully.", 'Success!', {
          progressBar: true,
          positionClass : 'toast-bottom-right'
         });
       }, (err) => {
      });

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
