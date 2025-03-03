import { Component } from '@angular/core';
import { DrinkService } from '../shared/drink.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TypeService } from '../shared/type.service';
import { PackageService } from '../shared/package.service';

@Component({
  selector: 'app-drink',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './drink.component.html',
  styleUrl: './drink.component.css'
})
export class DrinkComponent {

  drinkForm !: FormGroup;
  drinkList !: any;
  typeList !: any;
  packageList !: any;

  addMode = true;

  constructor(
    private drinkApi : DrinkService,
    private typeApi : TypeService,
    private packageApi : PackageService,
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.drinkForm = this.builder.group({
      id: [''],
      drink: [''],
      type: [''],
      amount: [''],
      package: ['']
    });

    this.getDrinks();
    this.getTypes();
    this.getPackages();
  }

  getDrinks() {
    this.drinkApi.getDrinks().subscribe({
      next: (res: any) => {
        console.log(res);
        this.drinkList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getTypes() {
    this.typeApi.getTypes().subscribe({
      next: (res: any) => {
        console.log(res);
        this.typeList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getPackages() {
    this.packageApi.getPackages().subscribe({
      next: (res: any) => {
        console.log(res);
        this.packageList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  saveDrink() {
    if(this.addMode) {
      this.addDrink();
    }else {
      this.updateDrink();
    }
    
  }
  
  addDrink() {
    this.drinkApi.addDrink(this.drinkForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getDrinks();
        this.drinkForm.reset();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  editDrink(drink: any) {
    console.log(drink);
    this.addMode = false;
    this.drinkForm.patchValue(drink);
  }

  updateDrink() {
    console.log("Update...")
    this.drinkApi.updateDrink(this.drinkForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getDrinks();
        this.drinkForm.reset();
        this.addMode = true;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteDrink(id: number) {
    console.log(id);
    this.drinkApi.deleteDrink(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getDrinks();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  closeButton() {
    this.drinkForm.reset();
    this.addMode = true;
  }
}
