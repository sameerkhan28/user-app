import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserModuleComponent } from './user-module/user-module.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
	{
		path: 'user',
		component: UserModuleComponent,
		children: [
			{
				path: 'add',
				component: AddUserComponent,
			},
			{
				path: 'list',
				component: UserListComponent
			},
			{
				path: 'edit/:id',
				component: AddUserComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UserRoutingModule { }
