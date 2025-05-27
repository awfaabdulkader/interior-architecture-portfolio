import { Routes } from '@angular/router';
import { clientLayoutComponent } from './layouts/client-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout.component';

import { ProjectsComponent } from './user/pages/projects/projects.component';
import { HomeComponent } from './user/pages/home/home.component';
import { Plan3dComponent } from './user/Projects/plan3d/plan3d.component';
import { Plan2dComponent } from './user/Projects/plan2d/plan2d.component';
import { FloorplanComponent } from './user/Projects/floorplan/floorplan.component';

import { AddEducationComponent } from './Admin/pages/Education/add-education/add-education.component';
import { ListEducationComponent } from './Admin/pages/Education/list-education/list-education.component';
import { AddExperienceComponent } from './Admin/pages/EE/add-experience/add-experience.component';
import { AllExperiencesComponent } from './Admin/pages/EE/all-experiences/all-experiences.component';
import { DashComponent } from './Admin/pages/dash/dash.component';
import { AddProjectComponent } from './Admin/pages/project/add-project/add-project.component';
import { AllProjectsComponent } from './Admin/pages/project/all-projects/all-projects.component';
import { ContactComponent } from './Admin/pages/contact/contact.component';
import { CreateSkillsComponent } from './Admin/pages/skils/create-skills/create-skills.component';
import { AllSkillsComponent } from './Admin/pages/skils/all-skills/all-skills.component';
import { CreateCategoryComponent } from './Admin/pages/category_project/create-category/create-category.component';
import { AllCategoryComponent } from './Admin/pages/category_project/all-category/all-category.component';

export const routes: Routes = [
  {
    path: '',
    component: clientLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'portfolio', component: ProjectsComponent },
      { path: 'projects/3D', component: Plan3dComponent },
      { path: 'projects/2D', component: Plan2dComponent },
      { path: 'projects/floorPlan', component: FloorplanComponent },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashComponent },
      { path: 'add/education', component: AddEducationComponent },
      { path: 'list/education', component: ListEducationComponent },
      { path: 'add/experience', component: AddExperienceComponent },
      { path: 'list/experience', component: AllExperiencesComponent },
      { path: 'add/project', component: AddProjectComponent },
      { path: 'list/project', component: AllProjectsComponent },
      { path: 'add/skills', component: CreateSkillsComponent },
      { path: 'list/skills', component: AllSkillsComponent },
      { path: 'add/categories', component: CreateCategoryComponent },
      { path: 'list/categories', component:  AllCategoryComponent},
      {path:'contact' ,component:ContactComponent}
    ],
  },
];
