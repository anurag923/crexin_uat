import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { shareReplay } from 'rxjs/operators';
import { CrexinService } from 'src/app/services/crexin.service';
import { WindowRefService } from 'src/app/window-ref.service';
import { DatePipe } from '@angular/common';
declare var $:any;
@Component({
  selector: 'app-dailybookingstatus',
  templateUrl: './dailybookingstatus.component.html',
  styleUrls: ['./dailybookingstatus.component.css'],
  providers: [DatePipe]
})
export class DailybookingstatusComponent implements OnInit {
  response: any;
  workstatus: any;
  ongoing = false;
  scheduled = false;
  completed = false;
  pending = false;
  booking_amount: number;
  daily_duration: any;
  daily_rate: any;
  loading = true;
  booked_amount:any;
  message: any;
  disable = true;
  show = false;
  booking_id:any;
  constructor(private datePipe: DatePipe, private fb:FormBuilder, private toastr:ToastrService,private router:Router,private http:HttpClient,private activeroute:ActivatedRoute, private route:Router, private crexinservice:CrexinService,private winRef: WindowRefService) { }
  auth_token = localStorage.getItem('auth_token');

  ngOnInit(): void {
    const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Authorization',`Bearer ${this.auth_token}`);
    this.http.get<any>(`https://superuser.crexin.com/api/user/singleorder?booking_id=${localStorage.getItem('booking_id')}&id=${localStorage.getItem('b_id')}&type=${localStorage.getItem('type')}`,{'headers':headers}).pipe(shareReplay(1)).subscribe((res)=>{
     console.log(res)
     if(res.response[0].payment_status==='initial'){
       this.disable = true;
     }
     else{
       this.disable = false;
     }
     if(res.response[0].rent.work_status === 'ongoing'){
      this.response = res.response;
      console.log(this.response.payment_status);
      this.workstatus = res.response.work_status;
      this.booking_id= res.response[0].booking_id;
      console.log(this.booking_id)
      this.daily_duration = this.response[0].rent.duration
      console.log(this.daily_duration)
      this.daily_rate = this.response[0].rent.subcategory.daily_rate
      console.log(this.daily_rate)
      var book_amount = +this.daily_duration*this.daily_rate;
      this.booked_amount = book_amount;
      var servicecharge = book_amount*0.02;
      var gst = servicecharge*0.18;
      this.booking_amount = book_amount+gst; 
      // this.booking_amount = +this.daily_duration*this.daily_rate
      // console.log(this.booking_amount);
      this.ongoing = true;
      this.scheduled = false;
      this.completed = false;
     }
     else if(res.response[0].rent.work_status === 'scheduled'&&res.response[0].rent.status=='confirmed'){
      this.response = res.response
      this.booking_id= res.response[0].booking_id;
      this.workstatus = res.response.work_status
      console.log(this.response)
      this.daily_duration = this.response[0].rent.duration
      console.log(this.daily_duration)
      this.daily_rate = this.response[0].rent.subcategory.daily_rate
      console.log(this.daily_rate)
      var book_amount = +this.daily_duration*this.daily_rate;
      this.booked_amount = book_amount;
      var servicecharge = book_amount*0.02;
      var gst = servicecharge*0.18;
      this.booking_amount = book_amount+gst;
      // this.booking_amount = +this.daily_duration*this.daily_rate
      // console.log(this.booking_amount);
      this.ongoing = false
      this.scheduled = true;
      this.completed = false;
     }
     else if(res.response[0].rent.work_status === 'scheduled'&&res.response[0].rent.status=='pending'){
      this.response = res.response
      this.booking_id= res.response[0].booking_id;
      this.workstatus = res.response.work_status
      console.log(this.response)
      this.daily_duration = this.response[0].rent.duration
      console.log(this.daily_duration)
      this.daily_rate = this.response[0].rent.subcategory.daily_rate
      console.log(this.daily_rate)
      var book_amount = +this.daily_duration*this.daily_rate;
      this.booked_amount = book_amount;
      var servicecharge = book_amount*0.02;
      var gst = servicecharge*0.18;
      this.booking_amount = book_amount+gst;
      // this.booking_amount = +this.daily_duration*this.daily_rate
      // console.log(this.booking_amount);
      this.ongoing = false
      this.scheduled = false;
      this.completed = false;
      this.pending = true;
     }
     else if(res.response[0].rent.work_status === 'completed'){
      this.response = res.response
      this.workstatus = res.response[0].rent.work_status;
      console.log(this.response)
      this.daily_duration = this.response[0].rent.duration
      console.log(this.daily_duration)
      this.daily_rate = this.response[0].rent.subcategory.daily_rate
      console.log(this.daily_rate)
      var book_amount = +this.daily_duration*this.daily_rate;
      this.booked_amount = book_amount;
      var servicecharge = book_amount*0.02;
      var gst = servicecharge*0.18;
      this.booking_amount = book_amount+gst;
      // this.booking_amount = +this.daily_duration*this.daily_rate
      // console.log(this.booking_amount);
      this.ongoing = false
      this.scheduled = false;
      this.completed = true;
     }
     this.loading = false
    })
  }
  public pay_ongoing(amount:any,id:any,paymentstatus:any,end_date:string,duration:string){
    var currentdate = new Date();
    var transformcurrentdate = this.datePipe.transform(currentdate,'yyyy-MM-dd');
    console.log(transformcurrentdate);
    console.log(end_date);
    if(paymentstatus==='paid'){
      this.toastr.error('you have already made the payment');
    }
    else{
      if(transformcurrentdate >= end_date){
        console.log('pay');
        const formData = {
          amount: +amount*100,
          currency: 'INR',
          receipt: this.makeid(10),
        };
        this.http.post<any>('https://superuser.crexin.com/api/user/order_id',formData).subscribe(
        (res) => {
          console.log(res);
          res.id;
          // this.router.navigate(['/patient/payment']);
          const options: any = {
            key: 'rzp_test_89ZbQ2LKtoRyRs',
            amount: +amount*100, // amount should be in paise format to display Rs 1255 without decimal point
            // amount: Math.floor(+sessionStorage.getItem('amount')*100),
            currency: 'INR',
            name: '', // company name or product name
            description: '', // product description
            image: '../assets/images/Log_one.png', // company logo or product image
            order_id: res.id, // order_id created by you in backend
            modal: {
              // We should prevent closing of the form when esc key is pressed.
              escape: false,
            },
            notes: {
              // include notes if any
            },
            theme: {
              color: '#dca101',
            },
          };
          console.log(options);
          options.handler = (response, error) => {
            options.response = response;
            console.log(response);
            console.log(options);
            const data = {
              order_id: res.id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
            console.log(data);
            this.http.post<any>('https://superuser.crexin.com/api/user/signature',data).subscribe(
              (res) => {
                console.log(res);
                const paymentdata = {
                  id:id
                }
                const headers = new HttpHeaders()
                    .set('content-type', 'application/json')
                    .set('Access-Control-Allow-Origin', '*')
                    .set('Authorization', `Bearer ${this.auth_token}`);
                this.http.post<any>('https://superuser.crexin.com/api/user/paymentupdate',paymentdata,{'headers':headers}).subscribe((res)=>
                {
                  console.log(res);
                  window.location.reload();
                },
                (err)=>{
                  console.log(err);
                }
                )
              },
              (err) => {
                this.toastr.error(this.message, 'Payment failed', {
                  positionClass: 'toast-top-center',
                });
              }
            );
          };
          options.modal.ondismiss = () => {
            console.log('Transaction cancelled.');
          };
          const rzp = new this.winRef.nativeWindow.Razorpay(options);
          rzp.open();
        },
        (err) => {
          console.log(err);
        }
      );
        
      }
      else{
        console.log('dont pay');
        this.toastr.error('please wait for the scheduled date to make the payment');
      }
    }
  }

  private makeid(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
      $('#proceedtopay').modal('hide');
      this.toastr.success(this.message,'your booking has been successfully cancelled');
    },
    (err)=>{
      console.log(err);
      $('#proceedtopay').modal('hide');
      this.toastr.error(this.message,'this booking has already been cancelled');
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
