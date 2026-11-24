import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarTarifaModal } from './editar-tarifa-modal';

describe('EditarTarifaModal', () => {
  let component: EditarTarifaModal;
  let fixture: ComponentFixture<EditarTarifaModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTarifaModal],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarTarifaModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
