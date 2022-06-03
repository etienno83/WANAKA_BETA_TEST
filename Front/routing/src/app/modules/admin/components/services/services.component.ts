import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Conseil } from '../../conseil';
import { ConseilService } from '../../conseil.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  
  public conseil = new Conseil();
  public conseils!: Conseil[];
  public editConseil = new Conseil();
  public deleteConseil = new Conseil();
  public id!: number;
  
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private conseilService: ConseilService) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['{{id}}'];
    this.getConseilById();
  }

  logout(): void {
    this.auth.logout();
  }

  public getConseilById(): void {
    this.conseilService.getConseilById(this.id).subscribe(
      (response: Conseil) => {
        this.conseil = response;
        console.log(this.conseil);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateConseil(conseil: Conseil): void {
    this.conseilService.updateConseil(conseil).subscribe(
      (response: Conseil) => {
        console.log(response);
        this.conseilService.getConseilById(this.id);
        console.log(conseil);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteConseil(conseilId: number): void {
    this.conseilService.deleteConseil(conseilId).subscribe(
      (response: void) => {
        console.log(response);
        this.conseilService.getConseilById(this.id);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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


