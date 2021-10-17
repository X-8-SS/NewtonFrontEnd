import { CurrencyPipe } from '@angular/common';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { VideoGameService } from '../core/services/video-game.service';
import { VideoGamesEditComponent } from './video-games-edit.component';

describe('VideoGamesEditComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        VideoGamesEditComponent
      ],
      providers : [
        VideoGameService,
        FormBuilder,
        CurrencyPipe
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(VideoGamesEditComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

});
