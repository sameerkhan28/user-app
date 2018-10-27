export class UserModel {
	id: string;
	firstName: string;
	lastName: string;
	gender: string;
	address: Address;
	loginInfo: LoginInformation;

	constructor(data?) {
		this.id = (data && data.id !== '') ? data.id : '';
		this.firstName = (data && data.firstName !== '') ? data.firstName : '';
		this.lastName = (data && data.lastName !== '') ? data.lastName : '';
		this.gender = (data && data.gender !== '') ? data.gender : '';
		this.address = (data && data.firstName !== '') ? data.firstName : new Address();
		this.loginInfo = (data && data.loginInfo !== '') ? data.loginInfo : new LoginInformation();
	}
}

export class Address {
	city: string;
	state: string;

	constructor(data?) {
		this.city = (data && data.city !== '') ? data.city : '';
		this.state = (data && data.state !== '') ? data.state : '';
	}
}

export class LoginInformation {
	email: string;
	password: string;

	constructor(data?) {
		this.email = (data && data.email !== '') ? data.email : '';
		this.password = (data && data.password !== '') ? data.password : '';
	}
}
