import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoE } from './punto-e';

describe('PuntoE', () => {
  let component: PuntoE;
  let fixture: ComponentFixture<PuntoE>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntoE],
    }).compileComponents();

    fixture = TestBed.createComponent(PuntoE);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
