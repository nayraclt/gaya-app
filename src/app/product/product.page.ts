import { Component, OnInit } from '@angular/core';
import {Product} from "../models/product";
import {ApiService} from "../services/api.service";

import { NavController, LoadingController } from "@ionic/angular";

import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  name: string;
  data: Product



  constructor(
      public apiService: ApiService,
      public router: Router,
      public nav:NavController,
      public loading: LoadingController
  ) {
    this.data = new Product();
  }

  ngOnInit() {
  }

  salvarProduto() {
    this.apiService.createItem(this.data).subscribe((response) => {
      this.router.navigate(['/'], { skipLocationChange: true})
    });

  }
}
