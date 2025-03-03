import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(
    private auth: AuthService,
    private router: Router,
    private app: AppComponent
  ) { }

  ngOnInit() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.app.loggedIn = false;
    this.app.isSuper = false;

    this.auth.logout().subscribe({
      next: (data) => {
        console.log(data);
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
