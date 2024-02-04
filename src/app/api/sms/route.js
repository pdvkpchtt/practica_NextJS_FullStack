"use server";

import axios from "axios";

export default async function sendVerificationCodeSMS(phone, code = null) {
  try {
    const data = await axios.post(
      "https://smsc.ru/sys/send.php", null, {params: {
        login:'Nikolay_Third',
        psw:'ps4VSxboxone',
        phones:phone,
        mes:'Ваш ключ к успеху: ' + code
      }}
    );

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
