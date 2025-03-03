import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  userList !: any;
  cityList !: any;
  userForm !: FormGroup
  addMode = true


  constructor(
    private auth: AuthService,
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userForm = this.builder.group({
      id: [''],
      name: ['', Validators.min(3)],
      email: [''],
      city: [''],
      password: [''],
      confirm_password: ['']
    })
    this.getCities();
  }

  getUsers() {
    return this.auth.getUser().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.userList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getCities() {
    return this.auth.getCities().subscribe({
      next: (res: any) => {
        console.log(res);
        this.cityList = res;
        this.getUsers();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  editUser(user : any) {
    console.log(user);
    this.userForm.patchValue({
      id: user.id,
      name: user.name,
      email: user.email,
      city: this.getCityName(user.city_id)
    });
    this.addMode = false
  }

  saveUser() {
    if(this.addMode) {
      this.addUser();
    }else {
      this.updateUser();
    }
    this.userForm.reset();
    this.addMode = true
  }

  addUser() {
    console.log('működik...')
    this.auth.register(this.userForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getUsers();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateUser() {
    console.log(this.userForm.value);
    this.auth.updateUser(this.userForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getUsers();
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.userForm.reset();
  }  
  deleteUser(id : number) {
    console.log(id);
    this.auth.deleteUser(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getUsers();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getCityName(id : number) {
    let city = this.cityList.find((item : any) => item.id == id);
    return city.city;
  }
  
  back() {
    this.addMode = true
    this.userForm.reset();
  }
}
