import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {EmployeeComponent} from './employee/employee.component';
import {DepartmentComponent} from './department/department.component';
import { ShowUpdateDepComponent } from './department/show-update-dep/show-update-dep.component';


const routes: Routes = [
{path:'employee' , component:EmployeeComponent},
{path:'department' , component:DepartmentComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
