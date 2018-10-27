import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	constructor() { }

	getUsers() {
		return JSON.parse(localStorage.getItem('users'));
	}

	getCheckForUsers() {
		return JSON.parse(localStorage.getItem('users')) ? true : false;
	}

	saveUser(users: any) {
		localStorage.setItem('users', JSON.stringify(users));
	}
}
