import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'conseil',
    templateUrl: './conseil.component.html',
    styleUrls: ['./conseil.component.scss']
  })

export class Conseil implements OnInit {
    id: number;
    nomDuConseil: String;
    solutionWanaka: String;
    details: String;
    imageUrl: String;
  
    constructor() {
    this.id= Number();
    this.nomDuConseil= new String();
    this.solutionWanaka= new String();
    this.details= new String();
    this.imageUrl= new String();
     }
  
    ngOnInit(): void {
    }
  
  }