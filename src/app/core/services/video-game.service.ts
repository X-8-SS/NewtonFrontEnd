import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VideoGameCatalog } from '../models/video-game-catalog.model';
import { VideoGame } from '../models/video-game.model';
import { VideoGameGenre } from '../models/video-games-genre.model';
import { VideoGameRating } from '../models/video-games-rating.model';

@Injectable({
  providedIn: 'root'
})
export class VideoGameService {
  private _videoGameBasePath: string = environment.apis.videoGameEndpoint;

  constructor(private readonly _httpClient: HttpClient) { }

  /**
   * Get all video games
   * @returns
   */
  public getVideoGamesCatalog(): Observable<VideoGameCatalog[]> {
    return this._httpClient.get<VideoGameCatalog[]>(`${this._videoGameBasePath}/api/v1/video-games-catalog`);
  }

/**
 * Get(id) specific video game
 * @param id
 * @returns
 */
 public getVideoGame(id: number): Observable<VideoGame> {
   return this._httpClient.get<VideoGame>(`${this._videoGameBasePath}/api/v1/video-games-catalog/${id}`);
 }

 /**
  * Get list of genre
  * @returns
  */
 public getVideoGamseGenre(): Observable<VideoGameGenre[]> {
  return this._httpClient.get<VideoGameGenre[]>(`${this._videoGameBasePath}/api/v2/video-games-genre`);
 }

 /**
  * Get list of rating
  * @returns
  */
 public getVideoGamesRating(): Observable<VideoGameRating[]> {
  return this._httpClient.get<VideoGameRating[]>(`${this._videoGameBasePath}/api/v2/video-games-rating`);
 }

 /**
  * Put(id, VideoGame)
  * @param videoGame
  * @returns
  */
 public updateVideoGame(videoGame: VideoGame): Observable<any> {
  return this._httpClient.put(`${this._videoGameBasePath}/api/v1/video-games-catalog/`, videoGame);
 }

}
