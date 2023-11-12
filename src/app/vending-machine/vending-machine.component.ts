import { Component, OnInit } from '@angular/core';
import { HttpService } from '../requests/http.service';
import { DataService } from '../data/data.service';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.scss']
})
export class VendingMachineComponent implements OnInit {

constructor(private dataService: DataService){}

  ngOnInit(): void {
  
  }
}
