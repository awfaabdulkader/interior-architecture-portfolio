import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Experience } from '../../../../model/experience.model';

@Component({
  selector: 'app-add-experience',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-experience.component.html',
  styleUrl: './add-experience.component.css'
})
export class AddExperienceComponent implements OnInit {
  experienceForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.experienceForm = this.fb.group({
      yearStart: ['', Validators.required],
      yearEnd: ['', Validators.required],
      post: ['', Validators.required],
      company: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.experienceForm.valid) {
      const experience: Experience = this.experienceForm.value;
      console.log(experience);
    } else {
      console.log('Form is invalid');
    }
  }
}
