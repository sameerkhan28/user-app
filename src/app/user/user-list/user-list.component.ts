import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { UtilityService } from 'src/app/services/utility.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
	users: Array<UserModel> = [];

	constructor(private _utilService: UtilityService,
		private _userService: UserService) { }

	ngOnInit() {
		this.users = JSON.parse(localStorage.getItem('users'));
	}

	/**
	 * @description Delete user with id and update the localstorage.
	 * @author Sameer Khan
	 * @date 2018-10-27
	 * @param {string} id
	 * @memberof UserListComponent
	 */
	deleteUser(id: string) {
		const index = this.users.findIndex(user => user.id === id);
		this.users = this._utilService.removeElementFromArrayOfObject(this.users, index);
		console.log(this.users);
		this._userService.saveUser(this.users);
	}

}
