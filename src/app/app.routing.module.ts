import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../core/guards/auth.guard';
import {WelcomeComponent} from './containers/welcome/welcome.component';
import {NotFoundComponent} from './containers/not-found/not-found.component';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {
    path: 'customers',

    canActivate: [AuthGuard],
    loadChildren: () => import('../customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
    imports: [
      RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [
      RouterModule
    ]
  }
)
export class AppRoutingModule {
}
