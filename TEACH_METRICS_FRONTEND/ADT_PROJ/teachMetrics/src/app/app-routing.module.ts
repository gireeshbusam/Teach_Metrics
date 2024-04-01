import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecruithomeComponent } from './recruithome/recruithome.component';
import { AssessmentsComponent } from './assessments/assessments.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AnalysisComponent } from './analysis/analysis.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recruit', component: RecruithomeComponent },
  { path: 'assessment', component: AssessmentsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'analysis', component: AnalysisComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
