import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, NEVER, Observable } from 'rxjs';
import { FileUpl } from './../models/file-upl.model';

@Injectable({
  providedIn: 'root',
})
export class FileUplService {
  readonly rootUrl = 'https://localhost:7271';
  constructor(private https: HttpClient) {}

  FileUpload(data: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = { headers: headers };

    return this.https.post(this.rootUrl + '/api/Import', data, options).pipe(
      catchError((error) => {
        return NEVER;
      })
    );
  }
}
