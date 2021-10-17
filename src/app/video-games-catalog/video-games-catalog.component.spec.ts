import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import * as Rx from 'rxjs';
import { delay } from "rxjs/operators";
import { VideoGameService } from '../core/services/video-game.service';
import { VideoGamesCatalogComponent } from './video-games-catalog.component';

describe('VideoGamesCatalogComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        VideoGamesCatalogComponent
      ],
      providers : [
        VideoGameService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(VideoGamesCatalogComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    const fixture = TestBed.createComponent(VideoGamesCatalogComponent);
    const component = fixture.debugElement.componentInstance;
    const service = fixture.debugElement.injector.get(VideoGameService);
    let spy_getPosts = spyOn(service,"getVideoGamesCatalog").and.callFake(() => {
      return Rx.of([]).pipe(delay(100));
    });

  })

});
