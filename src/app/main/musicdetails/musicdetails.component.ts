import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { MusicService } from '../../service/music.service';
import { ArtistService } from '../../service/artist.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Music } from 'src/app/models/music';
import { Artist } from 'src/app/models/artist';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { PlaylistService } from 'src/app/service/playlist.service';
import { AppUser } from 'src/app/models/app-user';
import { AuthService } from 'src/app/service/auth.service';
import { MusicComponent } from '../music/music.component';
import { Playlist } from 'src/app/models/playlist';

@Component({
  selector: 'musicdetails',
  templateUrl: './musicdetails.component.html',
  styleUrls: ['./musicdetails.component.css'],
})
export class MusicdetailsComponent implements OnInit, OnDestroy {
  songname: Observable<string>;
  songkey: string;
  artist: Observable<string>;
  artistkey: string;
  genre: Observable<string>;
  userkey: string;
  username: string;
  inplaylist: Observable<any>;
  resultsize: number;

  constructor(
    private musicService: MusicService,
    private route: ActivatedRoute,
    public auth: AuthService,
    public playlistService: PlaylistService,
    private artistService: ArtistService
  ) {}
  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser) => this.initFunc(appUser));
  }

  initFunc(appUser: AppUser) {
    (this.userkey = appUser.email),
      (this.username = appUser.name),
      (this.songkey = this.route.snapshot.paramMap.get('mid'));
    this.artistkey = this.route.snapshot.paramMap.get('id');

    if (this.songkey) {
      this.songname = this.musicService
        .getOne(this.artistkey, this.songkey)
        .valueChanges()
        .pipe(map((music: Music) => music.songname));
    }

    if (this.songkey) {
      this.artist = this.artistService
        .getOne(this.artistkey)
        .valueChanges()
        .pipe(map((artist: Artist) => artist.name));
    }

    if (this.songkey) {
      this.genre = this.musicService
        .getOne(this.artistkey, this.songkey)
        .valueChanges()
        .pipe(map((music: Music) => music.genre));
    }

    if (this.songkey) {
      this.inplaylist = this.playlistService
        .getAllByStatus(this.userkey, this.songkey)
        .valueChanges()
        .pipe(
          map((playlist: Playlist[]) => {
            if (playlist.length === 0) return false;
            return true;
          })
        );
    }
  }

  addToPlaylist(
    key: string,
    songname: string,
    genre: string,
    artist: string,
    artistkey: string
  ) {
    this.playlistService.create(
      key,
      songname,
      genre,
      artist,
      artistkey,
      this.username,
      this.userkey
    );
  }

  ngOnDestroy() {}
}
