import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCvComponent } from './delete-cv.component';

describe('DeleteCvComponent', () => {
  let component: DeleteCvComponent;
  let fixture: ComponentFixture<DeleteCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
