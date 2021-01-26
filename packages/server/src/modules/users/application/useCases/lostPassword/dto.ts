export interface forgotPwdDTO{
	email: string;
}

export interface resetPwdDTO {
	token: string;
	password: string;
	confirmPassword: string;
	ip: string;
	latitude: number;
	longitude: number;
	device: string;
	os: string;
}