

export const generateString = () => {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = " ";
	const charactersLength = characters.length;
	for (let i = 0; i < 15; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	var dateStr = Math.random().toString(36).substring(2, 7);

	return result + String(dateStr).slice(0, 5);
}