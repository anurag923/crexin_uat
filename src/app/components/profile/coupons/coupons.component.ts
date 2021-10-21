import { Component, OnInit } from '@angular/core';
import { CrexinService } from 'src/app/services/crexin.service';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css'],
})
export class CouponsComponent implements OnInit {
  allcuponsdata: any;
  constructor(private crexinservice: CrexinService) {}

  ngOnInit(): void {
    this.allcoupons();
  }

  allcoupons() {
    this.crexinservice.allcoupons().subscribe(
      (res) => {
        if (res) {
          console.log(res);
          this.allcuponsdata = res;
        } else {
          console.warn(res);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
