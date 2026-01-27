import { Component, inject } from '@angular/core';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var Razorpay: any;
@Component({
  selector: 'app-paidsubscription',
  imports: [],
  templateUrl: './paidsubscription.component.html',
  styleUrl: './paidsubscription.component.css'
})
export class PaidsubscriptionComponent {


userId = Number(localStorage.getItem('userId'));
fullname=localStorage.getItem('fullname');
email=localStorage.getItem('email');

auths=inject(AuthService);
  plan = {
    name: 'Premium',
    amount: 999,
    durationDays: 30
  };

  constructor(private payService: PaymentService,private router:Router) {}
hid=this.auths.gethospitalId();
did=this.auths.getDoctorId();
  payNow() {
    debugger;
    this.payService.createOrder({
      userId: this.userId,
      amount: this.plan.amount
    }).subscribe((order: any) => {
debugger;
      const options = {
        key: 'rzp_test_S5dSTtkPQxynUP',
        amount: order.amount,
        currency: 'INR',
        name: 'Hospital App',
        description: 'Premium Subscription',
        order_id: order.id,

        handler: (response: any) => {
          this.verifyPayment(response);
          debugger;
        },
         prefill: {
        name: this.fullname,
        email: this.email
      },
      theme: {
        color: '#3399cc'
      }
      };

      const rzp = new Razorpay(options);
      rzp.open();
    });
  }

  verifyPayment(response: any) {
    this.payService.verifyPayment({
      userId: this.userId,
      razorpayPaymentId: response.razorpay_payment_id,
      razorpayOrderId: response.razorpay_order_id,
      razorpaySignature: response.razorpay_signature,
      planName: this.plan.name,
      durationDays: this.plan.durationDays,
      amount: this.plan.amount
    }).subscribe(() => {
      alert('Subscription Activated, Now you can access premium features!');
      this.router.navigate(['/appointments/hospital/' + this.hid + '/doctor/' + this.did]);
      
    });
  }


}
