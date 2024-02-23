import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

//Importamos las dos funciones que creamos anteriormente.
import { canActivateGuard, canMatchGuard } from './auth/guards/auth.guard';
import { canActivatePublicGuard, canMatchPublicGuard } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
    canActivate: [canActivatePublicGuard], //Anclamos la función del canActive del public guard
    canMatch: [canMatchPublicGuard], //Anclamos la función del canMatch del public guard
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule),
    canActivate: [canActivateGuard], //Anclamos la función del canActive del auth guard
    canMatch: [canMatchGuard], //Anclamos la función del canMatch del auth guard
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
