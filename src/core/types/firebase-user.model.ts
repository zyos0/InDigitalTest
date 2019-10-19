export class FirebaseUser {

  constructor(public displayName: string, public  email: string, public photoURL: string) {
  }

  static create<T extends FirebaseUser>(rawInstance: T): FirebaseUser {
    return new FirebaseUser(rawInstance.displayName, rawInstance.email, rawInstance.photoURL);
  }


}
