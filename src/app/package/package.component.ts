import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PackageService } from '../shared/package.service';

@Component({
  selector: 'app-package',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './package.component.html',
  styleUrl: './package.component.css'
})
export class PackageComponent {
  packageForm!: FormGroup;
  packageList!: any;
  addMode = true;

  constructor(
    private builder: FormBuilder,
    private api: PackageService
  ) { }

  ngOnInit() {
    this.packageForm = this.builder.group({
      id: [''],
      package: ['']
    });
    this.getPackages();
  }

  getPackages() {
    this.api.getPackages().subscribe({
      next: (res: any) => {
        console.log(res);
        this.packageList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  savePackage() {
    if(this.addMode) {
      this.addPackage();
    }else {
      this.updatePackage();  
    }
    this.packageForm.reset();
  }

  addPackage() {
    console.log(this.packageForm.value);
    this.api.addPackage(this.packageForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getPackages();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  editPackage(packageData: any) {
    this.addMode = false;
    console.log(packageData);
    this.packageForm.patchValue(packageData);
  }

  updatePackage() {
    console.log(this.packageForm.value);
    
    this.api.updatePackage(this.packageForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getPackages();
        this.addMode = true;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deletePackage(id: number) {
    console.log(id);
    this.api.deletePackage(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getPackages();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  closeButton() {
    this.packageForm.reset();
    this.addMode = true;
  }  
}
