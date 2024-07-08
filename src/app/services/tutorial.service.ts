import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';

const baseUrl = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  private httpClient = inject(HttpClient);

  constructor() { }

  findAll(): Observable<Tutorial[]> {
    return this.httpClient.get<Tutorial[]>(`${baseUrl}/tutoriales`);
  }

  findById(id: any): Observable<Tutorial> {
    return this.httpClient.get<Tutorial>(`${baseUrl}/tutoriales/${id}`);
  }

  findByTitle(title: string): Observable<Tutorial[]> {
    return this.httpClient.get<Tutorial[]>(`${baseUrl}/tutoriales?title=${title}`);
  }

  findByPublished(): Observable<Tutorial[]> {
    return this.httpClient.get<Tutorial[]>(`${baseUrl}/tutoriales/publicados`);
  }

  create(data: any): Observable<Tutorial> {
    return this.httpClient.post<Tutorial>(`${baseUrl}/tutoriales`, data);
  }

  update(id: any, data: any): Observable<Tutorial> {
    return this.httpClient.put<Tutorial>(`${baseUrl}/tutoriales/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/tutoriales/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(`${baseUrl}/tutoriales`);
  }
}
