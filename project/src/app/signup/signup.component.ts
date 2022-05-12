import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,NgForm} from '@angular/forms';
// import { StoreService } from '../store.service';
import { ApiService } from '../database.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formGroup: FormGroup;
  empRecord: any = {
    firstName: '',
    lastName: '',
    email: '',
    password:'',
    mobile: '',
  };
  constructor(private fb: FormBuilder,private api:ApiService) {
    this.formGroup = this.fb.group({
      firstName: [this.empRecord.firstName],
      lastName: [this.empRecord.lastName],
      email: [this.empRecord.email],
      password:[this.empRecord.password],
      mobile: [this.empRecord.mobile],
    });
   }

  ngOnInit(): void {
  }
  get firstName() {
    return this.formGroup.get('firstName')!;
  }
  get email() {
    return this.formGroup.get('email')!;
  }
  get mobile(){
    return this.formGroup.get('mobile')!;
  }
  get password(){
    return this.formGroup.get('password')!;
  }
  storing(){
    // console.log(formdata);
    // this.store.pushData(formdata);
    this.api.add("first-db",this.formGroup.value).subscribe(res=>{
      console.log(res);
      alert("Your data was posted successfully!");
      this.empRecord.reset();
    },rej=>{
      alert("opps! Can not post data"+rej);
    });
    this.api.get("first-db").subscribe(res=>{
      console.log(res);
      alert("Your data was posted successfully!");
      this.empRecord.reset();
    },rej=>{
      alert("opps! Can not post data"+rej);
    });

    
  }
}
