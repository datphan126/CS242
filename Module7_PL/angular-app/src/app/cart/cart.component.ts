import { Component, OnInit } from '@angular/core';

interface Cart {
  [key: number]: {
    id: string;
    name: string;
    price: number;
    qty: number;
  }

};

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: Cart = [
    { id: '1', name: 'Beats Headphones', price: 30, qty: 4 },
    { id: '2', name: 'Razer Mouse', price: 60, qty: 7 },
    { id: '3', name: 'Intel Core i9', price: 500, qty: 15 },
    { id: '4', name: 'Corsair 4x8GB', price: 450, qty: 10 },
  ];

  constructor() { }

  ngOnInit() {
  }

}
