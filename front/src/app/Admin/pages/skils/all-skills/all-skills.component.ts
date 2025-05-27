import { Component } from '@angular/core';
import { Skill } from '../../../../model/skills.model';

@Component({
  selector: 'app-all-skills',
  standalone: true,
  imports: [],
  templateUrl: './all-skills.component.html',
  styleUrl: './all-skills.component.css'
})
export class AllSkillsComponent {
skills : Skill[] = [
  { id: 1, name: 'vray', logo: 'assets/Image/vray.png' },

  { id: 2, name: '3ds max', logo: 'assets/Image/3dsmax.png' },
  
  
];
}
