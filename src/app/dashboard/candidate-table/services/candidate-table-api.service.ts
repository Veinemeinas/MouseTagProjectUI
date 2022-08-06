import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidateTableApiService {
  readonly candidateTableAPIUrl = 'https://localhost:7271/api';

  constructor(private http: HttpClient) {}

  // Candidates CRUD
  getCandidatesList(): Observable<any[]> {
    return this.http.get<any>(this.candidateTableAPIUrl + '/Candidates');
  }

  addCandidate(data: any) {
    return this.http.post(this.candidateTableAPIUrl + '/Candidates', data);
  }

  updateCandidate(id: number | string, data: any) {
    return this.http.patch(
      this.candidateTableAPIUrl + `/Candidates/${id}`,
      data
    );
  }

  deleteCandidate(id: number | string) {
    return this.http.delete(this.candidateTableAPIUrl + `/Candidates/${id}`);
  }

  // Technologies CRUD
  getTechnologiesList(): Observable<any[]> {
    return this.http.get<any>(this.candidateTableAPIUrl + '/Technology');
  }

  addTechnology(data: any) {
    return this.http.post(this.candidateTableAPIUrl + '/Technology', data);
  }

  updateTechnology(id: number | string, data: any) {
    return this.http.patch(
      this.candidateTableAPIUrl + `/Technology/${id}`,
      data
    );
  }

  deleteTechnology(id: number | string) {
    return this.http.delete(this.candidateTableAPIUrl + `/Technology/${id}`);
  }
}
