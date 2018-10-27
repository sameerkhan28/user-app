import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { appData } from '../../../assets/app-resources';
import { UtilityService } from 'src/app/services/utility.service';
import { MatSnackBar } from '@angular/material';
import { UserModel } from 'src/app/models/user-model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.component.html',
	styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
	private _users: Array<UserModel> = [];
	public userForm: FormGroup;
	private _namePattern = '^[aA-zZ]+';
	private _passwordPattern = '(?=.*[a-z])(?=.*[A-Z]).{7,}';
	validationMessages: any;
	userId: string;
	gender: Array<any> = appData.gender.options;

	constructor(private _userFormBuilder: FormBuilder,
		private _utilityService: UtilityService,
		private _snackBar: MatSnackBar,
		private _activatedRoute: ActivatedRoute,
		private _userService: UserService) {
		this.validationMessages = this._utilityService.userValidationMessages;
		this._generateForm();
	}

	ngOnInit() {
		this._activatedRoute.params.subscribe((param) => {
			if (param.id) {
				this.userId = param.id;
				this._getUserDetails(param.id);
			}
		});
	}

	/**
	 * @description This function will be executed in edit mode to fetch user details.
	 * @author Sameer Khan
	 * @date 2018-10-27
	 * @private
	 * @param {string} id
	 * @memberof AddUserComponent
	 */
	private _getUserDetails(id: string) {
		const user = this._userService.getUsers().find(item => item.id === id);
		delete user.id;
		this.userForm.setValue(user);
	}

	/**
	 * @description Function generates form elements
	 * @author Sameer Khan
	 * @date 2018-10-27
	 * @private
	 * @memberof AddUserComponent
	 */
	private _generateForm() {
		this.userForm = this._userFormBuilder.group({
			firstName: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this._namePattern)])),
			lastName: new FormControl('', Validators.compose([Validators.required, Validators.pattern(this._namePattern)])),
			gender: new FormControl('', Validators.required),
			address: new FormGroup({
				city: new FormControl(''),
				state: new FormControl('')
			}),
			loginInfo: new FormGroup({
				email: new FormControl('', [Validators.email, Validators.required]),
				password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(this._passwordPattern)]),
			})
		});
	}

	/**
	 * @description Adds/Updates user based on the condition where in userId is present or not and notify user about the result of the event through snackbar. Line by line description below. As there is no database present we have to make use of localstorage ot show how add/update and listing will work.
	 * @author Sameer Khan
	 * @date 2018-10-27
	 * @memberof AddUserComponent
	 */
	addUser() {
		let message = this.userForm.value.firstName + ' ' + this.userForm.value.lastName + ' added to the database.';
		let action = 'Success!';
		/* Checks whether form is valid or not if not notify user about error. */
		if (this.userForm.invalid) {
			message = 'Please fill all the information.';
			action = 'Failed';
		} else {
			/* Stores form value in separate object. */
			const user: UserModel = this.userForm.value;
			if (this.userId !== undefined) {
				message = 'Details for ' + this.userForm.value.firstName + ' ' + this.userForm.value.lastName + ' has been updated.';
				/* In case of updated index of the user from users array fetched */
				const index = this._userService.getUsers().findIndex(x => x.id === this.userId);
				/* As there is no id present in forms element had to add id. */
				user.id = this.userId;
				/* Finally replaced user with updated user. */
				this._users[index] = user;
			} else {
				/* Line checks for the users present or not if present will store in global _users array else will make it empty.*/
				this._users = this._userService.getCheckForUsers() ? this._userService.getUsers() : [];
				if (this._users || this._users.length > 0) {
					/* Id is added to deal with the edit and delete as this line would be meaningless if we would have database in picture. */
					user.id = 'user_' + (this._users.length + 1);
				} else {
					user.id = 'user_1';
				}
				this._users.push(user);
				/* Resetting form value once saved successfully. */
				this.userForm.reset();
			}
			/* Calling function in a service to save user to localstorage. */
			this._userService.saveUser(this._users);
		}
		/* Snackbar opens every time the result is present. */
		this._snackBar.open(message, action, {
			duration: 2000,
		});
	}
}
