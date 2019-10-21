import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateComponent } from './update/update.component';
import { ListCientistsComponent } from './list-cientists/list-cientists.component';
import { DetailsComponent } from './details/details.component';
import { UpdatePremiumComponent } from './update-premium/update-premium.component';
import { GlossaryComponent } from './glossary/glossary.component';
import { MembersRecommendedComponent } from './members-recommended/members-recommended.component';
import { AuthGuard } from './auth.guard';

// canActivate: [AuthGuard]
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},  
  {path: 'register', component: RegisterComponent},
  {path: 'register-success', component: RegisterSuccessComponent},
  {path: 'profile', component: ProfileComponent,canActivate: [AuthGuard]},
  {path: 'update', component: UpdateComponent,canActivate: [AuthGuard]},
  {path: 'details', component: DetailsComponent,canActivate: [AuthGuard]},
  {path: 'cientists', component: ListCientistsComponent,canActivate: [AuthGuard]},
  {path: 'premium', component: UpdatePremiumComponent,canActivate: [AuthGuard]},
  {path: 'members-recommended', component: MembersRecommendedComponent,canActivate: [AuthGuard]},
  {path: 'glossary', component: GlossaryComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
