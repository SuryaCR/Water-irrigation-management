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
  dbName = 'first-db';
  // empRecord: any = {
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   password:'',
  //   mobile: '',
  // };

  constructor(private http:HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.basicAuth
    })
  };

  addWaterData(formdata:any,id:any){
    let data={
      "Water_food":formdata['waters'],
      "Water_tree":formdata['waters_tree'],
      "Water_non_food":formdata['waters_non'],
      "type":"watermanage",
      "user":id
    }
    const url=this.url+this.dbName;
    return this.http.post(url,data,this.httpOptions);
  }

  addIrrigationData(formdata:any,id:any){
  const waterLitres = localStorage.getItem("waterLitres");
    let data={
      "Acres":formdata['acres'],
      "Hours":formdata['hours'],
      "Crops":formdata['crops'],
      "Water_Litres":waterLitres,
      "type":"irrigation",
      "user":id
    }
    const url=this.url+this.dbName;
    return this.http.post(url,data,this.httpOptions);
  }

  addAdditionalInfo(formdata:any,id:any){
    let data={
      "Soil":formdata['soil'],
      "Address":formdata['address'],
      "type":"additional_Info",
      "irrigation":id
    }
    const url=this.url+this.dbName;
    return this.http.post(url,data,this.httpOptions);
  }

  addUser(doc: object){
    const url=this.url+this.dbName;
    return this.http.post(url, doc, this.httpOptions);

  }
  getUserData(){
    const url = this.url+this.dbName+'/_all_docs?include_docs=true';
    return this.http.get(url,this.httpOptions);

  }
  getUserDataById(id:any){
    const url=this.url+this.dbName+'/'+id;
    return this.http.get(url,this.httpOptions);
  }
  loginUser(email:any) {
    return this.http.get<any>('http://localhost:8000/getdata/' + email);
  }
  fetchDataByType(type:string,id:any){
    const url=this.url+this.dbName+'/'+ '_design/' +'newview/' + '_view/' + 'index-view' + '?include_docs=true';
    const doc ={
      "keys":[type+id]
    }
    return this.http.post(url,doc,this.httpOptions);
  }
  updateWaterData(id:any,rev:any,user:any){
    let data={
      "_id":id,
      "_rev":rev,
      "Water_food":localStorage.getItem('updatedData'),
      "Water_tree":"7000",
      "Water_non_food":"7000",
      "type":"watermanage",
      "user":user,
    }
    const url=this.url+this.dbName;
    return this.http.post<any>(url,data,this.httpOptions);
  }
}
