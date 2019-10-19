import {BehaviorSubject, Observable} from 'rxjs';
import {FirebaseUser} from '../types/firebase-user.model';
import {Customer} from '../types/customer.interface';
import {distinctUntilChanged, pluck} from 'rxjs/operators';
import {Injectable} from '@angular/core';

interface State {
  loggedUser: FirebaseUser;
  customers: Customer[];

  [key: string]: any;
}

const initialState: State = {
  loggedUser: undefined,
  customers: []
};
@Injectable()
export class Store {

  private subject = new BehaviorSubject<State>(initialState);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, state: any) {
    this.subject.next({...this.value, [name]: state});
  }

}
