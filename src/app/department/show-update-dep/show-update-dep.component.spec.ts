import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUpdateDepComponent } from './show-update-dep.component';

describe('ShowUpdateDepComponent', () => {
  let component: ShowUpdateDepComponent;
  let fixture: ComponentFixture<ShowUpdateDepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUpdateDepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUpdateDepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
