export interface forgotPwdDTO{
	email: string;
	ip: string;
	longitude: string;
	latitude: string;
}

export interface resetPwdDTO {
	token: string;
	email: string;
	password: string;
	confirmPassword: string;
}