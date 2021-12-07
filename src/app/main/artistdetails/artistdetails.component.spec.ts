import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistdetailsComponent } from './artistdetails.component';

describe('ArtistdetailsComponent', () => {
  let component: ArtistdetailsComponent;
  let fixture: ComponentFixture<ArtistdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
