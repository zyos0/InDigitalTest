import {BaseModel} from './base.model';
import {firestore} from 'firebase';


export interface Customer extends BaseModel {
  firstName: string;
  lastName: string;
  age: number;
  birthdate: Date | firestore.Timestamp;
}
