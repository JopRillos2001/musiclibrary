import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Music } from '../models/music';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  constructor(private db: AngularFirestore) {}

  create(music: Observable<Music>, artistId: string) {
    return this.db.collection('/artists/' + artistId + '/music').add(music);
  }

  getAll(): any {
    return this.db.collectionGroup('music');
  }

  getAllById(artistId: string): any {
    return this.db.collectionGroup('music', (ref) =>
      ref.where('artistkey', '==', artistId)
    );
  }

  getOne(artistId: string, musicId: string): any {
    return this.db.doc('/artists/' + artistId + '/music/' + musicId);
  }

  update(artistId: string, music: Observable<Music>, musicId: string) {
    return this.db
      .doc('/artists/' + artistId + '/music/' + musicId)
      .update(music);
  }

  delete(artistId: string, musicId: string) {
    return this.db.doc('/artists/' + artistId + '/music/' + musicId).delete();
  }
}
