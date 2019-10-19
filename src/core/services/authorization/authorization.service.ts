import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase';
import {FirebaseUser} from '../../types/firebase-user.model';
import {Observable, Subscription} from 'rxjs';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {tap} from 'rxjs/operators';
import {Store} from '../../store/store';
import {Router} from '@angular/router';


@Injectable()
export class AuthorizationService implements OnDestroy {

  public defaultAuthProvider = new auth.GoogleAuthProvider();
  private authSub: Subscription;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private store: Store
  ) {

    const authChanges = this.angularFireAuth.authState.pipe(
      tap((user: User | null) => {
        const loggedUser = user
          ? FirebaseUser.create(user)
          : undefined;

        this.store.set('loggedUser', loggedUser);
      })
    );

    this.authSub = authChanges.subscribe();
  }

  public get currentUser(): Observable<FirebaseUser> {
    return this.store.select('loggedUser');
  }


  public async signIn(): Promise<void> {
    await this.angularFireAuth.auth.signInWithPopup(this.defaultAuthProvider);

  }

  public async signOut(): Promise<void> {
    await this.angularFireAuth.auth.signOut();
    await this.router.navigate(['/welcome']);
  }

  public ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

}
