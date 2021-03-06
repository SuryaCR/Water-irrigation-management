import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {FormBuilder} from '@angular/forms';
import { DatabaseService } from '../database.service';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  alldata:any;
  object:any=[];
  user: any;
  userValue: any;
  typeSelected:string;
  additionalValue: any;
  irrigationId: any;
  
  constructor(private acrouter:ActivatedRoute,private router:Router,private api:DatabaseService,private fb:FormBuilder,private toastr:ToastrService,private spinner:NgxSpinnerService) {
    this.typeSelected = 'ball-fussion'; 
  }
  public showSpinner():void {
    this.spinner.show();
    

    setTimeout(() => {
      this.spinner.hide();
    this.router.navigate(['/dataview'],{queryParams:{data:this.user}});
   },2000);
    
}

  ngOnInit(): void {
    this.acrouter.queryParams.subscribe(res=>{
      this.user=res.data
    },rej=>{console.log(rej)})
    this.acrouter.queryParams.subscribe(res1=>{
      this.irrigationId = res1.data1
    },rej=>{console.log(rej)})
    this.getUserData();
  }
  watermanagePage(){
    this.router.navigate(['watermanage'],{queryParams:{data:this.user}})
  }
  irrigationPage(){
    this.router.navigate(['userdata'],{queryParams:{data:this.user}})
  }

  getUserData(){
    this.api.getUserDataById(this.user).subscribe(data=>{
        this.userValue= data;
    },rej=>{
      console.log(rej);
    });
  }

  logout(){
    this.toastr.success("success","You Logged Out");
    localStorage.clear();
  }

  additionalInfo(){
    this.api.fetchDataByType("additional_Info",this.user).subscribe(response4=>{
      this.additionalValue = response4;
      console.log(this.additionalValue);
      console.log(this.additionalValue.rows.length);
      if(this.additionalValue.rows.length < 1){
        this.router.navigate(['additionalinfo'],{queryParams:{data:this.irrigationId,data1:this.user}})
        localStorage.setItem('Irrigationvalue',this.irrigationId);
      }
      else{
        this.toastr.warning("Data Exist","You already entered additional data");
        this.router.navigate(['dashboard'],{queryParams:{data:this.user}});
      }
    },rej=>{
      console.log(rej);
    })
  }

}
