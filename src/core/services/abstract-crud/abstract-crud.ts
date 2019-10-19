import {AngularFirestore} from '@angular/fire/firestore';
import {defer, from, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {BaseModel} from '../../types/base.model';
import {Store} from '../../store/store';

export abstract class AbstractCrud<T extends BaseModel> {
  protected abstract collectionName: string;

  constructor(protected db: AngularFirestore, protected store: Store) {
  }


  public getList(): Observable<T[]> {
    return this.db.collection(this.collectionName)
      .snapshotChanges()
      .pipe(
        map(collection => collection.map(
          elem => ({...elem.payload.doc.data(), id: elem.payload.doc.id}) as T
        )),
        tap(collection => this.store.set(this.collectionName, collection))
      );
  }

  public getDocument(id: string): Observable<T> {
    return this.store.select<T[]>(this.collectionName).pipe(
      map((collection: T[]) => collection.find(elem => elem.id === id))
    );
  }


  public create(record: T): Promise<any> {
    return this.db.collection(this.collectionName)
      .add(record);
  }

  public update(Record: T): Promise<any> {
    const {id, ...payload} = Record;
    return this.db.collection(this.collectionName).doc(id).update(payload);
  }

  public delete(id: string): Promise<any> {
    return this.db.collection(this.collectionName).doc(id).delete();
  }

}
