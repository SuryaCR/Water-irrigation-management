import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  url = 'https://8ca8138b-1aac-430a-8325-3a686242a515-bluemix.cloudantnosqldb.appdomain.cloud/'
  dbUserName = 'apikey-v2-1xzbb618xtgfg14nm7uasm9coajsc9dzzpg8p57atbtg';
  dbPassword = 'f56766c5716a7b37a531aaa7bdb53315';
  basicAuth = 'Basic ' + btoa(this.dbUserName + ':' + this.dbPassword);
  
  // empRecord: any = {
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   password:'',
  //   mobile: '',
  // };

  constructor(private http:HttpClient) { }
  
  public localData = localStorage.getItem("userValue");
  public waterLitres = localStorage.getItem("waterLitres");
  public Irrigationvalue = localStorage.getItem("Irrigationvalue");

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.basicAuth
    })
  };

  store(formdata:any,id:any){
    let data={
      "Water":formdata['waters'],
      "type":"watermanage",
      "user":id
    }
    const url=this.url+'first-db';
    return this.http.post(url,data,this.httpOptions);
  }

  store1(formdata:any,id:any){
    let data={
      "Acres":formdata['acres'],
      "Hours":formdata['hours'],
      "Crops":formdata['crops'],
      "Water_Litres":this.waterLitres,
      "type":"irrigation",
      "user":id
    }
    const url=this.url+'first-db';
    return this.http.post(url,data,this.httpOptions);
  }

  store2(formdata:any,id:any){
    let data={
      "Soil":formdata['soil'],
      "Address":formdata['address'],
      "type":"additional_Info",
      "irrigation":id
    }
    const url=this.url+'first-db';
    return this.http.post(url,data,this.httpOptions);
  }

  add(db: string, doc: object){
    const url=this.url+db;
    return this.http.post(url, doc, this.httpOptions);

  }
  get(db:string){
    const url = this.url+db+'/_all_docs?include_docs=true';
    return this.http.get(url,this.httpOptions);

  }
  getData(db:string, id:any){
    const url=this.url+db+'/'+id;
    return this.http.get(url,this.httpOptions);
  }
  userLogin(email: any, password: any) {
    return this.http.get<any>('http://localhost:8000/getdata/' + email);
  }

  userEmail(email:any){
    return this.http.get<any>('http://localhost:8000/getdata/' + email);
  }

}