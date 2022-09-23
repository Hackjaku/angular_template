import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  /*
    { path: '', redirectTo: 'personal', pathMatch: 'full' },
    { path: 'personal', component: PersonalComponent },
    { path: '**', component: NotFoundComponent },
  */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
