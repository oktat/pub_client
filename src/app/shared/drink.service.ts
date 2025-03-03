import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {

  host = environment.host;

  constructor(
    private http: HttpClient,
    private header: HeaderService
  ) { }

  getDrinks() {
    let url = this.host + 'drinks';
    return this.http.get(url);
  }

  addDrink(data: any) {
    let url = this.host + 'new';
    return this.http.post(url, data, this.header.make());
  }
  updateDrink(data: any) {
    let url = this.host + 'modify';
    return this.http.put(url, data, this.header.make());
  }

  deleteDrink(id : number) {
    let url = this.host + 'destroy' + '/' + id;
    return this.http.delete(url, this.header.make());
  }  
}
