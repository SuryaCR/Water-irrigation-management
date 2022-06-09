import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formGroup: FormGroup;
  record: any = {
    firstName: '',
    lastName: '',
    email: '',
    password:'',
    mobile: '', 
    type:'user'
  };
  customer:any;
  value: any;
  array: any;
  private _id: any;
  sample: any;
  temp: any;
  
  constructor(private fb: FormBuilder,public api:DatabaseService,private router:Router,private toastr:ToastrService) {
    this.formGroup = this.fb.group({
      firstName: [this.record.firstName,[Validators.required,Validators.minLength(3)]],
      lastName: [this.record.lastName,Validators.required],
      email: [this.record.email,Validators.required],
      password:[this.record.password,[Validators.required,Validators.minLength(6)]],
      mobile: [this.record.mobile,[Validators.required,Validators.minLength(10),Validators.min(6000000000)]],
      type:'user',
    });
   }

  ngOnInit(): void {
    console.log();
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

  addUserData(){

    this.api.emailDuplication(this.formGroup.value.email,"user").subscribe(response=>{
      this.sample = response
      this.temp = this.sample.docs.length
      console.log(this.temp);
      if(this.temp ==0){
        this.api.addUser(this.formGroup.value).subscribe(res=>{
          console.log("Your data was posted successfully!"+res);
          this.toastr.success("success","Please Log In");
          this.router.navigate(['/login']);
    
        },rej=>{
          console.log("Can not post data"+rej);
        });
      }
      else{
        this.toastr.error("error","Email Already Exist");
      }
    },rej=>{
      console.log(rej);
    })
  }

}
