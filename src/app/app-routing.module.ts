import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendingMachineComponent } from './vending-machine/vending-machine.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/vending', pathMatch: 'full' },
  { path: 'vending', component: VendingMachineComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: '**', component: VendingMachineComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
