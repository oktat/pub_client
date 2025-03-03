import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  host = environment.host;

  constructor(
    private http: HttpClient,
    private header: HeaderService
  ) { }

  getTypes() {
    const url = this.host + 'types';
    return this.http.get(url);
  }

  addType(data: any) {
    const url = this.host + 'newtype';
    return this.http.post(url, data, this.header.make());
  }

  updateType(data: any) {
    const url = this.host + 'modtype';
    return this.http.put(url, data, this.header.make());
  }

  deleteType(id : number) {
    const url = this.host + 'desttype' + '/' + id;
    return this.http.delete(url, this.header.make());
  }
}
