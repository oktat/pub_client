import { Component } from '@angular/core';
import { TypeService } from '../shared/type.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-type',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './type.component.html',
  styleUrl: './type.component.css'
})
export class TypeComponent {

  typeList: any = [];
  typeForm !: FormGroup;
  addMode = true;

  constructor(
    private api: TypeService,
    private builder: FormBuilder
  ) { }

  ngOnInit() {
    this.typeForm = this.builder.group({
      id: [''],
      type: ['']
    });
    this.getTypes();
  }

  getTypes() {
    return this.api.getTypes().subscribe({
      next: (res: any) => {
        console.log(res);
        this.typeList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  saveType() {
    if(this.addMode) {
      this.addType();
    }else {
      this.updateType();
    }
    this.typeForm.reset();
  }

  addType() {
    console.log(this.typeForm.value);
    this.api.addType(this.typeForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getTypes();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateType() {
    console.log(this.typeForm.value);
    this.api.updateType(this.typeForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getTypes();
        this.addMode = true;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  editType(type: any) {
    console.log(type);
    this.typeForm.patchValue(type);
    this.addMode = false;
  }

  deleteType(id: number) {
    console.log(id);
    this.api.deleteType(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getTypes();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  closeButton(){
    this.typeForm.reset();
    this.addMode = true;
  }
}
