var wordBlacklist = [];

exports.init = (client) => {
  const botConfig = require("../botConfig.json");
  wordBlacklist = botConfig.wordBlacklist;
}

exports.check = function(client, input){
  return new Promise((resolve, reject) => {
  	input = input.replace(/[\W_]+/g," ");
  	let words=input.split(' ');

    cycleWords(words).then((hasBadWord) => {
      if(hasBadWord){
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

cycleWords = function(words){
  return new Promise((resolve, reject) => {
    words.forEach((word) => {
      if(wordBlacklist.includes(word.toLowerCase())){
        resolve(true);
      };
    });
  });
}