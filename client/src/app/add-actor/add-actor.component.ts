import { Component, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActorService } from '../services/actor.service';
import { EmitterService } from '../services/emitter.service';
import { Actor } from '../Actor';

@Component({
  selector: 'app-add-actor',
  templateUrl: './add-actor.component.html',
  styleUrls: ['./add-actor.component.css'],
   providers: [ ActorService ]
})
export class AddActorComponent implements OnChanges {

  @Input() actorInfo: string;
   
	@Input() actorList: string;

	private actor:Actor = new Actor('',0,'',0);
	private isInsert:boolean = true;

	constructor(
			private actorService: ActorService
		) {}

	public addActor(){
	
		this.actorService.addActor(this.actor).subscribe(
                        response =>  { 
	                        this.actorService.getAllActors().subscribe(
                            response => EmitterService.get(this.actorList).emit(response));
                            this.actor=new Actor('',0,'',0);
	                        
                        } ,
                        error=> {
                       		alert('erreur ajout');
                       	}
                    );
	}

		public updateActor(){
		this.actorService.updateActor(this.actor).subscribe(
						response => { 
	                        this.actorService.getAllActors().subscribe(
                            response => EmitterService.get(this.actorList).emit(response));
	                        this.actor=new Actor('',0,'',0);
	                        this.isInsert=true;
	                        
                        },
                        error=> { 
                        	alert('erreur de modification');
                        }
                    );
	}

	ngOnChanges(changes:any) {
		
		EmitterService.get(this.actorInfo).subscribe( (value:Actor) => {
			this.actor = new Actor(value._id,value.id,value.name,value.birth_year);
			this.isInsert = false;
		});
	}

 
}