import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
 
const routes: Routes = [
 { path: '', redirectTo: 'customers', pathMatch: 'full' },
 { path: 'customers', component: CustomersListComponent },
 { path: 'customers/new', component: AddCustomerComponent },
 { path: 'customers/edit/:id', component: EditCustomerComponent }];
 
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }