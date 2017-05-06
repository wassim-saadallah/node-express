import { Component, OnInit } from '@angular/core';
import { EmitterService } from '../services/emitter.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent  {

  private movieInfo = 'CRUD_MOVIE_INFO';
 
    private movieList = 'CRUD_MOVIE_LIST';
    constructor(private _emitterService: EmitterService) {}
}
