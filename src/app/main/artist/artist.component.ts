import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { ArtistService } from '../../service/artist.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Artist } from 'src/app/models/artist';

@Component({
  selector: 'artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css'],
})
export class ArtistComponent implements OnInit, OnDestroy {
  artists: Artist[];
  filteredArtists: Artist[];
  subscription: Subscription;

  displayedColumns: string[] = ['img', 'name', 'country', 'music'];
  dataSource: MatTableDataSource<Artist>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private artistService: ArtistService) {}

  ngOnInit() {
    this.subscription = this.artistService
      .getAll()
      .valueChanges({
        idField: 'key',
      })
      .subscribe((artists: any) => {
        this.filteredArtists = this.artists = artists.map((artist: any) => {
          return {
            name: artist['name'],
            country: artist['country'],
            imageUrl: artist['imageUrl'],
            key: artist['key'],
          };
        });
        this.dataSource = new MatTableDataSource<Artist>(this.filteredArtists);
        this.initPaginatorAndSort();
      });
  }

  initPaginatorAndSort(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filter(query: string) {
    this.filteredArtists = query
      ? this.artists.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.country.toLowerCase().includes(query.toLowerCase())
        )
      : this.artists;
    this.dataSource = new MatTableDataSource<Artist>(this.filteredArtists);
    this.initPaginatorAndSort();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
