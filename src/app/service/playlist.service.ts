import { Injectable, OnDestroy } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { Playlist } from '../models/playlist';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService implements OnDestroy {
  constructor(private db: AngularFirestore, private auth: AuthService) {}
  ngOnDestroy(): void {}

  create(
    songkey: string,
    songname: string,
    genre: string,
    artist: string,
    artistkey: string,
    username: string,
    userkey: string
  ) {
    return this.db.collection('/users/' + userkey + '/playlist').add({
      songkey: songkey,
      songname: songname,
      genre: genre,
      artist: artist,
      artistkey: artistkey,
      username: username,
      userkey: userkey,
    });
  }

  getAll(): any {
    return this.db.collectionGroup('playlist');
  }

  getAllById(userId: string): any {
    return this.db.collectionGroup('playlist', (ref) =>
      ref.where('userkey', '==', userId)
    );
  }

  getAllByStatus(userId: string, songId: string): any {
    return this.db.collection('/users/' + userId + '/playlist', (ref) =>
      ref.where('songkey', '==', songId)
    );
  }

  getOne(userId: string, playlistId: string): any {
    return this.db.doc('/users/' + userId + '/playlist/' + playlistId);
  }

  update(userId: string, playlist: Observable<Playlist>, playlistId: string) {
    return this.db
      .doc('/users/' + userId + '/playlist/' + playlistId)
      .update(playlist);
  }

  delete(userId: string, playlistId: string) {
    return this.db.doc('/users/' + userId + '/playlist/' + playlistId).delete();
  }
}
