import { Component, OnInit,OnChanges,Input } from '@angular/core';

import { ActorService } from '../services/actor.service';
import { EmitterService } from '../services/emitter.service';

import { Actor} from '../Actor';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css'],
   providers: [ ActorService ]
})
export class ActorListComponent implements OnInit, OnChanges {

 @Input() actorInfo: string;
	@Input() actorList: string;
	private actorsList;
	private currentActor:Actor;
    constructor(private actorService: ActorService ) 
    { }

  ngOnInit() {
  this.actorService.getAllActors().subscribe(
                       response => this.actorsList = response,
                       error=>  { alert(`Erreur de récupération des films`); }
                    );
  }

  public actorSelected(actor){		
		this.currentActor = actor;
		EmitterService.get(this.actorInfo).emit(this.currentActor);
	}

	public isSelected(actor): boolean {
		if(!this.currentActor) {
			return false;
		}
		return this.currentActor._id ===  actor._id ? true : false;
	}
	public deleteActor(actorId:string){
		this.actorService.deleteActor(actorId).subscribe(
						response => {
							 
	                        	 this.actorService.getAllActors().subscribe(
                                 response => this.actorsList = response);
	                             EmitterService.get(this.actorInfo).emit(new Actor('',0,'',0));
                        },
                       error=> { 
                       		alert('erreur suppression');
                       	}
                    );
	}
 ngOnChanges(changes:any) {
       
    	EmitterService.get(this.actorList).subscribe( (actorList:string) => {
			this.actorsList = actorList;
		});
	}
}
