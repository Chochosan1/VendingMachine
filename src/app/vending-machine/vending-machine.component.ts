import { Component, OnInit } from '@angular/core';
import { HttpService } from '../requests/http.service';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.scss']
})
export class VendingMachineComponent implements OnInit {

constructor(private httpService: HttpService){}

  ngOnInit(): void {
    this.httpService.getProducts().subscribe((value) => {console.log(value)}); //test communication
  }
}
