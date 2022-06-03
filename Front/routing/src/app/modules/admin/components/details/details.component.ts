import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Conseil } from '../../conseil';
import { ConseilService } from '../../conseil.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  
    exform!: FormGroup;
    public conseil = new Conseil();
    public conseils!: Conseil[];
    public editConseil = new Conseil();
    public deleteConseil = new Conseil();
    public id!: number;
    private nomCtrl : FormControl = new FormControl(null, Validators.required);     

    constructor(
      private route: ActivatedRoute,
      private auth: AuthService,
      private formBuilder: FormBuilder,
      private conseilService: ConseilService) { }
  
    ngOnInit(){
      this.id=this.route.snapshot.params['{{id}}'];
      this.getConseilById();
      this.exform = this.formBuilder.group({
        nomDuConseil : this.nomCtrl,
        });
    }

    public getConseilById(): void {
      this.conseilService.getConseilById(this.id).subscribe(
        (response: Conseil) => {
          this.conseil = response;
          this.nomCtrl.setValue(this.conseil.nomDuConseil);
                   
          console.log(this.conseil);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }    
  
    clicksub() {
      console.log(this.exform.value);
      this.exform.reset();
    }
    get nomDuConseil() {
      return this.exform.get('nomDuConseil');
    }
    
  
  }