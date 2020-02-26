import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantsService } from './constants.service'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public dummyImage = "../../assets/images/Kahaniya-dummy-512.jpg";
  public userdummyImage = "../../assets/images/dummy-profile-bg.png";
  public dummyuser = "../../assets/images/dummyuser.png";
  public allLanguages = [];
  public allGenres = [];
  public latestSeries = [];
  public latestNanos = [];
  public dummytoken = '013b8fe99d00f2b4aedd5adaf9352eedc3c690c5';
  public defulaGenreIds = [];
  public clickPopUpNotification = false;
  public nano_stories_mineData = [];
  public stories_mineData = [];
  public kahanies_mineData = [];
  public writestoryType = 'story';
  public userToken;
  public displayLanguage="";
  public displayTempLanguage="";
  public tabSeriesData = [];
  public tabNanosData = [];
  public latestStoriesCollection = [];
  public latestAuthorCollection = [];
  public languageCombo = {
                          tamil:"தமிழ்",
                          bengali:"বাংলা",
                          hindi:"हिन्दी",
                          marathi:"मराठी",
                          gujarati:"ગુજરાતી",
                          malayalam:"മലയാളം",
                          english:"English",
                          punjabi:"ਪੰਜਾਬੀ",
                          kannada:"ಕನ್ನಡ",
                          telugu:"తెలుగు",
                          oriya:"ଓଡ଼ିଆ",
                        };

  constructor(public constants :ConstantsService, private router: Router, private http: HttpClient) {
      //console.log("GlobalService call");
      if(localStorage.getItem('currentuser')){
        let udata = JSON.parse(localStorage.getItem('currentuser'));
        this.userToken = udata['token'];
      }
  }

  getGenerLable(generData){
   return generData[0].kahani_data.genre.title;
  }

  getGenerId(generData){
    //console.log(generData);
    return generData[0].kahani_data.genre.id;
  }

  getLanguagesData(): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/languages?limit=20', { headers: headers })
            .subscribe(res => {
               this.allLanguages = res['results'];
                //console.log(res['value']);
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  getGenresData(): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/genres?limit=50', { headers: headers })
            .subscribe(res => {
               this.allGenres = res['results'];
                //console.log(res['results']);
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  getlatestSeriesData(lang): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/kahanies/?limit=5&type=series&editor=1&language='+lang, { headers: headers })
            .subscribe(res => {
               this.latestSeries = res['results'];
                //console.log(res['value']);
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  getlatestNanosData(lang): Promise<any> {
    return new Promise((resolve, reject) => {

      var headers;
      if(this.userToken){
        var token = this.userToken;
        headers = { 'Authorization': `Token ${token}` }
      }else{
        headers = { 'Content-Type': 'application/json' }
      }
        this.http.get(this.constants.API_ENDPOINT + '/nano_stories/?limit=5&editor=1&language='+lang, { headers: headers })
            .subscribe(res => {
               this.latestNanos = res['results'];
               resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }



  getgenreData(genreid,lang): Promise<any> {
    return new Promise((resolve, reject) => {
      //const headers = { 'Authorization': `Token ${this.dummytoken}` }
      const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/stories/?genre='+genreid+'&language='+lang, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  getgenreDatawithLimit(genreid,glimit,lang): Promise<any> {
    return new Promise((resolve, reject) => {
      //const headers = { 'Authorization': `Token ${this.dummytoken}` }
      const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/stories/?genre='+genreid+"&limit="+glimit+'&language='+lang, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  getmyGenres(token): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.get(this.constants.API_ENDPOINT + '/genres/mine', { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }


  addmyGenres(token,genid): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
      const body = { 'genre':genid  }
        this.http.post(this.constants.API_ENDPOINT + '/genres/mine', body, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  creatKahanies(formData,token): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.post(this.constants.API_ENDPOINT + '/kahanies/', formData, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  creatNano(formData,token): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.post(this.constants.API_ENDPOINT + '/nano_stories/', formData, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  creatlikedislike(formData,token): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.post(this.constants.API_ENDPOINT + '/nano_stories/likes/', formData, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  deletelikedislike(nstoryid,token): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.delete(this.constants.API_ENDPOINT + '/nano_stories/likes/'+nstoryid,  { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  changelikedislike(formData, nstoryid,token): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.patch(this.constants.API_ENDPOINT + '/nano_stories/likes/'+nstoryid+'/', formData,  { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  creatStory(formData,token,storyId): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.patch(this.constants.API_ENDPOINT + '/stories/'+storyId+'/', formData, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  createSeries(formData ,token, kahaniid): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
      this.http.patch(this.constants.API_ENDPOINT + '/kahanies/' + kahaniid+'/', formData ,{ headers: headers })
      .subscribe(res => {
          resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  creatSeriesStory(formData,token): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.patch(this.constants.API_ENDPOINT + '/stories/', formData, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }


  getKahanies(kahaniid,token): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
      this.http.get(this.constants.API_ENDPOINT + '/kahanies/' + kahaniid, { headers: headers })
      .subscribe(res => {
          resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }



  removemyGenres(token,genid): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.delete(this.constants.API_ENDPOINT + '/genres/mine/'+genid, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  nano_stories_mine(id): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/nano_stories?author='+id, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  getauthornano(id,nalimit): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/nano_stories?author='+id + "&limit="+nalimit, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  stories_mine(id,token): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.get(this.constants.API_ENDPOINT + '/user/stories?author='+id, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  getauthorstories(id,slimit): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${this.userToken}` }
        this.http.get(this.constants.API_ENDPOINT + '/user/stories?author='+id + '&limit='+slimit, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  kahanies_mine(id,token): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.get(this.constants.API_ENDPOINT + '/user/kahanies?author='+id, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }
  getauthorseries(id,selimit): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${this.userToken}` }
        this.http.get(this.constants.API_ENDPOINT + '/user/kahanies?author='+id + '&limit='+selimit, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  updateProfile(token,name,biography,phone,email,dob,gender): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
      const body = { 'full_name':name, 'biography':biography, 'phone':phone, 'email':email, 'date_of_birth':dob, 'gender':gender }
        this.http.put(this.constants.API_ENDPOINT + '/user/profile', body, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  getStoryDetail(token,storyId): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.get(this.constants.API_ENDPOINT + '/stories/'+storyId, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  getmoreContent(storyDipId): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/stories/'+storyDipId+'/get_main_content/', { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  getCommentData(storyId,token): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.get(this.constants.API_ENDPOINT + '/comments/?story='+storyId, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  addCommentData(storyId,token,content): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
      const body = { 'content':content, 'story':storyId, 'is_active':1 }
        this.http.post(this.constants.API_ENDPOINT + '/comments/', body, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  getSeriesDetail(token,seriesId): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.get(this.constants.API_ENDPOINT + '/kahanies/'+seriesId, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }


  getlatestAuthor(): Promise<any> {
    return new Promise((resolve, reject) => {
      // const headers = { 'Authorization': `Token ${token}` }
      const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/user/authors?editor=1&limit=5', { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  getlatestAuthorwithlimit(alimit): Promise<any> {
    return new Promise((resolve, reject) => {
      // const headers = { 'Authorization': `Token ${token}` }
      const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/user/authors?popular=1&limit='+alimit, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  getlatestStories(lang): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/stories/?editor=1&language='+lang, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }


  userfollowAuthor(token,authorId): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
      const body = { 'follower':authorId }
        this.http.post(this.constants.API_ENDPOINT + '/follows/', body, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }


  userunfollowAuthor(token,authorId): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
       this.http.delete(this.constants.API_ENDPOINT + '/follows/'+authorId, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  usersubscribeSeries(token,seriesId): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
      const body = { 'kahani':seriesId }
        this.http.post(this.constants.API_ENDPOINT + '/subscribers/', body, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }


  userunsubscribeSeries(token,seriesId): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
       this.http.delete(this.constants.API_ENDPOINT + '/subscribers/'+seriesId, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }


  getauthorProfile(token,authorId): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.get(this.constants.API_ENDPOINT + '/user/authors/'+authorId, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  getauthorProfileseries(token,authorId): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.get(this.constants.API_ENDPOINT + '/user/authors/'+authorId, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  getauthorProfilebookmark(token,authorId): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.get(this.constants.API_ENDPOINT + '/user/authors/'+authorId, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }


  getbookmarklist(token): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.get(this.constants.API_ENDPOINT + '/bookmarks/', { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  getbookmarklistwithlimit(id,token,blimit): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.get(this.constants.API_ENDPOINT + '/bookmarks?author='+id + '&limit='+blimit, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }




  createBookmark(token,episodeId): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
      const body = { 'story':episodeId }
        this.http.post(this.constants.API_ENDPOINT + '/bookmarks/', body, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }


  deleteBookmark(token,episodeId): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
       this.http.delete(this.constants.API_ENDPOINT + '/bookmarks/'+episodeId, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }


  getreviewsData(seriesId, token): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.get(this.constants.API_ENDPOINT + '/reviews?kahani='+seriesId, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  addReviewData(seriesId,token,content): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
      const body = { 'content':content, 'kahani':seriesId }
        this.http.post(this.constants.API_ENDPOINT + '/reviews/', body, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  getsubscribedlist(token): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.get(this.constants.API_ENDPOINT + '/subscribers/', { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  getsubscribedlistwithlimit(token,limit): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.get(this.constants.API_ENDPOINT + '/subscribers/?limit='+limit, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }


  gettransactionlist(token,limit,offset): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
        this.http.get(this.constants.API_ENDPOINT + '/transactions/?limit='+limit+'&offset='+offset, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  //for header search Series
  getSeriesbytitle(query): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/kahanies/?q='+query, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }


  //for header search Stories
  getStoriesbytitle(query): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/stories/?q='+query, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }


  //for header search Authors
  getAuthorsbytitle(query): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/user/authors?q='+query, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  //for search Series all results
  getSeriesbytitlewithlimit(query,limit): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/kahanies/?q='+query+'&limit='+limit, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  //for search Stories all results
  getStoriesbytitlewithlimit(query,limit): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/stories/?q='+query+'&limit='+limit, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  //for search Authors all results
  getAuthorsbytitlewithlimit(query,limit): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/user/authors?q='+query+'&limit='+limit, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  ratToStory(rat,token,storyId): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
      const body = { 'rating':rat,'story': storyId}
        this.http.post(this.constants.API_ENDPOINT + '/ratings/', body, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  addEpisodeforSeries(formData): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Accept': 'application/json' }
        this.http.post(this.constants.API_ENDPOINT + '/stories/', formData, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

//type may be [stories OR kahanies]
  addpriceCoin(token,type,id,coin): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
      const body = { 'coins':coin}
        this.http.post(this.constants.API_ENDPOINT +'/'+ type +'/'+ id +'/pricing/', body, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  addmoneywallet(token,tranId,money): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
      const body = { 'coins':money, 'transaction_type':'purchase','gateway_transaction_id':tranId,'product_type':''}
        this.http.post(this.constants.API_ENDPOINT +'/transactions/', body, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  updateGenreforss(kahaniId,token,genre): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
      const body = { 'genre':genre}
        this.http.patch(this.constants.API_ENDPOINT + '/kahanies/'+kahaniId+'/', body, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  callEditorPicksApi(language){

    //get All latest Series
    this.getlatestSeriesData(language).then((result) => {
        this.tabSeriesData = result;
        //console.log(result);
      }, (err) => {
    });

    //get All latest Nanos
    this.getlatestNanosData(language).then((result) => {
        this.tabNanosData = result;
        //console.log(result);
      }, (err) => {
    });

    //get latest Stories
    this.getlatestStories(language).then((result) => {
      this.latestStoriesCollection = result;
      //console.log(result);
      }, (err) => {
    });

    //get latest author
    /* this.getlatestAuthor().then((result) => {
      this.latestAuthorCollection = result;
      //console.log(result);
      }, (err) => {
    }); */

  }

  getfeedType(): Promise<any> {
    return new Promise((resolve, reject) => {
        const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/feed/', { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }


  getfeeddata(type): Promise<any> {
    return new Promise((resolve, reject) => {
        const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/'+type+'?network=1&language='+this.displayLanguage, { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  getBannersData(): Promise<any> {
    return new Promise((resolve, reject) => {
        const headers = { 'Content-Type': 'application/json' }
        this.http.get(this.constants.API_ENDPOINT + '/user/banners', { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  getnotificationData(): Promise<any> {
    return new Promise((resolve, reject) => {
        const headers = { 'Authorization': `Token ${this.userToken}` }
        this.http.get(this.constants.API_ENDPOINT + '/notifications/', { headers: headers })
            .subscribe(res => {
                resolve(res['results']);
            }, (err) => {
                reject(err);
            });
    });
  }

  getpopularcollectionbytypewithlimit(type,limit): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
      this.http.get(this.constants.API_ENDPOINT + '/'+type+'?network=1&language='+this.displayLanguage+'&limit='+limit, { headers: headers })
          .subscribe(res => {
              resolve(res['results']);
          }, (err) => {
              reject(err);
          });
    });
  }


  getPurchaseStories(token): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
      this.http.get(this.constants.API_ENDPOINT + '/user/purchase/story', { headers: headers })
          .subscribe(res => {
              resolve(res['results']);
          }, (err) => {
              reject(err);
          });
    });
  }

  getpurchasedstorieswithlimit(limit): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${this.userToken}` }
      this.http.get(this.constants.API_ENDPOINT + '/user/purchase/story?limit='+limit, { headers: headers })
          .subscribe(res => {
              resolve(res['results']);
          }, (err) => {
              reject(err);
          });
    });
  }

  getPurchaseSeries(token): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
      this.http.get(this.constants.API_ENDPOINT + '/user/purchase/series', { headers: headers })
          .subscribe(res => {
              resolve(res['results']);
          }, (err) => {
              reject(err);
          });
    });
  }

  getpurchasedserieswithlimit(limit): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${this.userToken}` }
      this.http.get(this.constants.API_ENDPOINT + '/user/purchase/series?limit='+limit, { headers: headers })
          .subscribe(res => {
              resolve(res['results']);
          }, (err) => {
              reject(err);
          });
    });
  }

  spentforStory(token,money,id): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
      const body = { 'coins':money, 'transaction_type':'spent','product_type'	:'story','story'	:id }
        this.http.post(this.constants.API_ENDPOINT +'/transactions/', body, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  spentforSeries(token,money,id): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Authorization': `Token ${token}` }
      const body = { 'coins':money, 'transaction_type':'spent','product_type'	:'series','kahani'	:id }
        this.http.post(this.constants.API_ENDPOINT +'/transactions/', body, { headers: headers })
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
    });
  }

  getPopularAuthors(): Promise<any> {
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'application/json' }
      this.http.get(this.constants.API_ENDPOINT + '/user/authors?popular=1', { headers: headers })
          .subscribe(res => {
              resolve(res['results']);
          }, (err) => {
              reject(err);
          });
    });
  }


}
