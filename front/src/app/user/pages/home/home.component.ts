import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ProfileComponent } from '../../components/profile/profile.component';
import { ServicesPageComponent } from '../services-page/services-page.component';
import { ExperienceComponent } from '../experience/experience.component';
import { SkillsComponent } from '../../skills/skills.component';
import { RacentprojectsComponent } from '../racentprojects/racentprojects.component';
import { WorkwithusComponent } from '../workwithus/workwithus.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
     // All components shown on home
     HeaderComponent,
     ProfileComponent,
     ServicesPageComponent,
     ExperienceComponent,
     SkillsComponent,
     RacentprojectsComponent,
     WorkwithusComponent,
     ContactComponent,
     FooterComponent,
  ],
  template: `
  <app-profile id="about"></app-profile>
  <app-services-page></app-services-page>
  <app-experience></app-experience>
  <app-skills></app-skills>
  <app-racentprojects id="projects"></app-racentprojects>
  <app-workwithus ></app-workwithus>
  <app-contact id="contact"></app-contact>
`,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
