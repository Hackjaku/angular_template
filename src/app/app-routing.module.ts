import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { PrivateComponent } from './private/private.component';
import { PublicComponent } from './public/public.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'private',
    pathMatch: 'full'
  },
  {
    path: 'public',
    component: PublicComponent,
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'private',
    component: PrivateComponent,
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./private/private.module').then(m => m.PrivateModule)
  },
  {
    path: '*',
    redirectTo: 'not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }