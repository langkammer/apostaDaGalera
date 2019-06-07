import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioGrupoComponent } from './formulario-grupo.component';

describe('FormularioGrupoComponent', () => {
  let component: FormularioGrupoComponent;
  let fixture: ComponentFixture<FormularioGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
