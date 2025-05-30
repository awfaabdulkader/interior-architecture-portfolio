import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSkillsComponent } from './all-skills.component';

describe('AllSkillsComponent', () => {
  let component: AllSkillsComponent;
  let fixture: ComponentFixture<AllSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSkillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
