import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadLigasComponent } from './cad-ligas.component';

describe('CadLigasComponent', () => {
  let component: CadLigasComponent;
  let fixture: ComponentFixture<CadLigasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadLigasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadLigasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
