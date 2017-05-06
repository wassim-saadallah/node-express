import { Component, OnInit } from '@angular/core';
import { EmitterService } from '../services/emitter.service';



@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css'],
  providers: [EmitterService]
})
export class ActorComponent {
   private actorInfo = 'CRUD_ACTOR_INFO';
 
    private actorList = 'CRUD_ACTOR_LIST';
    constructor(private _emitterService: EmitterService) {}

  

}
