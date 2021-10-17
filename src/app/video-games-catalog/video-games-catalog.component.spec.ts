import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGamesCatalogComponent } from './video-games-catalog.component';

describe('VideoGamesCatalogComponent', () => {
  let component: VideoGamesCatalogComponent;
  let fixture: ComponentFixture<VideoGamesCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoGamesCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoGamesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
