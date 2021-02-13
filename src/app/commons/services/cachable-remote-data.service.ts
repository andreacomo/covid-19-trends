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

  public getData<T>(url: string, options: object = null): Observable<T[] | any> {
    if (this.cache$[url] == null) {
      this.cache$[url] = (options ? this.http.get(url, options) : this.http.get(url))
          .pipe(
            publishReplay(1),
            refCount()
          );
    }
    return this.cache$[url];
  }
}
