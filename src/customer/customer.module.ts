import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomerRoutingModule, routedComponents, renderComponents} from './customer.routing.module';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatSnackBarModule, MatSortModule, MatTableModule, MatToolbarModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    ...renderComponents,
    ...routedComponents
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    SweetAlert2Module,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule
  ]
})
export class CustomerModule {
}
