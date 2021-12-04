import { isNgTemplate } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Music } from '../../models/music';

@Component({
  selector: 'music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.css'],
})
export class MusicCardComponent {
  @Input('music') music: Music;
  @Input('show-actions') showActions = true;
  constructor() {}
}
