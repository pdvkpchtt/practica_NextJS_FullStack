"use server";

import axios from "axios";

export default async function sendVerificationCodeSMS(phone, code = null) {
  try {
    const data = await axios.post("https://smsc.ru/sys/send.php", null, {
      params: {
        login: process.env.SMSC_LOGIN,
        psw: process.env.SMSC_PSW,
        phones: phone,
        mes: "Ваш ключ к успеху: " + code,
      },
    });

    return data.data;
  } catch (err) {
    return {
      error: {
        comment:
          "Не удалось подключиться к серверу. Проверьте интернет-соединение",
      },
    };
  }
}
