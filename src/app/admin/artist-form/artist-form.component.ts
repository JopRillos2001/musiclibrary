import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Artist } from 'src/app/models/artist';
import { ArtistService } from '../../service/artist.service';

@Component({
  selector: 'artist-form',
  templateUrl: './artist-form.component.html',
  styleUrls: ['./artist-form.component.css'],
})
export class ArtistFormComponent implements OnInit {
  artist: any = {};
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private artistService: ArtistService
  ) {}

  save(artist: Observable<Artist>) {
    if (this.id) {
      this.artistService.update(this.id, artist);
    } else {
      this.artistService.create(artist);
    }
    this.router.navigate(['/admin/artists']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this artist?')) return;
    this.artistService.delete(this.id);
    this.router.navigate(['/admin/artists']);
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.artistService
        .getOne(this.id)
        .valueChanges({
          idField: 'key',
        })
        .pipe(take(1))
        .subscribe((p) => (this.artist = p));
    }
  }
}
