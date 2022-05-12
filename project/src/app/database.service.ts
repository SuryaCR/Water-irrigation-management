import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'https://8ca8138b-1aac-430a-8325-3a686242a515-bluemix.cloudantnosqldb.appdomain.cloud/'
  dbUserName = 'apikey-v2-1xzbb618xtgfg14nm7uasm9coajsc9dzzpg8p57atbtg';
  dbPassword = 'f56766c5716a7b37a531aaa7bdb53315';
  basicAuth = 'Basic ' + btoa(this.dbUserName + ':' + this.dbPassword);
  
  constructor(private http:HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.basicAuth
    })
  };

  add(db: string, doc: object): Observable<{}> {
    // const url2 = `${this.url}${db}`;
    const url=this.url+db;
    return this.http.post(url, doc, this.httpOptions)
  }
  get(db:string): Observable<{}>{
    const url = this.url+db+'/_all_docs?include_docs=true';
    return this.http.get(url,this.httpOptions)

  }
}