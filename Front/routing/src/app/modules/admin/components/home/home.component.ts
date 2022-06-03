import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Conseil } from '../../conseil';
import { ConseilService } from '../../conseil.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public conseil = new Conseil();
  public conseils!: Conseil[];
  public solutionsWanaka?: String[];
  public solutionWanaka!: String;
  public nomDuConseil!: String;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private conseilService: ConseilService) { }

  ngOnInit() {
    this.getSolutionsWanaka();
  }

  logout(): void {
    this.auth.logout();
  }

  /**Cette méthode permet de récupérer la liste des Solutions Wanaka sans doublons  */
  public getSolutionsWanaka(): void {
    this.conseilService.getSolutionsWanaka().subscribe(
      (response: String[]) => {
        this.solutionsWanaka = response;
        console.log(this.solutionsWanaka);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /**Cette méthode récupère l'ensemble des conseils*/
  public getConseils(): void {
    this.conseilService.getConseils().subscribe(
      (response: Conseil[]) => {
        this.conseils = response;
        console.log(this.conseils);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /**Cette méthode récupère l'ensemble des conseils par Solution proposée par Wanaka*/
  public getConseilsBySolutionWanaka(): void {
    this.conseilService.getConseils().subscribe(
      (response: Conseil[]) => {
        this.conseils = response;
        console.log(this.conseils);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /**Cette méthode permet de rediriger l'action "click" dans l'html en fonction du bouton cliqué*/
  public onOpenModal(conseil: Conseil |null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addConseilModal');
      console.log(conseil);
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddConseil(addForm: NgForm): void {
    document.getElementById('add-conseil-form')?.click();
    this.conseilService.addConseil(addForm.value).subscribe(
      (response: Conseil) => {
        console.log(response);
        this.conseilService.getConseils();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
}
