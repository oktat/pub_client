import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  loggedIn = false;
  isSuper = false;

  ngOnInit() {
    this.loggedIn = !!localStorage.getItem('token');
    const admin = localStorage.getItem('admin');
    if (admin == "2") {
      this.isSuper = true;
    }
  }
}
