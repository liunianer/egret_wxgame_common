class Aes {

	/*密钥*/
	public static key = CryptoJS.enc.Utf8.parse("28648618c9bb509c5bccdeab4ddac2cd");
	public static iv = CryptoJS.enc.Utf8.parse("1848a11cb7c7fa1a");

	/**
	 * 加密
	 */
	public static aesEncode(str:string) {
		let plaintText = CryptoJS.enc.Utf8.parse(str);
		var encryptedData = CryptoJS.AES.encrypt(plaintText, Aes.key, {
			iv: Aes.iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		// return encryptedData.ciphertext.toString();
		return CryptoJS.enc.Base64.stringify(encryptedData.ciphertext);
	}

	/**
	 * 解密 
	 */
	public static aesDecode(encryptedStr) {
		// let baseResult = CryptoJS.enc.Base64.parse(encryptedStr);   // Base64解密
		// let ciphertext = CryptoJS.enc.Base64.stringify(baseResult);     // Base64解密
		console.log(CryptoJS)
		let decryptResult = CryptoJS.AES.decrypt(encryptedStr, Aes.key, {    //  AES解密
			iv: Aes.iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.ZeroPadding
		});
		// let resData = decryptResult.toString(CryptoJS.enc.Utf8).toString();
		let resData = decryptResult.toString(CryptoJS.enc.Utf8);
		return resData;
	}

	
	public static aesDecode2(encryptedStr) {
		let baseResult = CryptoJS.enc.Base64.parse(encryptedStr);   // Base64解密
		let ciphertext = CryptoJS.enc.Base64.stringify(baseResult);     // Base64解密
		let decryptResult = CryptoJS.AES.decrypt(ciphertext, Aes.key, {    //  AES解密
			iv: Aes.iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		let resData = decryptResult.toString(CryptoJS.enc.Utf8).toString();
		return resData;
	}

}
