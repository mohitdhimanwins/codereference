import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class CommonHttpService {
  constructor(private httpClient: HttpClient) { }

  post(
    endPoint: string,
    requestPayload: any,
    options?: any
  ): Observable<any> {
    let httpObj = new HttpService(
      this.httpClient,
      endPoint
    );
    return httpObj.post(requestPayload, options);
  }

  get(endPoint: string): Observable<any> {
    let httpObj = new HttpService(
      this.httpClient,
      endPoint
    );
    return httpObj.get();
  }

  delete(endPoint: string, id: number): Observable<any> {
    let httpObj = new HttpService(
      this.httpClient,
      endPoint
    );
    return httpObj.delete(id);
  }

  patch(
    endPoint: string,
    requestPayload: any
  ): Observable<any> {
    let httpObj = new HttpService(
      this.httpClient,
      endPoint
    );
    return httpObj.patch(requestPayload);
  }

  put(
    endPoint: string,
    requestPayload: any
  ): Observable<any> {
    let httpObj = new HttpService(
      this.httpClient,
      endPoint
    );
    return httpObj.put(requestPayload);
  }
}