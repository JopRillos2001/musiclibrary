import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicdetailsComponent } from './musicdetails.component';

describe('MusicdetailsComponent', () => {
  let component: MusicdetailsComponent;
  let fixture: ComponentFixture<MusicdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
