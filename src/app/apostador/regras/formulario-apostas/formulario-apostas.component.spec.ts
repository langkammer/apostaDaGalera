import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioApostasComponent } from './formulario-apostas.component';

describe('FormularioApostasComponent', () => {
  let component: FormularioApostasComponent;
  let fixture: ComponentFixture<FormularioApostasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioApostasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioApostasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
