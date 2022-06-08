import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { DatabaseService } from '../database.service';
import {ToastrService} from 'ngx-toastr'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  alldata:any;
  object:any=[];
  user: any;
  value: any;

  formGroup: FormGroup;
  record: any = {
    feedback: '',
  };
  constructor(private acrouter:ActivatedRoute,private router:Router,private api:DatabaseService,private fb:FormBuilder,private toastr:ToastrService) { 
    this.formGroup = this.fb.group({
      feedback: [this.record.feedback,Validators.required],
    });
  }

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(res=>{
      this.user=res.data
    })
    this.getUserData();
  }
  watermanagePage(){
    this.router.navigate(['watermanage'],{queryParams:{data:this.user}})
  }
  irrigationPage(){
    this.router.navigate(['userdata'],{queryParams:{data:this.user}})
  }
  dataviewPage(){
    this.router.navigate(['dataview'],{queryParams:{data:this.user}})
  }
  getUserData(){
    this.api.getUserDataById(this.user).subscribe(data=>{
        this.value= data;
    });
  }

  get feedback() {
    return this.formGroup.get('feedback')!;
  }

  getFeedBack(){
    console.log(this.formGroup.value);
  }

  logout(){
    this.toastr.success("success","You Logged Out");
  }
}
