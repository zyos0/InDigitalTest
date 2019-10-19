import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FirebaseUser} from '../../../core/types/firebase-user.model';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {

  @Input()
  loggedUser: FirebaseUser;

  @Output()
  signIn = new EventEmitter<void>();

  @Output()
  signOut = new EventEmitter<void>();

  constructor() {
  }

  public signInHandler(): void {
    this.signIn.emit();
  }

  public signOutHandler(): void {
    this.signOut.emit();
  }


}
