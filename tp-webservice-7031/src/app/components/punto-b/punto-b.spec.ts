import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoB } from './punto-b';

describe('PuntoB', () => {
  let component: PuntoB;
  let fixture: ComponentFixture<PuntoB>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuntoB],
    }).compileComponents();

    fixture = TestBed.createComponent(PuntoB);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
