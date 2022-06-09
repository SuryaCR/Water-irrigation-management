import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  record: any = {
    email: '',
    password: '',
    type: 'login'
  };
  
  email: any;
  password: any;
  type: any;
  id: any;
  value: any;
  array: any;
  private _id: any;
  typeSelected: string;

  constructor(private fb:FormBuilder,private api:DatabaseService,private router:Router,private toastr:ToastrService,private spinner:NgxSpinnerService) {
    this.formGroup = this.fb.group({

      email: [this.record.email,[Validators.required]],
      password: [this.record.password,[Validators.required]],
      type: [this.record.type]
    });
    this.typeSelected = 'ball-fussion'; 
   }

   public showSpinner():void {
    this.spinner.show();
    

    setTimeout(() => {
      this.spinner.hide();
      this.toastr.success("success","Logged In");
      this.router.navigate(['/dashboard'],{queryParams:{data:this._id}})
   },2000);
    
}

  ngOnInit(): void {console.log();}
  
  userLogin(formValue: any) {
    this.email = formValue.email;
    this.password = formValue.password;
    this.api.loginUser(this.email).subscribe(data => {
      console.log(data);
      this.value = data;
      this.array = this.value.docs;
      this._id = this.array[0]?._id;
      
        if(data.docs.length<=0){
          this.toastr.error("Enter Valid User Name","User Doesn't Exist")
        }
        else if(data.docs[0].password == this.password){
          this.showSpinner();
        }
        else{
          this.toastr.error("Enter Valid Password","Invalid User & Password");
        }
      
      
    })
  }         

  
}

