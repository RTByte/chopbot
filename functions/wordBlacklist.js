var wordBlacklist = [];

exports.init = (client) => {
  const botConfig = require("../botConfig.json");
  wordBlacklist = botConfig.wordBlacklist;
}

exports.check = async (client, input) => {
  input = input.replace(/[\W_]+/g," ");
  let words=input.split(' ');

  return (await cycleWords(words));
};

cycleWords = (words) => {
  return new Promise((resolve, reject) => {
    
    words.forEach((word) => {
      if(wordBlacklist.includes(word.toLowerCase())){
        resolve(true);
      };
    });

    resolve(false);
  });
}