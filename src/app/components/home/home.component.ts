import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import AOS from 'aos';
import { ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CrexinService } from 'src/app/services/crexin.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  UserEnquiry:FormGroup;
  name="";
  email="";
  mobile="";
  location="";
  description="";
  submitted = false;  
  message: string;
  auth_token = localStorage.getItem('auth_token');
  private fragment: string;
  constructor(private fb:FormBuilder,private toastr:ToastrService,private crexinservice:CrexinService, private authservice:AuthService,private router:Router,private http:HttpClient,private route: ActivatedRoute) { }

  ngOnInit(): void {
    // AOS.init();
    this.fragment = this.route.snapshot.fragment;
    this.UserEnquiry = this.fb.group({
     fullname:['',Validators.required],
     email:['', Validators.email],
     mobile:['', [Validators.required, Validators.pattern(("^((\\+91-?)|0)?[0-9]{10}$"))]],
     location:['', Validators.required],
     description:['',[Validators.required, Validators.pattern(".{50,}")]]
    })
  }

  ngAfterViewInit(): void {
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) {}
  }
  get f(){
    return this.UserEnquiry.controls
  }
 
  user_enquiry(){
    this.submitted = true;
    if(this.UserEnquiry.invalid){
      console.log("error");
      return false;
    }
    else{
      const data = {
        fullname:this.name,
        email:this.email,
        mobile:this.mobile,
        location:this.location,
        description:this.description
      }
      console.log(data);
      this.authservice.userenquiry(data).subscribe((res)=>{
        console.log(res);
        this.UserEnquiry.reset();
        this.submitted = false;
        this.toastr.success(this.message,res.response,{
          
        });
      },(error)=>{
        console.log(error);
        setTimeout(()=>{
          this.UserEnquiry.reset();
          this.submitted = false;
        },5000);
        this.toastr.error(this.message,error.error.message,{
          
        });
      })
    }
  }
  // search(search_categorie){
  //   const headers= new HttpHeaders()
  //   .set('content-type', 'application/json')
  //   .set('Access-Control-Allow-Origin', '*')
  //   .set('Authorization',`Bearer ${this.auth_token}`);
  //   this.http.get<any>('https://superuser.crexin.com/api/searchcategories?category='+search_categorie,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
  //     console.log(res);
  //     this.allcategories = res.categories;
  //     this.products = res.products;
  //     this.router.navigate(['/rent'])
  //   })
  // }
  search_button(search_categorie:any){
    if(search_categorie){
      console.log(search_categorie);
      localStorage.setItem('search_categorie', search_categorie);
      localStorage.setItem('global_search', 'true');
      localStorage.setItem('searchval',search_categorie);
      this.router.navigate(['/rent'])
    }
    else {
      this.toastr.error(this.message,'Please search for equipment category. For example: "Excavator"',{
        
      });
    }
  }

  search_button_enter(event,search_categorie:any){
    if(event.keyCode===13){
      if(search_categorie){
        console.log(search_categorie);
        localStorage.setItem('search_categorie', search_categorie);
        localStorage.setItem('global_search', 'true');
        localStorage.setItem('searchval',search_categorie);
        this.router.navigate(['/rent'])
      }
      else {
        this.toastr.error(this.message,'Please search for equipment category. For example: "Excavator"');
      }
    }
  }
}
