import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendingMachineComponent } from './vending-machine/vending-machine.component';

const routes: Routes = [
  { path: '', redirectTo: '/vending', pathMatch: 'full' },
  { path: 'welcome', component: VendingMachineComponent },
  { path: '**', component: VendingMachineComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
