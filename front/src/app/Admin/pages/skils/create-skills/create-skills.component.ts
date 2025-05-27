import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Skill } from '../../../../model/skills.model';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-skills',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-skills.component.html',
  styleUrl: './create-skills.component.css'
})
export class CreateSkillsComponent implements OnInit {
  skillForm!: FormGroup;
  uploadedLogo: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  @ViewChild('logoInputRef', { static: false }) logoInputRef!: ElementRef;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      logo: [null, Validators.required]
    });
  }

  openFileInput(): void {
    this.logoInputRef.nativeElement.click();
  }

  onLogoSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.uploadedLogo = fileInput.files[0];
      this.skillForm.patchValue({ logo: this.uploadedLogo });

      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result;
      reader.readAsDataURL(this.uploadedLogo);
    }
  }

  onSubmit(): void {
    if (this.skillForm.valid) {
      const skill: Skill = this.skillForm.value;
      console.log('Skill submitted:', skill);
    } else {
      console.log('Form is invalid');
    }
  }
}
