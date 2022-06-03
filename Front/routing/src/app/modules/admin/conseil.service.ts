import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conseil } from './conseil';

@Injectable({providedIn: 'root'})
export class ConseilService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getConseils(): Observable<Conseil[]> {
    return this.http.get<Conseil[]>(`${this.apiServerUrl}/conseil/all`);
  }

  public getSolutionsWanaka(): Observable<String[]> {
    return this.http.get<String[]>(`${this.apiServerUrl}/conseil/solutionsWanaka`);
  }

  public getConseilsBySolutionWanaka(solutionWanaka:String): Observable<Conseil[]> {
    return this.http.get<Conseil[]>(`${this.apiServerUrl}/conseil/get/${solutionWanaka}`);
  }

  public addConseil(conseil: Conseil): Observable<Conseil> {
    return this.http.post<Conseil>(`${this.apiServerUrl}/conseil/add`, conseil);
  }  

  public updateConseil(conseil: Conseil): Observable<Conseil> {
    return this.http.put<Conseil>(`${this.apiServerUrl}/conseil/update`, conseil);
  }

  public deleteConseil(conseilId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/conseil/delete/${conseilId}`);
  }

  public getConseilById(id: number): Observable<Conseil> {
    return this.http.get<Conseil>(`${this.apiServerUrl}/conseil/find/${id}`);
  }
}