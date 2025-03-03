import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm !: any;

  constructor(
    private auth: AuthService,
    private builder: FormBuilder,
    private app: AppComponent,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  login() {
    console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe({
      next: (body: any) => {
        console.log(body.data.token);
        console.log(body.data.admin);
        localStorage.setItem('admin', body.data.admin);
        localStorage.setItem('token', body.data.token);

        if (body.data.admin == "2") {
          this.app.isSuper = true;
        }

        this.app.loggedIn = true;
        this.loginForm.reset();
        this.router.navigate(['drink']);
      },
      error: (err) => {}
    });

  }
}
