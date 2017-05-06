import { Component, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { EmitterService } from '../services/emitter.service';
import { Movie } from '../Movie';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
  providers: [ MovieService ]
})
export class AddMovieComponent implements OnChanges {
    @Input() movieInfo: string;
   
	@Input() movieList: string;

	private movie:Movie = new Movie('',0,'',0);
	private isInsert:boolean = true;

	constructor(
			private movieService: MovieService
		) {}

	public addMovie(){
	
		this.movieService.addMovie(this.movie).subscribe(
                        response =>  {
							if(response.error) { 
	                        	alert('erreur ajout');
	                        } 
	                        else {
	                        this.movieService.getAllMovies().subscribe(
                            response => EmitterService.get(this.movieList).emit(response));
                            this.movie=new Movie('',0,'',0);
	                        }
                        } ,
                        error=> {
                       		alert('erreur ajout');
                       	}
                    );
	}

		public updateMovie(){
		this.movieService.updateMovie(this.movie).subscribe(
						response => { 
	                        this.movieService.getAllMovies().subscribe(
                            response => EmitterService.get(this.movieList).emit(response));
	                        this.movie=new Movie('',0,'',0);
	                        this.isInsert=true;
	                        
                        },
                        error=> { 
                        	alert('erreur de modification');
                        }
                    );
	}

	ngOnChanges(changes:any) {
		
		EmitterService.get(this.movieInfo).subscribe( (value:Movie) => {
			this.movie = new Movie(value._id,value.id,value.title,value.year);
			this.isInsert = false;
		});
	}

 
}