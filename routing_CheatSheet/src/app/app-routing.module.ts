import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardGuard } from "./auth-guard.guard";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolver } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    //localhost:4200/users
    {path: 'users', component: UsersComponent, children: [
      {path: ':id/:name', component: UserComponent},
    ]}, 
    {path: 'servers', 
    // canActivate: [AuthGuardGuard],
    canActivateChild: [AuthGuardGuard],
    component: ServersComponent, 
    children: [ //child routes need to have separate router outlet
      {path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard]},
      {path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
  
    ]},
    // {path: 'not-found', component: PageNotFoundComponent},
    {path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found!'}},
    //make sure this is the last one
    {path: '**', redirectTo: '/not-found'},
    // {path: 'servers/:id/edit', component: EditServerComponent},
    // {path: 'servers/:id', component: EditServerComponent},
    // {path: 'users/:id/:name', component: UserComponent},
  ];


@NgModule({
    imports: [
        //hash route routing, old. If routing cannot get to work.
        // RouterModule.forRoot(routes, {useHash: true})

        //Cleaner routes
        RouterModule.forRoot(routes)
    ],
    exports: [
        //accessible in the module that is importing this one
        RouterModule
    ]
})
export class AppRoutingModule {

}