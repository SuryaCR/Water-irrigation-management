import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
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
  value: any;
  typeSelected:string;
  value5: any;
  array: any;
  
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
    })
    this.acrouter.queryParams.subscribe(res1=>{
      this.array = res1.data1
    })
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
        this.value= data;
    });
  }

  logout(){
    this.toastr.success("success","You Logged Out");
  }

  additionalInfo(){
    this.api.fetchDataByType("additional_Info",this.user).subscribe(response4=>{
      this.value5 = response4;
      console.log(this.value5);
      console.log(this.value5.rows.length);
      if(this.value5.rows.length < 1){
        this.router.navigate(['additionalinfo'],{queryParams:{data:this.array,data1:this.user}})
        localStorage.setItem('Irrigationvalue',this.array);
      }
      else{
        this.toastr.warning("Data Exist","You already entered additional data");
        this.router.navigate(['dashboard'],{queryParams:{data:this.user}});
      }
    })
  }

}
