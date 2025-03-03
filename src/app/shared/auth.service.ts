import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  host = environment.host;

  constructor(
    private http: HttpClient,
    private header: HeaderService
  ) { }

  login(userData: any) {
    let url = this.host + 'login';
    return this.http.post(url, userData);
  }

  register(data: any) {
    const url = this.host + 'register';
    return this.http.post(url, data);
  }

  logout() {
    const url = this.host + 'logout';
    return this.http.post(url, null, this.header.make());
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  isSuper() {
    const admin = localStorage.getItem('admin');
    if (admin == "2") {
      return true;
    }
    return false;
  }

  getUser() {
    const url = this.host + 'users';
    return this.http.get(url, this.header.make());
  }

  getCities() {
    const url = this.host + 'cities';
    return this.http.get(url, this.header.make());
  }
  
  updateUser(data: any) {
    const url = this.host + 'updateuser';
    return this.http.put(url, data, this.header.make());
  }

  deleteUser(id : number) {
    const url = this.host + 'deleteuser' + '/' + id;
    return this.http.delete(url, this.header.make());
  }

  setAdmin(data: any) {
    const url = this.host + 'admin';
    return this.http.put(url, data, this.header.make());
  }
}
