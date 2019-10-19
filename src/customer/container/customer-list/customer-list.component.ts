import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CustomerService} from '../../../core/services/customer/customer.service';
import {Customer} from '../../../core/types/customer.interface';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {SweetAlertType} from 'sweetalert2';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('confirmationSwal', {static: true})
  private readonly confirmationSwal: SwalComponent;
  public fakeLifeExpectancyApi = this.customerService.publicFakeDemographicApi;

  dataSource: MatTableDataSource<Customer>;
  displayedColumns: string[] = ['firstName', 'lastName', 'age', 'birthdate', 'expectancy', 'actions'];
  displayedFooterColumns: string[] = ['title', 'value', 'title1', 'value1'];
  dataSourceSubscription: Subscription;
  arrDataSource: Customer[] = [];
  public isLoading = true;
  ageStandardDeviation: number;
  ageAverage: number;


  constructor(private customerService: CustomerService, private snackBar: MatSnackBar) {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.dataSourceSubscription = this.customerService.getList().pipe(
      tap(list => {
        this.ageAverage = this.calculateAgeAvg(list);
        this.ageStandardDeviation = this.calculateAgeDeviation(this.ageAverage, list);
        this.arrDataSource = list;
        this.dataSource = new MatTableDataSource(this.arrDataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      })
    ).subscribe();
  }

  private calculateAgeAvg(set: Customer[]) {
    return set.reduce(
      (acc: number, customer: Customer) => {
        return acc + customer.age;
      },
      0
    ) / set.length;
  }

  private calculateAgeDeviation(avg: number, set: Customer[]) {
    return Math.sqrt(
      set.reduce(
        (acc: number, customer: Customer) => {
          return acc + Math.pow(customer.age - avg, 2);
        },
        0
      ) / (set.length - 1)
    );
  }

  public ngOnDestroy(): void {
    this.dataSourceSubscription.unsubscribe();
  }

  public async deleteCustomer(id: string): Promise<void> {
    const swalOpts = {
      title: 'User Deletion',
      text: 'Are you Sure',
      type: 'question' as SweetAlertType,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCancelButton: true,

    };
    this.confirmationSwal.swalOptions = swalOpts;
    const confirm = await this.confirmationSwal.fire();

    if (!confirm.value) {
      return;
    }

    const deletion = await this.customerService.delete(id);
    this.snackBar.open('Customer Successfully deleted!', 'Dismiss', {duration: 3 * 1000});
  }

}
