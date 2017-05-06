import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { EmitterService } from './services/emitter.service';
import { ActorComponent } from './actor/actor.component';
import { AddActorComponent } from './add-actor/add-actor.component';
import { ActorListComponent } from './actor-list/actor-list.component';
import { MovieComponent } from './movie/movie.component';
const appRoutes: Routes = [
  { path: 'movies', component: MovieComponent },
  { path: 'actors',  component: ActorComponent},
  {path:'', component: MovieComponent}
    ]

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    AddMovieComponent,
    ActorComponent,
    AddActorComponent,
    ActorListComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
