import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoD } from './punto-d';

describe('PuntoD', () => {
  let component: PuntoD;
  let fixture: ComponentFixture<PuntoD>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntoD],
    }).compileComponents();

    fixture = TestBed.createComponent(PuntoD);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
