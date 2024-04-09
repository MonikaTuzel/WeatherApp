import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { ContentComponent } from "./content/content.component";
import { TownDetailsComponent } from "./town-details/town-details.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: ContentComponent},
  {path: 'townDetails/:townID', component: TownDetailsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withComponentInputBinding()),
  ]
})

export class AppRoutingModule { }