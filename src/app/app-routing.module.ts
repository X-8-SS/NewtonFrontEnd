import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideoGamesCatalogComponent } from './video-games-catalog/video-games-catalog.component';
import { VideoGamesEditComponent } from './video-games-edit/video-games-edit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: VideoGamesCatalogComponent },
  { path: 'edit/:id', component: VideoGamesEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
