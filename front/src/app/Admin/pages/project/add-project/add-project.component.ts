import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from '../../../../model/project.model';
@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit {
  ProjectForm !: FormGroup;
  categories : string[]=["2d" , "3d"];

  imagesPreview:string[]=[];
  selectedImages!: File[];

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.ProjectForm= this.fb.group
    ({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      images: [[]] as any, // workaround for file array form control
    });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
  
  onDrop(event: DragEvent) {
    event.preventDefault();
  
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  onImageChange(event : Event) : void
  {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if(files && files.length > 0)
    {
      const selectedFiles = Array.from(files);
      this.ProjectForm.patchValue({ images: selectedFiles });

      //get preview 
      this.imagesPreview = [];
      selectedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: any) => this.imagesPreview.push(e.target.result);
        reader.readAsDataURL(file);
      });
    }
    }
handleFiles(files: FileList) {
  this.selectedImages = Array.from(files);
  this.imagesPreview = this.selectedImages.map(file => URL.createObjectURL(file));
}
    
    OnSubmit(): void
    {
      if(this.ProjectForm.valid)
      {
        const project: Project = this.ProjectForm.value;
        console.log('Project submitted:', project);
        // Here you can handle the project submission, e.g., send it to a server
      }
    }
 
}