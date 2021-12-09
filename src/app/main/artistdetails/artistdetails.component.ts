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

@Component({
  selector: 'artistdetails',
  templateUrl: './artistdetails.component.html',
  styleUrls: ['./artistdetails.component.css'],
})
export class ArtistdetailsComponent implements OnInit, OnDestroy {
  music: Music[];
  filteredMusic: Music[];
  subscription: Subscription;
  id: string;
  artistname: Observable<string>;
  artistimg: Observable<string>;

  displayedColumns: string[] = ['songname', 'genre', 'playlist'];
  dataSource: MatTableDataSource<Music>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private musicService: MusicService,
    private artistService: ArtistService,
    private route: ActivatedRoute
  ) {}
  async ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.artistname = this.artistService
        .getOne(this.id)
        .valueChanges()
        .pipe(map((artist) => artist.name));
      this.artistimg = this.artistService
        .getOne(this.id)
        .valueChanges()
        .pipe(map((artist) => artist.imageUrl));
    }

    this.subscription = this.musicService
      .getAllById(this.id)
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
            p.genre.toLowerCase().includes(query.toLowerCase())
        )
      : this.music;
    this.dataSource = new MatTableDataSource<Music>(this.filteredMusic);
    this.initPaginatorAndSort();
  }

  getSelectedArtist() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
