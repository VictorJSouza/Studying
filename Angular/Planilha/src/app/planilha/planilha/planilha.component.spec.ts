import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanilhaComponent } from './planilha.component';

describe('PlanilhaComponent', () => {
  let component: PlanilhaComponent;
  let fixture: ComponentFixture<PlanilhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanilhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanilhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
