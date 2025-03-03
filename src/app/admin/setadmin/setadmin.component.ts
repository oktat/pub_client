import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-setadmin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './setadmin.component.html',
  styleUrl: './setadmin.component.css'
})
export class SetadminComponent {

  userList !: any

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }
  setAdmin(user: any) {
    const data = {
      id: user.id,
      admin: user.admin
    }
    this.auth.setAdmin(data).subscribe({
      next: (res: any) => {
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getUser() {
    this.auth.getUser().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.userList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
