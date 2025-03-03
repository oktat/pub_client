import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  host = environment.host

  constructor(
    private http: HttpClient,
    private header: HeaderService
  ) { }

  getProfile() {
    return this.http.get(this.host + 'userprofile', this.header.make());
  }

  updateProfile(data: any) {
    return this.http.put(this.host + 'modifyprofile', data, this.header.make());
  }

  setPassword(data: any) {
    return this.http.put(this.host + 'modifypassword', data, this.header.make());
  }
}
