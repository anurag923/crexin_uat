import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  subscribe:FormGroup;
  submitted = false;
  message:any;
  email="";
  constructor(private fb:FormBuilder,private toastr:ToastrService,private http:HttpClient) { }

  ngOnInit(): void {
    this.subscribe = this.fb.group({
      email:['', [Validators.required,Validators.email]]
     })
  }
  get f(){
    return this.subscribe.controls
  }

  public subscription(){
    this.submitted = true;
    if(this.subscribe.invalid){
      console.log("hello");
      return false;
    }
    else{
      const data = {
        email:this.email
      }
      console.log(data);
      this.http.post<any>('https://superuser.crexin.com/api/user/subscribe',data).subscribe((res)=>{
        this.toastr.success(this.message,res.response)
        this.subscribe.reset();
        this.submitted = false;
      },
      (error)=>{
        this.toastr.error(this.message,error.error.message);
        this.subscribe.reset();
        this.submitted = false;
      }
      )
    }
  }
}
