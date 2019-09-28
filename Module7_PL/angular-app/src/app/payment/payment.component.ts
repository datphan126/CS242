import { Component, OnInit } from '@angular/core';

interface Payment {
  [key: number]: {
    id: string;
    cardNumber: string;
    type: string;
  }
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  payments: Payment = [
    { id: '1', cardNumber: '1233-3456-4567-8795', type: 'Credit' },
    { id: '2', cardNumber: '1255-1254-9854-1325', type: 'Debit' },
    { id: '3', cardNumber: '1654-4587-0234-6254', type: 'Paypal' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
