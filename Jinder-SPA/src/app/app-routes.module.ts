import { Routes, RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent },
            {path: 'messages', component: MessagesComponent},
        
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