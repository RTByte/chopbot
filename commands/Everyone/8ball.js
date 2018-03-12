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
  "That's my fetish!",
  "I'm sorry, but yes.",
  "I'm sorry, but no.",
  "What?",
  "Sorry, what was that?",
  "i can be your angle...or yuor devil.",
  "*dude don't even talk to me rn*",
  "🙅", //person crossing arms
  "🛑", //stop sign emoji
  "🛑 STOP 🛑",
  "👌", //ok hand emoji
  "👍", //thumbs up emoji
  "👎", //thumbs down emoji
  "👀", //eyes emoji
  "I wouldn't think so.",
  "Awhh naaaah dude",
  "don't",
  "Why would you even think to ask that?",
  "What now?",
  "What do you mean?",
  "Not happening.",
  "You betcha.",
  "Yes, daddy 😭👋",
  "Who are you again?",
  "YAAASSSS QUEEEN",
  "no u",
  "Are you sure you should be asking *me* this?",
  "Maybe, if you take me to dinner first.",
  "get rekt my duder",
  "If you tell me I'm pretty, maybe you'll find out ;)",
  "I'd answer but I'm having a rough day. Nobody asks how I'm doing and its tiresome.",
  "Not my job.",
  "Nothing really matters, anyone can see.",
  "Nothing really matters, to meeeeeeeeee.",
  "Yes, no, maybe. I don’t know, can you repeat the question?",
  "Does a hat take ten gallons?",
  "We're all going to hell anyway, so yes.",
  "We're all going to hell anyway, so no.",
  "I don't get paid enough for this.",
  "Why do you keep asking me?",
  "Why would you do that? Stop.",
  "Address me as master and then I'll answer you.",
  "wtf u weirdo",
  "wtf, get away from me you freak",
  "Ask your parents.",
  "ya",
  "If you promise you'll love me, yes.",
  "If you promise you'll love me, no.",
  "As long as you're not a jerk about it.",
  "Just as long as you're not a dick about it.",
  "Whenever, wherever.",
  "If you say so.",
  "Yes, my dude.",
  "No, my dude.",
  "Never, ever, ever, ever. Ever.",
];

const noQuestion = [
  "That doesn't look like a question, try again please.",
  "That's not a question, silly. Use a question mark.",
  "I don't know why the developers set me to only respond to 8ball prompts that end in a question mark, but they did, so use one.",
  "No '?', no answer.",
  "\nQuestion mark = 👍\nNo question mark = 👎",
  "Use a question mark, bud",
  "Edit your message and add a question mark at the end :)"
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
