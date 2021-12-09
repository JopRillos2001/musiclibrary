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

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Playlist } from 'src/app/models/playlist';
import { Artist } from 'src/app/models/artist';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { PlaylistService } from 'src/app/service/playlist.service';
import { UserService } from 'src/app/service/user.service';
import { AuthService } from 'src/app/service/auth.service';
import { AppUser } from 'src/app/models/app-user';

@Component({
  selector: 'mycollection',
  templateUrl: './mycollection.component.html',
  styleUrls: ['./mycollection.component.css'],
})
export class MycollectionComponent implements OnInit, OnDestroy {
  playlist: Playlist[];
  filteredPlaylist: Playlist[];
  subscription: Subscription;
  id: string;
  appUser: AppUser;
  username: string;

  displayedColumns: string[] = ['songname', 'artist', 'genre', 'edit'];
  dataSource: MatTableDataSource<Playlist>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private playlistService: PlaylistService,
    private userService: UserService,
    public auth: AuthService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.auth.appUser$.subscribe(
      (appUser) =>
        (this.subscription = this.playlistService
          .getAllById(appUser.email)
          .valueChanges({
            idField: 'key',
          })
          .subscribe((playlist: any) => {
            this.filteredPlaylist = this.playlist = playlist.map(
              (playlist: any) => {
                return {
                  songname: playlist['songname'],
                  genre: playlist['genre'],
                  artistkey: playlist['artistkey'],
                  artist: playlist['artist'],
                  songkey: playlist['songkey'],
                  userkey: playlist['userkey'],
                  username: playlist['username'],
                  key: playlist['key'],
                };
              }
            );
            this.dataSource = new MatTableDataSource<Playlist>(
              this.filteredPlaylist
            );
            this.initPaginatorAndSort();
          }))
    );
  }

  removeFromPlaylist(userkey: string, playlistkey: string) {
    this.playlistService.delete(userkey, playlistkey);
  }

  initPaginatorAndSort(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filter(query: string) {
    this.filteredPlaylist = query
      ? this.playlist.filter(
          (p) =>
            p.songname.toLowerCase().includes(query.toLowerCase()) ||
            p.genre.toLowerCase().includes(query.toLowerCase())
        )
      : this.playlist;
    this.dataSource = new MatTableDataSource<Playlist>(this.filteredPlaylist);
    this.initPaginatorAndSort();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
