import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import firebase from 'firebase';
import { Observable } from 'rxjs/internal/Observable';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFirestore) {}

  update(user: firebase.User) {
    this.db
      .doc('/users/' + user.uid)
      .update({
        name: user.displayName,
        email: user.email,
      })
      .then(() => console.log('user saved successfully'))
      .catch((reason: any) => this.save(user));
  }
  save(user: firebase.User) {
    this.db
      .doc('/users/' + user.uid)
      .set(
        {
          name: user.displayName,
          email: user.email,
          isAdmin: false,
        },
        { merge: true }
      )
      .then(() => console.log('user saved successfully'))
      .catch((reason: any) => console.log('user save failed:', reason));
  }

  get(uid: string): Observable<AppUser> {
    return this.db.doc('/users/' + uid).valueChanges() as Observable<AppUser>;
  }

  getAll(): any {
    return this.db.collection('/users');
  }

  updateRole(useruid: string, value: boolean) {
    this.db
      .doc('/users/' + useruid)
      .update({
        isAdmin: value,
      })
      .then(() => console.log('user updated successfully'))
      .catch((reason: any) => console.log('user update failed:', reason));
  }
}
