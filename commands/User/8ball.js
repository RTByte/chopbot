const answers = [
  "Maybe.",
  "Certainly not.",
  "I hope so.",
  "Not in your wildest dreams.",
  "There is a good chance.",
  "Quite likely.",
  "I think so.",
  "I hope not.",
  "I hope so.",
  "Never!",
  "Fuhgeddaboudit.",
  "Ahaha! Really?!?",
  "Pfft.",
  "Sorry, bucko.",
  "Hell, yes.",
  "Hell to the no.",
  "The future is bleak.",
  "The future is uncertain.",
  "I would rather not say.",
  "Who cares?", "Possibly.",
  "Never, ever, ever.",
  "There is a small chance.",
  "Yes!",
  "Doesn't look like anything to me.",
  "I don't know.",
  "Ask someone else.",
  "No.",
  "Yes.",
  "I'm being forced to do this, please send help.",
  "Your mom told me yes.",
  "If you're wearing pants, yes.",
  "When pigs fly.",
  "With whipped cream.",
  "I'll pretend I never heard that.",
  "I could tell you but I'd have to permanently ban you.",
  "Do you *really* want me to answer that?",
  "If it fits.",
  "That's my fetish!"
];

const noQuestion = [
  "That doesn't look like a question, try again please.",
  "That's not a question, silly. Use a question mark.",
  "I don't know why the developers set me to only respond to 8ball prompts that end in a question mark, but they did, so use one.",
  "No '?', no answer.",
  "\nQuestion mark = 👍\nNo question mark = 👎"
];


exports.run = (client, msg) => {
  if (msg.content.endsWith("?")) {
    return msg.reply(`🎱 ${answers[Math.floor(Math.random() * answers.length)]}`).catch(err => client.funcs.log(err, "error"));
  } else {
    return msg.reply(`🎱 ${noQuestion[Math.floor(Math.random() * noQuestion.length)]}`).catch(err => client.funcs.log(err, "error"));
  }
};

exports.conf = {
  enabled: true,
  selfbot: false,
  runIn: ["text", "dm", "group"],
  aliases: ["8", "magic", "8ball", "mirror"],
  permLevel: 0,
  botPerms: [],
  requiredFuncs: [],
  requiredModules: [],
};

exports.help = {
  name: "8ball",
  description: "Magic 8-ball, does exactly what the toy does, memes included.",
  usage: "<query:str>",
  usageDelim: "",
  type: "commands",
};
