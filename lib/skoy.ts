let db: { [key: string]: any } = {},
  maxLength = 0;

function learnWord(from: string, to: string | Array<string>) {
  if (Array.isArray(to) && to.length) {
    for (let i = 0; i < to.length; i++) {
      learnWord(from, to[i]);
    }
    return;
  }
  let array = db[from] || (db[from] = []);
  array[array.length] = to;
  if (to.length > maxLength) maxLength = to.length;
}

function learnPhrase(orig: string, trans: string) {
  const original = orig.split(",");
  const translated = trans.split(",");

  if (original.length != translated.length) {
    throw new Error("count mismatch!");
  }
  for (let i = 0; i < original.length; i++) {
    learnWord(original[i], translated[i]);
  }
}

function learn(obj: any) {
  for (let i in obj) {
    learnWord(i, obj[i]);
  }
}

function has(str: string) {
  return !!db[str];
}

let karans = "ห์,ษ์,ซ์,บ์,ป์,ฌ์".split(",");
function karan() {
  return karans[Math.floor(Math.random() * karans.length)];
}

function get(str: string) {
  let c = db[str],
    result = c[Math.floor(Math.random() * c.length)],
    endingPattern = /[ก-ฮ]$/;
  if (result.length > 1) {
    if (result.match(endingPattern)) {
      result = result.replace(endingPattern, function (a: string) {
        let random = Math.random();
        if (random < 0.2) return karan() + a;
        if (random < 0.3) return a + karan();
        return a;
      });
    }
  }
  return result;
}

function learnShift(from: string, to: string) {
  learnWord(from, from);
  learnWord(from, to);
  learnWord(from, to);
  learnWord(to, to);
  learnWord(to, to);
  learnWord(to, from);
}

learn({
  "ู": "ุ๊",
  ะ: "๊",
  ด: "ฎ",
  ต: "ฏ",
  ข: "ฆ",
  ท: "ธ",
  "ี": "ิ๊",
  "้": "๊",
  า: "๊",
  ฉ: "ช๋",
});

learn({
  หนุ: "นุ๊วซ์",
  อยาก: "ญั๊ข",
  คะ: "ขร๊",
  ค่ะ: "ฆร่",
  "ัน": "ัล",
  วก: "๊ก",
  "ัก": "ัข",
  แ: "เเ",
});

learnWord("อ", "อ");
learnWord("อ", "อ");
learnWord("อ", "ฮ");

learnShift("ม", "ฒ");
learnShift("พ", "ภ");
learnShift("ภ", "พ");
learnShift("น", "ณ");
learnShift("น", "ฯ");
learnShift("ย", "ญ");

learnPhrase("ส,มา,คม,นิ,ยม,สก๊อย", "ษ,ม่,ค่ล์ม,นิ๋,ญฒ,สก๊อย");

learnPhrase(
  "พวก,คุณ,จะ,ว่า,อะ,ไร,ก็,เชิญ,เลย,นะ,พวก,เรา,ไม่,สน,หรอก",
  "พ๊ก,คุ๊ล,จ่,ว่,อ่,รั๊ย,ก่,เซิฬ,เร่ย,น๊,พ๊ก,เลา,ไม๊,ส่น,หร่อก"
);

// https://www.facebook.com/sowhateiei/posts/333737343378863

learnPhrase(
  /*'หนู*/ "มี,นิ,ทาน,มา,เล่า,ให้,พี่,ฟัง,คะ,นิ,ทาน,เรื่อง,นี้,สอน,ให้,รู้,ว่า,ชาว,นา,กับ,ทะ,เล,ที่,หก",
  /*'ุ๊ซ์ว*/ "มริ๊,ณิ๊,ธาง์ร,ม่,เฬอ่า,หั๊ล์ย,พริ๊ต์,ฟรั๊ก์ง,ค๊,ณิ๊,ธาถ์ฯ,เฬอื่บ์ลง,ณิ๊,ศั๊ฎ์,ญหั๊ล์,รุ๊ง์ว,ว่,ชั๊ส์ว,ณฆ์า,กั๊ผ,ฑะ,เฬ,ธิ๊ฆ์,หค์ก"
);
learnPhrase(
  "กาล,ครั้ง,หนึง,ชาว,นา,กำ,ลัง,หา,ปลา,อยู่,ใน,แต่,ว่า,หา,ยัง,ไง,ก็,ไม่,เจอ,ชาว,นา,ก็,เลย,ไป",
  "กั๊รฬว์ะ,ฅั๊ฐ์งหสุ์,ณึ่,ชั๊ย์ว,ณฆ์า,กั๊,ร์ฬ,ห๊ษ์า,ปธ์ฬา,ยุ๊ว์ซ,นั๊บ์ย,ต่,ว๊พ์,ห๊ษ์า,ญั๊ล์ง,งั๊,กํ,มรั๊ล์ย,เ๗อ,ชั๊ซ์ว,ณษ์า,ก่,เร่รร,ปั๊บ์ย"
);
learnPhrase(
  "ยิน,ดี,ต้อน,รับ,พี่,ทุก,คน,นะ,คะ,พี่,จะ,ด่า,จะ,ว่า,ไง",
  "ญิร์น,ดลีร์,ตั๊ร์น,รั๊ผ,ผริ๊,ธุ๊ฆ,ฃ๊ล,น๊,ฆ๊,พริ๊,จ่,ฎ่า,จ่,ว๊ร์า,งั๊ย"
);
learnPhrase(
  "เดี๋ยว,หนู,ไป,หา,อะไร,กิน,ก่อน,นะ,หิว,แล้ว",
  "เฎิ๋ญว,หนุ๊,ปั๊บ์ย,ห๊ษ์า,อ่รั๊ย,กิ๊ล,ก่ฮฯ,น๊,ฮิ๋ซ์ว,เร่รฬฬ"
);
learnPhrase(
  "มรี,เเฝณ,ฤ,ยัง,ฅิฎ,เถิง,ณะ,ฃอ,เบอล์,หน่อญ",
  "มี,แฟน,หรือ,ยัง,คิด,ถึง,นะ,ขอ,เบอร์,หน่อย"
);

module.exports = {
  convert: (input: string) => {
    let skoy = "";
    for (let i = 0; i < input.length; ) {
      let success = false;
      for (let l = maxLength; l > 0; l--) {
        let sub = input.substr(i, l);
        if (has(sub)) {
          skoy += get(sub);
          success = true;
          i += l;
          break;
        }
      }
      if (success) continue;
      skoy += input.charAt(i);
      i += 1;
    }

    return skoy;
  },
};
