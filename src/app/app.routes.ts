import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { DrinkComponent } from './drink/drink.component';
import { NopageComponent } from './nopage/nopage.component';
import { TypeComponent } from './type/type.component';
import { PackageComponent } from './package/package.component';
import { ProfileComponent } from './profile/profile.component';
import { SetadminComponent } from './admin/setadmin/setadmin.component';
import { AdminComponent } from './admin/admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { authGuard } from './shared/auth.guard';
import { superGuard } from './shared/super.guard';

export const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent},
  { path: 'drink', component: DrinkComponent, canActivate: [authGuard]},
  { path: 'type', component: TypeComponent},
  { path: 'package', component: PackageComponent},
  { path: 'profile', component: ProfileComponent},
  
  { 
    path: 'admin', component: AdminComponent, canActivate: [superGuard],
    children: [
      { path: 'setadmin', component: SetadminComponent },
      { path: 'users', component: UsersComponent }
    ]
  },


  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NopageComponent }

];
