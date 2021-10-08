import CryptoJs from "crypto-js";

export default {
  //#region crypto
  cryptoJs: {
    encryption_AES: (dataObj) => {
      return CryptoJs.AES.encrypt(
        JSON.stringify(dataObj),
        process.env.SECRET_KEY_AES
      )
        .toString()
        .replace(/\+/g, "p1L2u3S")
        .replace(/\//g, "s1L2a3S4h")
        .replace(/=/g, "e1Q2u3A4l");
    },
    decryption_AES: (dataObj) => {
      dataObj = dataObj
        .replace(/p1L2u3S/g, "+")
        .replace(/s1L2a3S4h/g, "/")
        .replace(/e1Q2u3A4l/g, "=");

      var bytes = CryptoJs.AES.decrypt(dataObj, process.env.SECRET_KEY_AES);
      return JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
    },
    generateKey: (length = 128, wordArray = false) => {
      let random = CryptoJs.lib.WordArray.random(length / 8);
      return wordArray ? random : random.toString();
    },
  },
  //#endregion
};
