import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { VideoGameCatalog } from 'src/app/core/models/video-game-catalog.model';
import { VideoGameService } from 'src/app/core/services/video-game.service';

@Component({
  selector: 'app-video-games-catalog',
  templateUrl: './video-games-catalog.component.html',
  styleUrls: ['./video-games-catalog.component.scss']
})
export class VideoGamesCatalogComponent implements OnInit, AfterViewInit {

  public rowData = new MatTableDataSource<VideoGameCatalog>()
  columnsToDisplay = ['title', 'releaseDate', 'price', 'genreName', 'ratingCategory', 'update'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private readonly videoGameService: VideoGameService,
    public router: Router) { }

  ngOnInit(): void {
    this.videoGameService.getVideoGamesCatalog().pipe(take(1)).subscribe((o: VideoGameCatalog[]) => {
      this.rowData.data = o;
    });
  }

  /**
   * redirection
   * @param id
   */
  public redirectToUpdate = (id: number) => {
    this.router.navigate(['/edit', id]);
  }

  /**
   * Used Angular material table
   */
  ngAfterViewInit(): void {
    this.rowData.paginator = this.paginator;
    this.rowData.sort = this.sort;
  }

}
