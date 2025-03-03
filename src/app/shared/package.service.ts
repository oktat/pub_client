import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  host = environment.host;

  constructor(
    private http: HttpClient,
    private header: HeaderService
  ) { }

  getPackages() {
    const url = this.host + 'packages';
    return this.http.get(url);
  }

  addPackage(data: any) {
    const url = this.host + 'newpackage';
    return this.http.post(url, data, this.header.make());
  }

  updatePackage(data: any) {
    const url = this.host + 'modpackage';
    return this.http.put(url, data, this.header.make());
  }

  deletePackage(id : number) {
    const url = this.host + 'destpackage' + '/' + id;
    return this.http.delete(url, this.header.make());
  }
}
