import { AuthService } from './../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Conseil } from '../../conseil';
import { HttpErrorResponse } from '@angular/common/http';
import { ConseilService } from '../../conseil.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public conseils!: Conseil[];
  public conseil?: Conseil;
  constructor(
    private auth: AuthService,
    private conseilService: ConseilService) {}

  ngOnInit() {
    this.getConseils();
  }
  logout(): void {
    this.auth.logout();
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

  public searchConseils(key: string): void {
    console.log(key);
    const results: Conseil[] = [];
    for (const conseil of this.conseils) {
      if (conseil.nomDuConseil.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || conseil.details.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(conseil);
      }
    }
    this.conseils = results;
    if (results.length === 0 || !key) {
      this.getConseils();
    }
  }

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
}