import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BikeService {
  public API = '//localhost:8080';
  public CAR_API = this.API + '/bikes';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.API + '/get-bikes');
  }

  get(id: string) {
    return this.http.get(this.CAR_API + '/' + id);
  }

  save(bike: any): Observable<any> {
    let result: Observable<Object>;
    if (bike['href']) {
      result = this.http.put(bike.href, bike);
    } else {
      result = this.http.post(this.CAR_API, bike);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
