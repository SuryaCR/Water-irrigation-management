import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  empRecord:any={
    email:'',
    password:''
  }

  constructor(private fb:FormBuilder,private api:DatabaseService) {
    this.formGroup = this.fb.group({
      email: [this.empRecord.email,Validators.required],
      password:[this.empRecord.password,Validators.required],
    });
   }

  ngOnInit(): void {
  }
  loginUser(){
    // console.log(this.formGroup.value);
    this.api.login("first-db",this.empRecord.email,this.empRecord.password).subscribe(res=>{
      console.log(res);
      alert("Your data retrieved successfully!");
    },rej=>{
      alert("Can not retrieve data"+rej);
    }
    );
  }

}
