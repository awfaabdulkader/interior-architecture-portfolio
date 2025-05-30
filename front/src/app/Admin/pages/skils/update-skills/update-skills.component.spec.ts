import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSkillsComponent } from './update-skills.component';

describe('UpdateSkillsComponent', () => {
  let component: UpdateSkillsComponent;
  let fixture: ComponentFixture<UpdateSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSkillsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
