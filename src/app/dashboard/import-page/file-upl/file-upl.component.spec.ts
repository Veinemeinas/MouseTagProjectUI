import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUplComponent } from './file-upl.component';

describe('FileUplComponent', () => {
  let component: FileUplComponent;
  let fixture: ComponentFixture<FileUplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileUplComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
