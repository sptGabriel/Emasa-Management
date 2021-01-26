export const verifyFile = (file: any, acceptedFileExtensions: any) => {
	const { name } = file;

	var filExtenion = name.substring(name.lastIndexOf(".") + 1);

	if (acceptedFileExtensions.includes(filExtenion)){
			return true;
	}

	return false;
}