import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  make() {
    return {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }    
  }
}
