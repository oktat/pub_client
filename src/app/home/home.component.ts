import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DrinkService } from '../shared/drink.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  drinkForm !: FormGroup;
  drinkList !: any;

  constructor(
    private drinkApi : DrinkService,
    private builder: FormBuilder    
  ) { }

  ngOnInit() {
    this.drinkForm = this.builder.group({
      drink: [''],
      type: [''],
      amount: [''],
      package: ['']
    });

    this.getDrinks();    
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
}
