import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarAbonadoModal } from './editar-abonado-modal';

describe('EditarAbonadoModal', () => {
  let component: EditarAbonadoModal;
  let fixture: ComponentFixture<EditarAbonadoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAbonadoModal],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarAbonadoModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
