export interface forgotPwdDTO{
	email: string;
}

export interface resetPwdDTO {
	token: string;
	email: string;
	password: string;
	confirmPassword: string;
	ip: string;
	latitude: string;
	longitude: string;
	device: string;
	os: string;
}