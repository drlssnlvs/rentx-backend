import CryptoJS from "crypto-js";

export const encrypt = (str: string): string => {
  const result = CryptoJS.AES.encrypt(
    JSON.stringify(str),
    process.env.PRIVATE_KEY || ""
  ).toString();

  return result;
};

export const decrypt = (str: string): string => {
  const bytes = CryptoJS.AES.decrypt(str, process.env.PRIVATE_KEY || "");

  const result = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return result;
};
