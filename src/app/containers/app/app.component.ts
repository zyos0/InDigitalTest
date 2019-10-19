import {Component} from '@angular/core';
import {AuthorizationService} from '../../../core/services/authorization/authorization.service';
import {FirebaseUser} from '../../../core/types/firebase-user.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'IRetTest';
  currentUser$: Observable<FirebaseUser>;


  constructor(private authService: AuthorizationService) {
    this.currentUser$ = this.authService.currentUser;
  }

  public async onSignIn(): Promise<void> {
    await this.authService.signIn();
  }

  public async onSignOut(): Promise<void> {
    await this.authService.signOut();
  }

}
