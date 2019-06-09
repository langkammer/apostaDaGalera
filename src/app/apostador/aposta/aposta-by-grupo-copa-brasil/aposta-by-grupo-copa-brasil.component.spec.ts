import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApostaByGrupoCopaBrasilComponent } from './aposta-by-grupo-copa-brasil.component';

describe('ApostaByGrupoCopaBrasilComponent', () => {
  let component: ApostaByGrupoCopaBrasilComponent;
  let fixture: ComponentFixture<ApostaByGrupoCopaBrasilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApostaByGrupoCopaBrasilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApostaByGrupoCopaBrasilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
