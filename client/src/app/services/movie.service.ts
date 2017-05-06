import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Movie } from '../Movie';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class MovieService {
private BASE_URL:string = 'http://localhost:3000/movies';
  constructor(private http: Http) { }

  public getAllMovies(){
		return this.http.get(`${this.BASE_URL}`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

  public addMovie(body:Movie){
		let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
		return this.http.post(`${this.BASE_URL}`,JSON.stringify({title :body.title,year:body.year}), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	public updateMovie(body:Movie){

        let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });

		return this.http.put(`${this.BASE_URL}`+'/'+`${body['id']}`,JSON.stringify(body), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	public deleteMovie(moviesID:string){

        let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json' }) 
        });

		return this.http.delete(`${this.BASE_URL}`+'/'+`${moviesID}`,options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}


}
