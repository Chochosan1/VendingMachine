import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockDataService } from './mockDatabase/mock-data.service';
import { VendingMachineComponent } from './vending-machine/vending-machine.component';

@NgModule({
  declarations: [
    AppComponent,
    VendingMachineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(MockDataService, { delay: 1000 }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
