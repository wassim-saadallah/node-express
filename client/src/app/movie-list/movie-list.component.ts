import { Component, OnInit,OnChanges,Input } from '@angular/core';
import { ActorService } from '../services/actor.service';
import { MovieService } from '../services/movie.service';
import { EmitterService } from '../services/emitter.service';

import { Movie } from '../Movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
   providers: [ MovieService ,ActorService]
})
export class MovieListComponent implements OnInit, OnChanges {
 
    @Input() movieInfo: string;
	@Input() movieList: string;
	private moviesList;
	private actorsList;
	private currentMovie:Movie;
    constructor(private movieService: MovieService, private actorService: ActorService ) 
    { }

  ngOnInit() {
  this.movieService.getAllMovies().subscribe(
                       response => this.moviesList = response,
                       error=>  { alert(`Erreur de récupération des films`); }
                    );
  this.actorService.getAllActors().subscribe(
                       response => this.actorsList = response
                        
                    );
  }

  public movieSelected(movie){		
		this.currentMovie = movie;
		EmitterService.get(this.movieInfo).emit(this.currentMovie);
	}

	public isSelected(movie): boolean {
		if(!this.currentMovie) {
			return false;
		}
		return this.currentMovie._id ===  movie._id ? true : false;
	}
	public deleteMovie(movieId:string){
		this.movieService.deleteMovie(movieId).subscribe(
						response => {
							 
	                        	 this.movieService.getAllMovies().subscribe(
                                 response => this.moviesList = response);
	                             EmitterService.get(this.movieInfo).emit(new Movie('',0,'',0));
                        },
                       error=> { 
                       		alert('erreur suppression');
                       	}
                    );
	}
	public addActor(movieid)
	{  

	}
 ngOnChanges(changes:any) {
       
    	EmitterService.get(this.movieList).subscribe( (movieList:string) => {
			this.moviesList = movieList;
		});
	}
}
