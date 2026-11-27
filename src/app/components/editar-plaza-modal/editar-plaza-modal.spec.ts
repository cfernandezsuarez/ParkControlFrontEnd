import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPlazaModal } from './editar-plaza-modal';

describe('EditarPlazaModal', () => {
  let component: EditarPlazaModal;
  let fixture: ComponentFixture<EditarPlazaModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarPlazaModal],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarPlazaModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
