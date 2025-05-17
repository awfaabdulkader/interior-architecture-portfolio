import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ProjectsComponent } from './user/pages/projects/projects.component';
import { HomeComponent } from './user/pages/home/home.component';
import { Plan3dComponent } from './user/Projects/plan3d/plan3d.component';
import { Plan2dComponent } from './user/Projects/plan2d/plan2d.component';
import { FloorplanComponent } from './user/Projects/floorplan/floorplan.component';

export const routes: Routes = 
[
    {path: '' , component: HomeComponent},   
    {path:'portfolio' , component:ProjectsComponent},
    {path:'projects/3D' , component:Plan3dComponent},
    {path:'projects/2D' , component:Plan2dComponent},
    {path:'projects/floorPlan' , component:FloorplanComponent},

];
