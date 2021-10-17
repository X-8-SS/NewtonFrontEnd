import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoGameService } from 'src/app/core/services/video-game.service';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { VideoGame } from '../core/models/video-game.model';
import { VideoGameGenre } from '../core/models/video-games-genre.model';
import { VideoGameRating } from '../core/models/video-games-rating.model';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-video-games-edit',
  templateUrl: './video-games-edit.component.html',
  styleUrls: ['./video-games-edit.component.scss']
})
export class VideoGamesEditComponent implements OnInit {
  public videoGame: VideoGame = { videoGameId: 0 } as VideoGame;
  public videGameGenre: VideoGameGenre[] = [];
  public videoGameRating: VideoGameRating[] = [];
  public selectedGenreId: number = 0;
  public selectedRatingId: number = 0;
  public minDate: Date = new Date();
  public maxDate: Date = new Date();
  public submitted: boolean = false;

  constructor(private readonly videoGameService: VideoGameService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private currencyPipe: CurrencyPipe,
    private fb: FormBuilder) {
      this.minDate.setDate(this.minDate.getDate() - 30);
      this.maxDate.setDate(this.maxDate.getDate() + 10);
     }

  public videoGameForm: FormGroup = this.fb.group(
    {
      title: ['',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(30)
        ]
      ],
      price: ['', Validators.required],
      releaseDate: [new Date(), Validators.required],
      genreId: [0, Validators.required],
      ratingId: [0, Validators.required]
    }
  );

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(take(1)).subscribe((o: any) => {
      this.initializeService(o.get('id'));
   });
  }

  /**
   * gets the relevant information and displays in the form
   * @param id
   */
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
        this.videoGameRating = ratings;
        // display values
        this.videoGameForm.setValue({
          title: this.videoGame.title,
          price: (this.videoGame.price ? this.currencyPipe.transform(this.videoGame.price, '$') : ''),
          releaseDate: new Date(this.videoGame.releaseDate),
          genreId: this.videoGame.genreId,
          ratingId: this.videoGame.ratingId
        });
        this.selectedGenreId = this.videoGame.genreId;
        this.selectedRatingId = this.videoGame.ratingId;
      });
  }

  public get f(): { [key: string]: AbstractControl } {
    return this.videoGameForm.controls;
  }

  public formatAmount(val: any): boolean {
    if(typeof +val === "number" && !isNaN(+val)) {
      this.videoGameForm.patchValue({ price: (val ? this.currencyPipe.transform(val, '$') : '') });
    } else {
      this.videoGameForm.patchValue({ price: ''});
    }

    return false;
  }

  public onGenreChange(val: any): boolean {
    this.selectedGenreId = val;
    return false;
  }

  public onRatingChange(val: any): boolean {
    this.selectedRatingId = val;
    return false;
  }

  public onCancel() {
    this.router.navigate(['/catalog']);
  }

  public isValid(): boolean {
   if (this.videoGameForm.invalid ||
      this.selectedGenreId === 0 ||
      this.selectedRatingId === 0) {
        return false;
    } else {
      return true;
    }
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.videoGameForm.invalid ||
      this.selectedGenreId === 0 ||
      this.selectedRatingId === 0) {
      return;
    }

    let noFormatPrice = this.videoGameForm.controls.price.value;
    noFormatPrice = noFormatPrice.replace('$', '');

    let saveDate: VideoGame = {
      videoGameId: this.videoGame.videoGameId,
      title: this.videoGameForm.controls.title.value,
      price: noFormatPrice,
      releaseDate: this.videoGameForm.controls.releaseDate.value,
      genreId: this.selectedGenreId,
      ratingId: this.selectedRatingId
    } as VideoGame;

    this.videoGameService.updateVideoGame(saveDate).subscribe(() => {
      this.router.navigate(['/catalog']);
    });
  }

}
