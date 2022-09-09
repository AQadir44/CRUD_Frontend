import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUpdateEmpComponent } from './show-update-emp.component';

describe('ShowUpdateEmpComponent', () => {
  let component: ShowUpdateEmpComponent;
  let fixture: ComponentFixture<ShowUpdateEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUpdateEmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUpdateEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
