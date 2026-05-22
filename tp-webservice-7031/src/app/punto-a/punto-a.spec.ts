import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoA } from './punto-a';

describe('PuntoA', () => {
  let component: PuntoA;
  let fixture: ComponentFixture<PuntoA>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntoA],
    }).compileComponents();

    fixture = TestBed.createComponent(PuntoA);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
