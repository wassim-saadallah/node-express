import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Actor } from '../Actor';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class ActorService {
private BASE_URL:string = 'http://localhost:3000/actors';
  constructor(private http: Http) { }

  public getAllActors(){
		return this.http.get(`${this.BASE_URL}`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

  public addActor(body:Actor){
		let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });
		return this.http.post(`${this.BASE_URL}`,JSON.stringify({name :body.name,birth_year:body.birth_year}), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	public updateActor(body:Actor){

        let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' }) 
        });

		return this.http.put(`${this.BASE_URL}`+'/'+`${body['id']}`,JSON.stringify(body), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	public deleteActor(actorsID:string){

        let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json' }) 
        });

		return this.http.delete(`${this.BASE_URL}`+'/'+`${actorsID}`,options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}


}
