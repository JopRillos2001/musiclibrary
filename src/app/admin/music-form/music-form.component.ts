import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Artist } from 'src/app/models/artist';
import { Music } from 'src/app/models/music';
import { MusicService } from 'src/app/service/music.service';
import { ArtistService } from '../../service/artist.service';

@Component({
  selector: 'music-form',
  templateUrl: './music-form.component.html',
  styleUrls: ['./music-form.component.css'],
})
export class MusicFormComponent implements OnInit {
  music: any = {};
  artist: any = {};
  id: string;
  mid: string;
  artistname: string;
  artists$: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private artistService: ArtistService,
    private musicService: MusicService
  ) {}

  save(music: any) {
    music.artistkey = this.id;
    music.artist = this.artistname;

    if (this.mid) {
      this.musicService.update(this.id, music, this.mid);
    } else {
      this.musicService.create(music, this.id);
    }
    this.router.navigate(['/admin/music']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this artist?')) return;
    this.musicService.delete(this.id, this.mid);
    this.router.navigate(['/admin/music']);
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.mid = this.route.snapshot.paramMap.get('mid');
    this.music.artistkey = this.id;
    this.getSelectedArtist();
    this.getSelectedMusic();
  }

  getSelectedArtist() {
    if (this.id) {
      this.artistService
        .getOne(this.id)
        .valueChanges({
          idField: 'key',
        })
        .pipe(take(1))
        .subscribe((p: any) => (this.artistname = p.name));
    }
  }

  getSelectedMusic() {
    if (this.mid) {
      this.musicService
        .getOne(this.id, this.mid)
        .valueChanges({
          idField: 'key',
        })
        .pipe(take(1))
        .subscribe((p: any) => (this.music = p));
    }
  }
}
