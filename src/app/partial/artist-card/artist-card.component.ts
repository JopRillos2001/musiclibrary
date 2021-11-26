import { isNgTemplate } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Artist } from '../../models/artist';

@Component({
  selector: 'artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.css'],
})
export class ArtistCardComponent {
  @Input('artist') artist: Artist;
  @Input('show-actions') showActions = true;
  constructor() {}
}
