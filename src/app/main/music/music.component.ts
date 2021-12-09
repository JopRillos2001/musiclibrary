import {
  AfterViewInit,
  Component,
  Input,
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

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Music } from 'src/app/models/music';
import { Playlist } from 'src/app/models/playlist';
import { AuthService } from 'src/app/service/auth.service';
import { AppUser } from 'src/app/models/app-user';
import { PlaylistService } from 'src/app/service/playlist.service';
import { CdkRowDef } from '@angular/cdk/table';

@Component({
  selector: 'music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css'],
})
export class MusicComponent implements OnInit, OnDestroy {
  music: Music[];
  filteredMusic: Music[];
  subscription: Subscription;
  playlist: Playlist;
  playlist$: Observable<Playlist>;
  userkey: string;
  username: string;

  displayedColumns: string[] = ['songname', 'artist', 'genre', 'playlist'];
  dataSource: MatTableDataSource<Music>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private musicService: MusicService,
    public auth: AuthService,
    public playlistService: PlaylistService
  ) {}
  async ngOnInit() {
    this.auth.appUser$.subscribe((appUser) => this.initFunc(appUser));
  }

  initFunc(appUser: AppUser) {
    (this.userkey = appUser.email),
      (this.username = appUser.name),
      (this.subscription = this.musicService
        .getAll()
        .valueChanges({
          idField: 'key',
        })
        .subscribe((music: any) => {
          this.filteredMusic = this.music = music.map((music: any) => {
            return {
              songname: music['songname'],
              genre: music['genre'],
              artistkey: music['artistkey'],
              artist: music['artist'],
              key: music['key'],
            };
          });
          this.dataSource = new MatTableDataSource<Music>(this.filteredMusic);
          this.initPaginatorAndSort();
        }));
  }

  initPaginatorAndSort(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getCollectionStatus() {}

  filter(query: string) {
    this.filteredMusic = query
      ? this.music.filter(
          (p) =>
            p.songname.toLowerCase().includes(query.toLowerCase()) ||
            p.artist.toLowerCase().includes(query.toLowerCase()) ||
            p.genre.toLowerCase().includes(query.toLowerCase())
        )
      : this.music;
    this.dataSource = new MatTableDataSource<Music>(this.filteredMusic);
    this.initPaginatorAndSort();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
