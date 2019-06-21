import { Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail-resolver';
import { MemberListResolver } from './_resolvers/member-list-resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit-resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent ,resolve: {users:MemberListResolver} },
            {path: 'messages', component: MessagesComponent},
            {path: 'members/edit', component: MemberEditComponent, resolve :{user:MemberEditResolver},canDeactivate: [PreventUnsavedChanges]},

            {path: 'members/:id', component: MemberDetailComponent, resolve:{user:MemberDetailResolver} },
        
            {path: 'lists', component: ListsComponent},
            {path: '**', redirectTo: '', pathMatch: 'full'}
        ]
    }
   
];
@NgModule
({
    imports: [RouterModule.forRoot(appRoutes)],

    exports: [RouterModule]
})
export class AppRoutingModule {

}