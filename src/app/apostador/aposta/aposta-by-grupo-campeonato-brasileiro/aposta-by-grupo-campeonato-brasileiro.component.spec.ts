import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApostaByGrupoCampeonatoBrasileiroComponent } from './aposta-by-grupo-campeonato-brasileiro.component';

describe('ApostaByGrupoCampeonatoBrasileiroComponent', () => {
  let component: ApostaByGrupoCampeonatoBrasileiroComponent;
  let fixture: ComponentFixture<ApostaByGrupoCampeonatoBrasileiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApostaByGrupoCampeonatoBrasileiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApostaByGrupoCampeonatoBrasileiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
