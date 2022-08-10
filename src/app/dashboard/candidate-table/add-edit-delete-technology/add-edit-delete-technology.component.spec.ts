import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDeleteTechnologyComponent } from './add-edit-delete-technology.component';

describe('AddEditDeleteTechnologyComponent', () => {
  let component: AddEditDeleteTechnologyComponent;
  let fixture: ComponentFixture<AddEditDeleteTechnologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDeleteTechnologyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDeleteTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
