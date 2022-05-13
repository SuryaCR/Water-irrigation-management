import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,NgForm,Validators} from '@angular/forms';
// import { StoreService } from '../store.service';
import { DatabaseService } from '../database.service';
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
  constructor(private fb: FormBuilder,private api:DatabaseService) {
    this.formGroup = this.fb.group({
      firstName: [this.empRecord.firstName,Validators.required],
      lastName: [this.empRecord.lastName,Validators.required],
      email: [this.empRecord.email,Validators.required],
      password:[this.empRecord.password,Validators.required],
      mobile: [this.empRecord.mobile,Validators.required],
    });
   }

  ngOnInit(): void {
  }
  get firstName() {
    return this.formGroup.get('firstName')!;
  }
  get lastName() {
    return this.formGroup.get('lastName')!;
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
