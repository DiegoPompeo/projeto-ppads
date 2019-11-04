import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { ProfileComponent } from './profile/profile.component';
import { ListCientistsComponent } from './list-cientists/list-cientists.component';
import { UpdateComponent } from './update/update.component';
import { DetailsComponent } from './details/details.component';
import { GlossaryComponent } from './glossary/glossary.component';
import { MembersRecommendedComponent } from './members-recommended/members-recommended.component';
import { PostComponent } from './post/post.component';
import { GlossarySuccessComponent } from './glossary-success/glossary-success.component';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MenuComponent,
    RegisterSuccessComponent,
    ProfileComponent,
    ListCientistsComponent,
    UpdateComponent,
    DetailsComponent,
    GlossaryComponent,
    MembersRecommendedComponent,
    PostComponent,
    GlossarySuccessComponent,
    SearchComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
