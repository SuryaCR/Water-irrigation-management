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
      "Date":formdata['date'],
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

  addAdditionalInfo(formdata:any,id:any,user:any){
    let data={
      "Soil":formdata['soil'],
      "Address":formdata['address'],
      "type":"additional_Info",
      "irrigation":id,
      "user":user
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
  updateWaterData(id:any,formValue:any,user:any,waterData:any){
    let data={
      "_id":id,
      "_rev":formValue._rev,
      "Water_food":formValue.Water_food,
      "Water_tree":formValue.Water_tree,
      "Water_non_food":formValue.Water_non_food,
      "Remain_food_water":waterData,
      "Remain_tree_water":formValue.Remain_tree_water,
      "Remain_non_food_water":formValue.Remain_non_food_water,
      "Date":formValue.date,
      "type":"watermanage",
      "user":user,
    }
    const url=this.url+this.dbName;
    return this.http.post<any>(url,data,this.httpOptions);
  }

  updateWaterTreeData(id:any,formValue:any,user:any,waterData:any){
    let data={
      "_id":id,
      "_rev":formValue._rev,
      "Water_food":formValue.Water_food,
      "Water_tree":formValue.Water_tree,
      "Water_non_food":formValue.Water_non_food,
      "Remain_food_water":formValue.Remain_food_water,
      "Remain_tree_water":waterData,
      "Remain_non_food_water":formValue.Remain_non_food_water,
      "Date":formValue.date,
      "type":"watermanage",
      "user":user,
    }
    const url=this.url+this.dbName;
    return this.http.post<any>(url,data,this.httpOptions);
  }

  updateWaterNonData(id:any,formValue:any,user:any,waterData:any){
    let data={
      "_id":id,
      "_rev":formValue._rev,
      "Water_food":formValue.Water_food,
      "Water_tree":formValue.Water_tree,
      "Water_non_food":formValue.Water_non_food,
      "Remain_food_water":formValue.Remain_food_water,
      "Remain_tree_water":formValue.Remain_tree_water,
      "Remain_non_food_water":waterData,
      "Date":formValue.date,
      "type":"watermanage",
      "user":user,
    }
    const url=this.url+this.dbName;
    return this.http.post<any>(url,data,this.httpOptions);
  }

    
emailDuplication(email: string,type: string) {
  let url = this.url +this.dbName+'/_find'
  let loginData = {
    selector: {
      type: type,
      email: email,
    },
    fields: ["_id", "firstName", "email"]
  };
  return this.http.post(url, loginData, this.httpOptions)
}

}
