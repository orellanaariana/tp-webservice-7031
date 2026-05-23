import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoC } from './punto-c';

describe('PuntoC', () => {
  let component: PuntoC;
  let fixture: ComponentFixture<PuntoC>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntoC],
    }).compileComponents();

    fixture = TestBed.createComponent(PuntoC);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
