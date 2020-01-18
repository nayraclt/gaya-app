import { Component, OnInit  } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  productsData: any;

  constructor(public apiService: ApiService) {
    this.productsData = [];
    this.getAllProducts();
  }

  ngOnInit() {

  }

  getAllProducts() {
    //Get saved list of students
    this.apiService.getList().subscribe(response => {
      console.log(response);
      this.productsData = response;
    })
  }


  delete(item) {
    //Delete item in Student data
    this.apiService.deleteItem(item.id).subscribe(Response => {
      //Update list after delete is successful
      this.getAllProducts();
    });
  }

}
