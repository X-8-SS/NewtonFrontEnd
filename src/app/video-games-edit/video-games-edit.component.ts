import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoGameService } from 'src/app/core/services/video-game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { VideoGame } from '../core/models/video-game.model';
import { VideoGameGenre } from '../core/models/video-games-genre.model';
import { VideoGameRating } from '../core/models/video-games-rating.model';


@Component({
  selector: 'app-video-games-edit',
  templateUrl: './video-games-edit.component.html',
  styleUrls: ['./video-games-edit.component.scss']
})
export class VideoGamesEditComponent implements OnInit {
  public videoGame: VideoGame = { videoGameId: 0 } as VideoGame;
  public videGameGenre: VideoGameGenre[] = [];
  public videoGamerating: VideoGameRating[] = [];
  public submitted: boolean = false;

  constructor(private readonly videoGameService: VideoGameService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

  public videoGameForm: FormGroup = this.fb.group(
    {
      title: ['',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(20)
        ]
      ],
      releaseDate: ['', Validators.required],
      price: ['', Validators.required],
      genreId: ['', Validators.required],
      ratingId: ['', Validators.required]
    }
  );

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((o: any) => {
      this.initializeService(o.get('id'));
   });
  }

  private initializeService(id: string) {
    combineLatest([
        this.videoGameService.getVideoGame(parseInt(id)),
        this.videoGameService.getVideoGamseGenre(),
        this.videoGameService.getVideoGamesRating()
      ])
      .pipe(take(1))
      .subscribe(([videoGame, genres, ratings]) => {
        this.videoGame = videoGame;
        this.videGameGenre = genres;
        this.videoGamerating = ratings;

        console.log(this.videoGame);
        console.log(this.videGameGenre);
        console.log(this.videoGamerating);
      });
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.videoGameForm.controls;
  }

  public onCancel() {
    this.router.navigate(['/catalog']);
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.videoGameForm.invalid) {
      return;
    }
    console.log(JSON.stringify(this.videoGameForm.value, null, 2));
  }

}
