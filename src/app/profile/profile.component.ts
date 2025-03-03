import { Component } from '@angular/core';
import { ProfileService } from '../shared/profile.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  profileForm !: FormGroup
  passwordForm !: FormGroup

  constructor(
    private profileApi : ProfileService,
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.profileForm = this.builder.group({
      name: [''],
      email: [''],
      city: ['']
    })
    this.passwordForm = this.builder.group({
      password: ['']
    })
    this.getProfile();
  }

  getProfile() {
    return this.profileApi.getProfile().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.profileForm.patchValue(res.data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  saveProfile() {
    console.log(this.profileForm.value);
    this.profileApi.updateProfile(this.profileForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getProfile();
      },
      error: (err) => {
        console.log(err);
      }
    })  
  }

  setPassword() {
    console.log(this.passwordForm.value);
    this.profileApi.setPassword(this.passwordForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })  
  }

}
