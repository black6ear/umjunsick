require('discord-reply');

exports.run = async (bot, msg, args) => {
  let replies = ["돈까스", "치즈돈까스", "먹지마","치킨", "피자", "햄버거", "떡볶이", "국밥", "불고기", "양념치킨", "간장치킨", "타코야끼", "우동", "라면", "삼다수", "계란말이", "안성탕면", "팥빙수", "허니콤보", "불고기버거", "빅맥", "소고기", "돼지고기", "양념갈비", "족발", "보쌈", "뿌링클", "순대", "마라탕", "된장찌게", "케이크", "도너츠", "짜장면", "짬뽕", "탕수육", "취두부", "초밥", "불고기", "치킨마요덮밥", "짜빠게티", "육회", "숯불불고기", "닭곰탕", "곰탕", "너구리", "마늘빵", "피자빵", "제육볶음", "오징어짬뽕", "문어", "오징어", "붕어빵", "고추참치", "오리불고기", "김치전"];
  
  let random = Math.floor(Math.random() * Object.keys(replies).length);


  msg.lineReply(replies[random]);

}

exports.help = {
	name: '밥추천'
};