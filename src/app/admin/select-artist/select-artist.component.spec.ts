import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectArtistComponent } from './select-artist.component';

describe('SelectArtistComponent', () => {
  let component: SelectArtistComponent;
  let fixture: ComponentFixture<SelectArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectArtistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
