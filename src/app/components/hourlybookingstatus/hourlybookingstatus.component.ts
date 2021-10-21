import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs/operators';
import { CrexinService } from 'src/app/services/crexin.service';
declare var $:any;

@Component({
  selector: 'app-hourlybookingstatus',
  templateUrl: './hourlybookingstatus.component.html',
  styleUrls: ['./hourlybookingstatus.component.css']
})
export class HourlybookingstatusComponent implements OnInit {
  response: any;
  message:any;
  booking_id:any;
  workstatus: any;
  ongoing = false;
  scheduled = false;
  completed = false;
  pending = false;
  booking_amount: number;
  hourly_duration: any;
  hourly_rate: any;
  loading = true;
  booked_amount:any;
  show = false;
  constructor(private fb:FormBuilder, private toastr:ToastrService,private router:Router,private http:HttpClient,private activeroute:ActivatedRoute, private route:Router, private crexinservice:CrexinService) { }
  auth_token = localStorage.getItem('auth_token');

  ngOnInit(): void {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>(`https://superuser.crexin.com/api/user/singleorder?booking_id=${localStorage.getItem('booking_id')}&id=${localStorage.getItem('b_id')}&type=${localStorage.getItem('type')}`,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
     console.log(res)
     if(res.response[0].rent.work_status === 'ongoing'){
      this.response = res.response
      this.booking_id= res.response[0].booking_id;
      this.workstatus = res.response.work_status
      console.log(this.response)
      this.hourly_duration = this.response[0].rent.duration
      console.log(this.hourly_duration)
      this.hourly_rate = this.response[0].rent.subcategory.hourly_rate
      console.log(this.hourly_rate)
      var book_amount = +this.hourly_duration*this.hourly_rate;
      this.booked_amount = book_amount;
      var servicecharge = book_amount*0.02;
      var gst = servicecharge*0.18;
      this.booking_amount = book_amount+gst;
      // this.booking_amount = +this.hourly_duration*this.hourly_rate
      // console.log(this.booking_amount);
      this.ongoing = true;
      this.scheduled = false;
      this.completed = false;
     }
     else if(res.response[0].rent.work_status === 'scheduled'&&res.response[0].rent.status === 'confirmed'){
      this.response = res.response
      this.booking_id= res.response[0].booking_id;
      this.workstatus = res.response.work_status
      console.log(this.response)
      this.hourly_duration = this.response[0].rent.duration
      console.log(this.hourly_duration)
      this.hourly_rate = this.response[0].rent.subcategory.hourly_rate
      console.log(this.hourly_rate)
      var book_amount = +this.hourly_duration*this.hourly_rate;
      this.booked_amount = book_amount;
      var servicecharge = book_amount*0.02;
      var gst = servicecharge*0.18;
      this.booking_amount = book_amount+gst;
      // this.booking_amount = +this.hourly_duration*this.hourly_rate
      // console.log(this.booking_amount);
      this.ongoing = false
      this.scheduled = true;
      this.completed = false;
     }
     else if(res.response[0].rent.work_status === 'scheduled'&&res.response[0].rent.status === 'pending'){
      this.response = res.response
      this.booking_id= res.response[0].booking_id;
      this.workstatus = res.response.work_status
      console.log(this.response)
      this.hourly_duration = this.response[0].rent.duration
      console.log(this.hourly_duration)
      this.hourly_rate = this.response[0].rent.subcategory.hourly_rate
      console.log(this.hourly_rate)
      var book_amount = +this.hourly_duration*this.hourly_rate;
      this.booked_amount = book_amount;
      var servicecharge = book_amount*0.02;
      var gst = servicecharge*0.18;
      this.booking_amount = book_amount+gst;
      // this.booking_amount = +this.hourly_duration*this.hourly_rate
      // console.log(this.booking_amount);
      this.ongoing = false
      this.scheduled = false;
      this.completed = false;
      this.pending = true;
     }
     else if(res.response[0].rent.work_status === 'completed'){
      this.response = res.response
      this.workstatus = this.response[0].rent.work_status;
      console.log(this.response)
      this.hourly_duration = this.response[0].rent.duration
      console.log(this.hourly_duration)
      this.hourly_rate = this.response[0].rent.subcategory.hourly_rate
      console.log(this.hourly_rate)
      var book_amount = +this.hourly_duration*this.hourly_rate;
      this.booked_amount = book_amount;
      var servicecharge = book_amount*0.02;
      var gst = servicecharge*0.18;
      this.booking_amount = book_amount+gst;
      // this.booking_amount = +this.hourly_duration*this.hourly_rate
      // console.log(this.booking_amount);
      this.ongoing = false
      this.scheduled = false;
      this.completed = true;
     }
     this.loading = false
    })
  }
  public cancel(){
    const data = {
      booking_id : this.booking_id
    }
    const headers = new HttpHeaders()
                  .set('content-type', 'application/json')
                  .set('Access-Control-Allow-Origin', '*')
                  .set('Authorization', `Bearer ${this.auth_token}`);
    this.http.post<any>('https://superuser.crexin.com/api/user/cancelbooking',data,{'headers':headers}).subscribe((res)=>{
      console.log(res);
      this.toastr.success(this.message,'your booking has been successfully cancelled');
      $('#proceedtopay').modal('hide');
    },
    (err)=>{
      $('#proceedtopay').modal('hide');
      console.log(err);
      this.toastr.error(this.message,'this booking has already been cancelled');
    }
    )
  }

  public complete(){
    console.log(this.booking_id);
    const data = {
      booking_id : this.booking_id
    }
    const headers = new HttpHeaders()
                  .set('content-type', 'application/json')
                  .set('Access-Control-Allow-Origin', '*')
                  .set('Authorization', `Bearer ${this.auth_token}`);
    this.http.post<any>('https://superuser.crexin.com/api/user/updatebooking',data,{'headers':headers}).subscribe((res)=>{
      console.log(res);
      // this.toastr.success('booking has been successfully completed');
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 3000);
    },
    (err)=>{
      console.log(err);
    }
    )
  }
  public back(){
    this.route.navigate(['/bookings']);
  }

  public closemodal(){
    $('#proceedtopay').modal('hide');
  }
}
