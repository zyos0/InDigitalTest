import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../core/services/customer/customer.service';
import {Customer} from '../../../core/types/customer.interface';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  customer$: Observable<Customer>;
  subscription: Subscription;

  constructor(private customerService: CustomerService, private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }


  public get creationAttempt(): boolean {
    return !!this.route.snapshot.params.id;
  }


  public async registerCustomer(customer: Customer): Promise<void> {
    if (!this.creationAttempt) {
      await this.customerService.create(customer);
      this.snackBar.open('Customer Created Successfully', 'Dismiss', {duration: 3 * 1000});
      await this.router.navigate(['/customers']);
      return;
    }
    await this.customerService.update({...customer, id: this.route.snapshot.params.id});
    await this.router.navigate(['/customers']);
    this.snackBar.open('Customer Updated Successfully', 'Dismiss', {duration: 3 * 1000});


  }

  ngOnInit() {
    this.subscription = this.customerService.getList().subscribe();
    this.customer$ = this.customerService.getDocument(this.route.snapshot.params.id).pipe(tap(console.log));
  }

}
