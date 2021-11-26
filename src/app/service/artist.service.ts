import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  constructor(private db: AngularFirestore) {}

  create(artist: Observable<Artist>) {
    return this.db.collection('/artists').add(artist);
  }

  getAll(): any {
    return this.db.collection('/artists');
  }

  getOne(artistId: string): AngularFirestoreDocument<Artist> {
    return this.db.doc('/artists/' + artistId);
  }

  update(artistId: string, artist: Observable<Artist>) {
    return this.db.doc('/artists/' + artistId).update(artist);
  }

  delete(artistId: string) {
    return this.db.doc('/artists/' + artistId).delete();
  }
}
