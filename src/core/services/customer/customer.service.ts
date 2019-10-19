import {Injectable} from '@angular/core';
import {AbstractCrud} from '../abstract-crud/abstract-crud';
import {Customer} from '../../types/customer.interface';
import {AngularFirestore} from '@angular/fire/firestore';
import {Store} from '../../store/store';
import {Observable, of} from 'rxjs';

@Injectable()
export class CustomerService extends AbstractCrud<Customer> {
  protected collectionName = 'customers';

  constructor(db: AngularFirestore, store: Store) {
    super(db, store);
  }

  publicFakeDemographicApi(age): Observable<number> {
    return of(age + Math.floor(Math.random() * (50 - 20)) + 20);
  }


}
