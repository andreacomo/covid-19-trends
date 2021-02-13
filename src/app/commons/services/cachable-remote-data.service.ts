import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { publishReplay, refCount } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CachableRemoteDataService {

  private cache$: Map<string, Observable<any>> = new Map<string, Observable<any>>();

  constructor(private http: HttpClient) { }

  public getData<T>(url: string, cacheKey: string = url): Observable<T[]> {
    if (this.cache$[cacheKey] == null) {
      this.cache$[cacheKey] = this.http.get(url)
          .pipe(
            publishReplay(1),
            refCount()
          ) as Observable<T[]>;
    }
    return this.cache$[cacheKey];
  }
}
