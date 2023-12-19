/* eslint-disable import/no-anonymous-default-export */
import * as CryptoJS from 'crypto-js'; 
const pass = process.env.CRYPTO_PASS as string

export default {
  encrypt(data: any) {
    if (!data) { return null }
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), pass).toString();
    return ciphertext
  },
  decrypt(data: string) {
    if (!data) { return null }
    var bytes  = CryptoJS.AES.decrypt(data.toString(), pass);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData
  },
}
