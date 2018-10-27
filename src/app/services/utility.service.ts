import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UtilityService {
	userValidationMessages: any = {
		'firstName': [
			{ type: 'required', message: 'First name is required!' },
			{ type: 'pattern', message: 'Your first name must not contain numbers and spacial characters!' }
		],
		'lastName': [
			{ type: 'required', message: 'Last name is required!' },
			{ type: 'pattern', message: 'Your last name must not contain numbers and spacial characters!' },
		],
		'gender': [
			{ type: 'required', message: 'Gender is required!' }
		],
		'email': [
			{ type: 'required', message: 'Email is required!' },
			{ type: 'email', message: 'Enter valid email address!' }
		],
		'password': [
			{ type: 'required', message: 'Password is required!', priority: 1 },
			{ type: 'minlength', message: 'Password must be at least 8 characters long!', priority: 2 },
			{ type: 'pattern', message: 'Your password must contain at least one uppercase!', priority: 3 }
		]
	};
	constructor() { }

	/**
	 * @description
	 * @author Sameer Khan
	 * @date 2018-10-27
	 * @param {Array<any>} array
	 * @param {number} index
	 * @returns
	 * @memberof UtilityService
	 */
	removeElementFromArrayOfObject(array: Array<any>, index: number) {
		if (index > -1) {
			array.splice(index, 1);
		}
		return array;
	}

}
