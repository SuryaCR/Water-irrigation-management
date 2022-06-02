import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators} from '@angular/forms';
import { DatabaseService } from '../database.service';
import { Router } from '@angular/router';

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

  constructor(private fb:FormBuilder,private api:DatabaseService,private router:Router) {
    this.formGroup = this.fb.group({

      email: [this.record.email,[Validators.required]],
      password: [this.record.password,[Validators.required]],
      type: [this.record.type]
    });
   }

  ngOnInit(): void {
  }
  login(formValue: any) {
    this.email = formValue.email;
    this.password = formValue.password;
    this.api.userLogin(this.email, this.password).subscribe(data => {
      this.value = data;
      this.array = this.value.docs;
      this._id = this.array[0]?._id;
      
      if ((data.docs[0].password == this.password)) {

        // localStorage.setItem('userValue', this._id);
        console.log('success');
      this.router.navigate(['/dataview'],{queryParams:{data:this._id}})
      }
      else {
        console.log('error');
      }
    })
  }         

  
}

