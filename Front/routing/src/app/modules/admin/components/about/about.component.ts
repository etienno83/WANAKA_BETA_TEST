import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Conseil } from '../../conseil';
import { ConseilService } from '../../conseil.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public conseil = new Conseil();
  public conseils!: Conseil[];
  public editConseil = new Conseil();
  public deleteConseil = new Conseil();
  public solutionsWanaka?: String[];
  public solutionWanaka!: String;
  public nomDuConseil!: String;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private conseilService: ConseilService) { }

  ngOnInit() {
    this.solutionWanaka=this.route.snapshot.params['{{solutionWanaka}}'];
    this.getConseilsBySolutionWanaka();
  }

  logout(): void {
    this.auth.logout();
  }


  public getConseilsBySolutionWanaka(): void {
    this.conseilService.getConseilsBySolutionWanaka(this.solutionWanaka).subscribe(
      (response: Conseil[]) => {
        this.conseils = response;
        console.log(this.conseils);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

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

  public onUpdateConseil(conseil: Conseil): void {
    console.log(conseil)
    this.conseilService.updateConseil(conseil).subscribe(
      (response: Conseil) => {
        console.log(response);
        this.getConseilsBySolutionWanaka();
        console.log(conseil);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddConseil(addForm: NgForm): void {
    document.getElementById('add-conseil-form')?.click();
    this.conseilService.addConseil(addForm.value).subscribe(
      (response: Conseil) => {
        console.log(response);
        this.conseilService.getConseilsBySolutionWanaka(this.solutionWanaka);
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onDeleteConseil(conseilId: number): void {
    this.conseilService.deleteConseil(conseilId).subscribe(
      (response: void) => {
        console.log(response);
        this.conseilService.getConseilsBySolutionWanaka(this.solutionWanaka);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchConseils(key: string): void {
    console.log(key);
    const results: Conseil[] = [];
    for (const conseil of this.conseils) {
      if (conseil.nomDuConseil.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(conseil);
      }
    }
    this.conseils = results;
    if (results.length === 0 || !key) {
      console.log(this.conseils);
      this.conseilService.getConseilsBySolutionWanaka(this.solutionWanaka).subscribe(
        (response) => {
          console.log(response);
          this.conseils = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public onOpenModal(conseil: Conseil |null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'delete' && conseil!=null) {
      this.deleteConseil = conseil;
      button.setAttribute('data-target', '#deleteConseilModal');
      console.log(conseil);
    }
    if (mode === 'edit' && conseil!=null) {
      this.editConseil = conseil;
      button.setAttribute('data-target', '#updateConseilModal');
      console.log(conseil);
    }
    if (mode === 'add') {
      button.setAttribute('data-target', '#addConseilModal');
      console.log(conseil);
    }
    container?.appendChild(button);
    button.click();
  }
}

