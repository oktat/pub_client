import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetadminComponent } from './setadmin.component';

describe('SetadminComponent', () => {
  let component: SetadminComponent;
  let fixture: ComponentFixture<SetadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
