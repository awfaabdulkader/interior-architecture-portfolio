import { Component , signal, Signal} from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css'
})
export class SkillsComponent {

  skills = signal([
    { src: 'assets/Image/ske.png', alt: 'SketchUp' },
    { src: 'assets/Image/archicad.png', alt: 'Archicad' },
    { src: 'assets/Image/lumion.png', alt: 'Lumion' },
    { src: 'assets/Image/vray.png', alt: 'V-Ray' },
  
  ]);
  
}
