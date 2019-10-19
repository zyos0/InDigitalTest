import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerListComponent} from './container/customer-list/customer-list.component';
import {CustomerDetailComponent} from './container/customer-detail/customer-detail.component';
import {CustomerFormComponent} from './components/customer-form/customer-form.component';

const routes: Routes = [
  {path: '', component: CustomerListComponent},
  {path: 'new', component: CustomerDetailComponent},
  {path: ':id', component: CustomerDetailComponent}
];

export const routedComponents = [CustomerListComponent, CustomerDetailComponent];

export const renderComponents = [CustomerFormComponent];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  }
)
export class CustomerRoutingModule {
}
