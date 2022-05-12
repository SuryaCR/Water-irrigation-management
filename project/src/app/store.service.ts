import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  empRecord:any[]=[{
  firstName : "",
  lastName : "",
  mobile : "",
  password:"",
  email : "",
  }
  
  ];

  newrecord:any[] = [];
  constructor() { }
  pushData(data:any = {}) {
   this.newrecord.push(data);
    console.log("after Pushing" , this.newrecord);

}
}
