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
import { MembersRecommendedComponent } from './members-recommended/members-recommended.component';
import { AuthGuard } from './auth.guard';
import { PostComponent } from './post/post.component';
import { GlossaryComponent } from './glossary/glossary.component';
import { SearchComponent } from './search/search.component';
import { ListFriendsComponent } from './list-friends/list-friends.component';

// canActivate: [AuthGuard]
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},  
  {path: 'register', component: RegisterComponent},
  {path: 'register-success', component: RegisterSuccessComponent},
  {path: 'profile', component: ProfileComponent,canActivate: [AuthGuard]},
  {path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
  {path: 'update', component: UpdateComponent,canActivate: [AuthGuard]},
  {path: 'details', component: DetailsComponent,canActivate: [AuthGuard]},
  {path: 'cientists', component: ListCientistsComponent,canActivate: [AuthGuard]},
  {path: 'post', component: PostComponent,canActivate: [AuthGuard]},
  {path: 'interest', component: GlossaryComponent,canActivate: [AuthGuard]},
  {path: 'recommended', component: MembersRecommendedComponent,canActivate: [AuthGuard]},
  {path: 'friends', component: ListFriendsComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
