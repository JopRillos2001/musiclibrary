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

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Music } from 'src/app/models/music';

@Component({
  selector: 'music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css'],
})
export class MusicComponent implements OnInit, OnDestroy {
  music: Music[];
  filteredMusic: Music[];
  subscription: Subscription;

  displayedColumns: string[] = ['songname', 'artist', 'genre'];
  dataSource: MatTableDataSource<Music>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private musicService: MusicService) {}
  async ngOnInit() {
    this.subscription = this.musicService
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
      });
  }

  initPaginatorAndSort(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

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
