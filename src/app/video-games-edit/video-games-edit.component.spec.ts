import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoGamesEditComponent } from './video-games-edit.component';

describe('VideoGamesEditComponent', () => {
  let component: VideoGamesEditComponent;
  let fixture: ComponentFixture<VideoGamesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoGamesEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoGamesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
